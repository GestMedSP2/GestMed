var funcionarios = document.getElementById('idBodyFuncionarios');

var funcionariosCargos = [];

function buscarFuncionarios() {
    var idEmpresa = sessionStorage.ID_EMPRESA;

    fetch(`/funcionarios/listar/${idEmpresa}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        },
    }).then((response) => {
        if (response.ok) {
            response.json().then((resposta) => {

                funcionarios.innerHTML = '';

                    funcionariosCargos = [];
                    console.log(resposta)
                for(var i = 0; i < resposta.length; i++) {
                        funcionarios.innerHTML += `
                            <tr>
                                <td>${resposta[i].idFuncionario}</td>
                                <td>${resposta[i].nome}</td>
                                <td>${resposta[i].cargo}</td>
                                <td>${resposta[i].email}</td>
                                <td><a>lio</a></td>
                            </tr>
                        `;
                }
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