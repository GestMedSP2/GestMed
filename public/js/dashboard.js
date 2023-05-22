let proximaAtualizacao;
var graficoBarra;

var textoTemperaturaMaisAltaObtida = document.getElementById('temperaturaMaisAltaObtida');
var textoUmidadeMaisAltaObtida = document.getElementById('umidadeMaisAltaObtida');

function chamarDados() {
    obterUltimosDados();
    obterUltimosDadosGraficoLinha();
    obterDadosSemana();

    document.getElementById('select_periodo').addEventListener('change', () => {
        var select = document.getElementById('select_periodo');
        var value = select.options[select.selectedIndex].value;

        if(value == 'Dia') {
            obterDadosUltimas12Horas();
        } else {
            atualizarDadosSemana();
        }
    });
}

function obterUltimosDados() {
    var idSetor = 1;

    fetch(`/dado/ultimos/${idSetor}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        },
    }).then(function (response) {
        if (response.ok) {

            response.json().then(function (resposta) {
                var temperaturaAtual = document.getElementById('temperaturaAtual');
                var umidadeAtual = document.getElementById('umidadeAtual');

                temperaturaAtual.innerHTML = Number(resposta[0].temperatura).toFixed(1) + 'ºC';
                umidadeAtual.innerHTML = Number(resposta[0].umidade).toFixed(1) + '%';
            })    

            setTimeout(() => obterUltimosDados(), 4000);
        } else if (response.status == 404) {
            window.alert("Deu 404!");
        } else {
            throw ("Houve um erro ao tentar realizar a postagem! Código da resposta: " + response.status);
        }
    }).catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
    });
}

function gerarHorarios() {
    var horarios = [];

    var dataAtual = new Date();

    for(var i = 1; i <= 4; i++) {
        dataAtual.setMinutes(dataAtual.getMinutes() - 15);

        var hora = new Date(dataAtual).getHours() > 9 ? new Date(dataAtual).getHours() : '0' + new Date(dataAtual).getHours();
        var minuto = new Date(dataAtual).getMinutes() > 9 ? new Date(dataAtual).getMinutes() : '0' + new Date(dataAtual).getMinutes();
        var horario = hora + ':' + minuto;

        horarios.push(horario);
    }
    
    return horarios;
}

function obterUltimosDadosGraficoLinha() {
    var idSetor = 1;

    var horarios = gerarHorarios();

    fetch(`/dado/graficosLinha/${idSetor}/${horarios}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        },
    }).then(function (response) {
        if (response.ok) {

            response.json().then(function (resposta) {
                var label = [];
                var temperatura = [];
                var umidade = [];
                console.log(resposta);

                for(var i = 0; i < resposta.length; i++) {
                    label.push(resposta[i].DataColeta);
                    temperatura.push(resposta[i].Temperatura);
                    umidade.push(resposta[i].Umidade);
                }

                //Linha pontilhada

                const horizontalDottedLine = {
                    id: 'horizontalDottedLine', 
                    beforeDatasetsDraw(chart, args, options) {
                        const { ctx, chartArea: { top, right, bottom, left, width, height },
                            scales: { x, y } } = chart;

                        ctx.save();

                        var chartId = chart.ctx.canvas.id; 
                        var max = 0;
                        var min = 0;

                        if(chartId == 'chartTemperatura') {
                            max = 8;
                            min = 2;
                        } else if (chartId ==  'chartUmidade') {
                            max = 70;
                            min = 40;
                        }

                        ctx.strokeStyle = 'red';
                        ctx.setLineDash([15, 10]);
                        ctx.strokeRect(left, y.getPixelForValue(max), width, 0);
                        ctx.strokeRect(left, y.getPixelForValue(min), width, 0);
                        ctx.restore();
                    }
                }

                var dadoTemperatura = {
                    data: {
                        datasets: [
                            {
                                type: 'line',
                                label: 'Temperatura',
                                data: temperatura,
                                backgroundColor: '#50C37E',
                                borderColor: '#50C37E'
                            }
                        ],
                        labels: label
                    },
                    options: {
                        scales: {
                            y: {
                                min: -10,
                                max: 40,
                            }
                        }
                    },
                    plugins: [horizontalDottedLine]
                }

                var dadoUmidade = {
                    data: {
                        datasets: [
                            {
                                type: 'line',
                                label: 'Umidade',
                                data: umidade,
                                backgroundColor: '#708BFF',
                                borderColor: '#708BFF'
                            }
                        ],
                        labels: label
                    },
                    options: {
                        scales: {
                            y: {
                                min: 25,
                                max: 80,
                            }
                        }
                    },
                    plugins: [horizontalDottedLine]
                }

                var graficoTemperatura = new Chart(document.getElementById('chartTemperatura'), dadoTemperatura);
                var graficoUmidade = new Chart(document.getElementById('chartUmidade'), dadoUmidade);

                setTimeout(() => atualizarGraficoLinha(1, graficoUmidade, graficoTemperatura, dadoUmidade, dadoTemperatura), 900000);
            })    
        } else if (response.status == 404) {
            window.alert("Deu 404!");
        } else {
            throw ("Houve um erro ao tentar realizar a postagem! Código da resposta: " + response.status);
        }
    }).catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
    });
}

