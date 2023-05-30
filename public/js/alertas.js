var alertasContainer = document.getElementById('alertasContainer');

var alertasCriticos = [];
var alertasAtencao = [];

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
                    if (resposta[i].temperatura > resposta[i].temperaturaAlertaMaxima || resposta[i].umidade > resposta[i].umidadeAlertaMaxima) {
                        alertasContainer.innerHTML += `
                            <tr>
                                <td><input type="checkbox"></td>
                                <td>${resposta[i].nomeSetor}</td>
                                <td class="centralizarPrioridade">
                                    <div class="caixaPrioridade prioridadeCritica">
                                        <text>Crítico</text>
                                    </div>
                                </td>
                                <td>${new Date(resposta[i].dataColeta).toLocaleString()}</td>
                                <td>Temperatura ultrapassada para ${resposta[i].temperatura}ºC</td>
                                <td><img src="../assets/img/iconLixeira.svg"></td>
                            </tr>
                        `;

                        alertasCriticos.push(resposta[i]);
                    } else if (resposta[i].temperatura > resposta[i].temperaturaMaxima || resposta[i].umidade > resposta[i].umidadeMaxima) {
                        alertasContainer.innerHTML += `
                            <tr>
                                <td><input type="checkbox"></td>
                                <td>${resposta[i].nomeSetor}</td>
                                <td class="centralizarPrioridade">
                                    <div class="caixaPrioridade prioridadeUrgente">
                                        <text>Atenção</text>
                                    </div>
                                </td>
                                <td>${new Date(resposta[i].dataColeta).toLocaleString()}</td>
                                <td>Temperatura ultrapassada para ${resposta[i].temperatura}ºC</td>
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
                <td><input type="checkbox"></td>
                <td>${alertasAtencao[i].nomeSetor}</td>
                <td class="centralizarPrioridade">
                    <div class="caixaPrioridade prioridadeUrgente">
                        <text>Atenção</text>
                    </div>
                </td>
                <td>${new Date(alertasAtencao[i].dataColeta).toLocaleString()}</td>
                <td>Temperatura ultrapassada para ${alertasAtencao[i].temperatura}ºC</td>
                <td><img src="../assets/img/iconLixeira.svg"></td>
            </tr>
        `;
    }
}

function filtrarPorCritico() {
    alertasContainer.innerHTML = '';

    for(var i = 0; i < alertasCriticos.length; i++) {
        alertasContainer.innerHTML += `
            <tr>
                <td><input type="checkbox"></td>
                <td>${alertasCriticos[i].nomeSetor}</td>
                <td class="centralizarPrioridade">
                    <div class="caixaPrioridade prioridadeCritica">
                        <text>Crítico</text>
                    </div>
                </td>
                <td>${new Date(alertasCriticos[i].dataColeta).toLocaleString()}</td>
                <td>Temperatura ultrapassada para ${alertasCriticos[i].temperatura}ºC</td>
                <td><img src="../assets/img/iconLixeira.svg"></td>
            </tr>
        `;
    }
}