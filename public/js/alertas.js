var alertasContainer = document.getElementById('alertasContainer');

var alertasCriticos = [];
var alertasAtencao = [];

var umidadeCriticaMax = 74;
var umidadeCriticaMin = 31;

var umidadeAtencaoMax = 70;
var umidadeAtencaoMin = 40;

function buscarAlertas() {
    var idEmpresa = sessionStorage.ID_EMPRESA;

    fetch(`/avisos/listar/${idEmpresa}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        },
    }).then((response) => {
        if (response.ok) {
            response.json().then((resposta) => {

                alertasContainer.innerHTML = '';

                alertasCriticos = [];
                alertasAtencao = [];

                for(var i = 0; i < resposta.length; i++) {
                    if (resposta[i].temperatura > resposta[i].temperaturaCriticaMaxima || resposta[i].umidade > umidadeCriticaMax || resposta[i].temperatura < resposta[i].temperaturaCriticaMinima || resposta[i].umidade < umidadeCriticaMin) {          
                        var temperaturaIncorreta = false;
                        var umidadeIncorreta = false;

                        if(resposta[i].temperatura > resposta[i].temperaturaCriticaMaxima || resposta[i].temperatura < resposta[i].temperaturaCriticaMinima) {
                            temperaturaIncorreta = true;
                        } else {
                            umidadeIncorreta = true;
                        }
                        
                        var mensagem = '';

                        if(temperaturaIncorreta && umidadeIncorreta) {
                            mensagem = `Temperatura (${resposta[i].temperatura}°C) e umidade (${resposta[i].umidade}%) impróprias`;
                        } else if (temperaturaIncorreta) {
                            mensagem = `Temperatura (${resposta[i].temperatura}°C) imprópria`;
                        } else {
                            mensagem = `Umidade (${resposta[i].umidade}%) imprópria`;
                        }

                        alertasContainer.innerHTML += `
                            <tr>
                                <td>${resposta[i].nomeSetor}</td>
                                <td class="centralizarPrioridade">
                                    <div class="caixaPrioridade prioridadeCritica">
                                        <text>Crítico</text>
                                    </div>
                                </td>
                                <td>${new Date(resposta[i].dataColeta).toLocaleString()}</td>
                                <td>${mensagem}</td>     
                            </tr>
                        `;

                        alertasCriticos.push(resposta[i]);
                    } else if (resposta[i].temperatura > resposta[i].temperaturaAtencaoMaxima || resposta[i].umidade > umidadeAtencaoMax || resposta[i].temperatura < resposta[i].temperaturaAtencaoMinima || resposta[i].umidade < umidadeAtencaoMin) {
                        
                        var temperaturaIncorreta = false;
                        var umidadeIncorreta = false;

                        if(resposta[i].temperatura > resposta[i].temperaturaAtencaoMaxima || resposta[i].temperatura < resposta[i].temperaturaAtencaoMinima) {
                            temperaturaIncorreta = true;
                        } else {
                            umidadeIncorreta = true;
                        }
                        
                        var mensagem = '';

                        if(temperaturaIncorreta && umidadeIncorreta) {
                            mensagem = `Temperatura (${resposta[i].temperatura}°C) e umidade (${resposta[i].umidade}%) próximas de níveis impróprios`;
                        } else if (temperaturaIncorreta) {
                            mensagem = `Temperatura (${resposta[i].temperatura}°C) próxima de níveis impróprios`;
                        } else {
                            mensagem = `Umidade (${resposta[i].umidade}%) próxima de níveis impróprios`;
                        }
                        
                        alertasContainer.innerHTML += `
                            <tr>
                
                                <td>${resposta[i].nomeSetor}</td>
                                <td class="centralizarPrioridade">
                                    <div class="caixaPrioridade prioridadeUrgente">
                                        <text>Atenção</text>
                                    </div>
                                </td>
                                <td>${new Date(resposta[i].dataColeta).toLocaleString()}</td>
                                <td>${mensagem}</td>
                                <td><img src="../assets/img/iconLixeira.svg"></td>
                            </tr>
                        `;
                        alertasAtencao.push(resposta[i]);
                    }
                }

                qtdAlertasCriticos.innerHTML = alertasCriticos.length;
                qtdAlertasAtencao.innerHTML = alertasAtencao.length;
            })
        }
    }).catch((error) => {
        console.error(error);
    });
}

function filtrarPorAtencao() {
    alertasContainer.innerHTML = '';

    for(var i = 0; i < alertasAtencao.length; i++) {
        alertasContainer.innerHTML += `
            <tr>
                <td>${alertasAtencao[i].nomeSetor}</td>
                <td class="centralizarPrioridade">
                    <div class="caixaPrioridade prioridadeUrgente">
                        <text>Atenção</text>
                    </div>
                </td>
                <td>${new Date(alertasAtencao[i].dataColeta).toLocaleString()}</td>
                <td>Temperatura ultrapassada para ${alertasAtencao[i].temperatura}ºC</td>
                
            </tr>
        `;
    }
}

function filtrarPorCritico() {
    alertasContainer.innerHTML = '';

    for(var i = 0; i < alertasCriticos.length; i++) {
        alertasContainer.innerHTML += `
            <tr>
                <td>${alertasCriticos[i].nomeSetor}</td>
                <td class="centralizarPrioridade">
                    <div class="caixaPrioridade prioridadeCritica">
                        <text>Crítico</text>
                    </div>
                </td>
                <td>${new Date(alertasCriticos[i].dataColeta).toLocaleString()}</td>
                <td>Temperatura ultrapassada para ${alertasCriticos[i].temperatura}ºC</td>
                
            </tr>
        `;
    }
}