function obterDadosSemana() {
    var idSetor = 1;

    var diaSemana = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab', 'Dom'];

    fetch(`/dado/semana/${idSetor}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        },
    }).then(function (response) {
        if (response.ok) {

            response.json().then(function (resposta) {
                var labels = [];
                var temperaturas = [];
                var umidades = [];

                for(var i = 0; i < resposta.length; i++) {
                    labels.push(diaSemana[resposta[i].DataColeta]);
                    temperaturas.push(resposta[i].Temperatura);
                    umidades.push(resposta[i].Umidade);
                }

                // Gráfico médi
                const barChart = document.getElementById('myBarChart');

                graficoBarra = new Chart(barChart, {
                    data: {
                        datasets: [
                            {
                                type: 'bar',
                                label: 'Temperatura média',
                                data: temperaturas,
                                backgroundColor: '#50C37E',
                                borderRadius: 10,
                            },
                            {
                                type: 'bar',
                                label: 'Umidade média',
                                data: umidades,
                                backgroundColor: '#708BFF',
                                borderRadius: 10,
                            }
                        ],
                        labels: labels
                    },
                });

                fetch(`/dado/dadoMaisAltoSemana/${idSetor}`, {
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json"
                    },
                }).then(response => {
                    if(response.ok) {
                        response.json().then(data => {
                            textoTemperaturaMaisAltaObtida.innerHTML = data[0].Temperatura + 'ºC';
                            textoUmidadeMaisAltaObtida.innerHTML = data[0].Umidade + '%';
                        })
                    }
                });
            });
        } else if (response.status == 404) {
            window.alert("Deu 404!");
        } else {
            throw ("Houve um erro ao tentar realizar a postagem! Código da resposta: " + response.status);
        }
    }).catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
    });
}

function obterDadosUltimas12Horas() {
    var idSetor = 1;

    fetch(`/dado/ultimas12horas/${idSetor}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        },
    }).then(function (response) {
        if (response.ok) {

            response.json().then(function (resposta) {
                var labels = [];
                var temperaturas = [];
                var umidades = [];

                for(var i = 0; i < resposta.length; i++) {
                    labels.push(resposta[i].DataColeta + 'h');
                    temperaturas.push(resposta[i].Temperatura);
                    umidades.push(resposta[i].Umidade);
                }

                // Gráfico médi
                graficoBarra.data.labels = labels;
                graficoBarra.data.datasets[0].data = temperaturas;
                graficoBarra.data.datasets[1].data = umidades;

                graficoBarra.update();

                fetch(`/dado/dadoMaisAlto24Horas/${idSetor}`, {
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json"
                    },
                }).then(response => {
                    if(response.ok) {
                        response.json().then(data => {
                            textoTemperaturaMaisAltaObtida.innerHTML = data[0].Temperatura + 'ºC';
                            textoUmidadeMaisAltaObtida.innerHTML = data[0].Umidade + '%';
                        })
                    }
                });
            });
        } else if (response.status == 404) {
            window.alert("Deu 404!");
        } else {
            throw ("Houve um erro ao tentar realizar a postagem! Código da resposta: " + response.status);
        }
    }).catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
    });
}

function atualizarDadosSemana() {
    var idSetor = 1;

    var diaSemana = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab', 'Dom'];

    fetch(`/dado/semana/${idSetor}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        },
    }).then(function (response) {
        if (response.ok) {

            response.json().then(function (resposta) {
                var labels = [];
                var temperaturas = [];
                var umidades = [];

                for(var i = 0; i < resposta.length; i++) {
                    labels.push(diaSemana[resposta[i].DataColeta]);
                    temperaturas.push(resposta[i].Temperatura);
                    umidades.push(resposta[i].Umidade);
                }

                // Gráfico médi
                graficoBarra.data.labels = labels;
                graficoBarra.data.datasets[0].data = temperaturas;
                graficoBarra.data.datasets[1].data = umidades;

                graficoBarra.update();

                fetch(`/dado/dadoMaisAltoSemana/${idSetor}`, {
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json"
                    },
                }).then(response => {
                    if(response.ok) {
                        response.json().then(data => {
                            textoTemperaturaMaisAltaObtida.innerHTML = data[0].Temperatura + 'ºC';
                            textoUmidadeMaisAltaObtida.innerHTML = data[0].Umidade + '%';
                        })
                    }
                });
            });
        } else if (response.status == 404) {
            window.alert("Deu 404!");
        } else {
            throw ("Houve um erro ao tentar realizar a postagem! Código da resposta: " + response.status);
        }
    }).catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
    });
}

function atualizarGraficoLinha(idSetor, graficoUmidade, graficoTemperatura, dadoUmidade, dadoTemperatura) {
    fetch(`/dado/graficosLinhaAtualizado/${idSetor}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (novoRegistro) {

                console.log(`Dados recebidos: ${JSON.stringify(novoRegistro)}`);
                console.log(`Dados atuais do gráfico:`);
                console.log(dadoUmidade);


                if (novoRegistro[0].DataColeta == dadoUmidade.data.labels[dadoUmidade.data.labels.length - 1]) {
                    console.log("---------------------------------------------------------------")
                    console.log("Como não há dados novos para captura, o gráfico não atualizará.")
            
                    console.log("Horário do novo dado capturado:")
                    console.log(novoRegistro[0].DataColeta)
                    console.log("Horário do último dado capturado:")
                    console.log(dadoUmidade.data.labels[dadoUmidade.data.labels.length - 1])
                    console.log("---------------------------------------------------------------")
                } else {
                    // tirando e colocando valores no gráfico
                    dadoUmidade.data.labels.shift(); // apagar o primeiro
                    dadoUmidade.data.labels.push(novoRegistro[0].DataColeta); // incluir um novo momento

                    dadoUmidade.data.datasets[0].data.shift();  // apagar o primeiro de umidade
                    dadoUmidade.data.datasets[0].data.push(novoRegistro[0].Umidade); // incluir uma nova medida de umidade

                    dadoTemperatura.data.datasets[0].data.shift();  // apagar o primeiro de temperatura
                    dadoTemperatura.data.datasets[0].data.push(novoRegistro[0].Temperatura); // incluir uma nova medida de temperatura

                    graficoUmidade.update();
                    graficoTemperatura.update();
                }

                // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
                proximaAtualizacao = setTimeout(() => atualizarGraficoLinha(idSetor, graficoUmidade, graficoTemperatura, dadoUmidade, dadoTemperatura), 4000);
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
            // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
            proximaAtualizacao = setTimeout(() => atualizarGraficoLinha(idSetor, graficoUmidade, graficoTemperatura, dadoUmidade, dadoTemperatura), 2000);
        }
    })
    .catch(function (error) {
        console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
    });

}
