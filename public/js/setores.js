const modal = document.getElementById('modalCriarSetor');
const overlay = document.querySelector('#modalCriarSetor .overlay');

function abrirModal() {
    modal.style.display = 'block';
}

function fecharModal() {
    modal.style.display = 'none';
}

overlay.addEventListener('click', (event) => {
    if (event.target.className == 'overlay') {
        fecharModal();
    }
});

function obterSetores() {
    var idEmpresa = sessionStorage.ID_EMPRESA;
    var containerSetores = document.getElementById('containerSetores');

    fetch(`/setor/listar/${idEmpresa}`, {
        method: 'GET'
    }).then((response) => {
        if (response.ok) {
            response.json().then((resposta) => {
                for (var i = 0; i < resposta.length; i++) {
                    var background;

                    if (resposta[i].Temperatura > resposta[i].temperaturaAlertaMaxima || resposta[i].Umidade > resposta[i].UmidadeAlertaMaxima) {
                        background = '#FF5F5F';
                    } else if (resposta[i].Temperatura > resposta[i].temperaturaMaxima || resposta[i].Umidade > resposta[i].umidadeMaxima) {
                        background = '#F3F565';
                    } else {
                        background = '#50C37E';
                    }

                    containerSetores.innerHTML += `
                        <a style='background-color: ${background}' href="../dashboard/index.html?idSetor=${resposta[i].idSetor}" class="containerSetor setorAtivo">
                            <h2>${resposta[i].nomeSetor}</h2>
                            <p>${resposta[i].enderecoSetor}</p>
                            <div class="statusContainer">
                                <div class="status statusAtivo">
                                    <div></div>
                                    <p>${resposta[i].setoresAtivos} sensores <span>ativos</span></p>
                                </div>
                                <div class="status statusManutencao">
                                    <div style='background-color: ${background == '#F3F565' && '#86804A'}'></div>
                                    <p>${resposta[i].setoresManutencao} sensores <span style='color: ${background == '#F3F565' && '#86804A'}'>em manutenção</span></p>
                                </div>
                                <div class="status statusInativo">
                                    <div style='background-color: ${background == '#FF5F5F' && '#BA3931'}'></div>
                                    <p>${resposta[i].setoresInativos} sensores <span style='color: ${background == '#FF5F5F' && '#BA3931'}'>inativo</span></p>
                                </div>
                            </div>
                        </a>
                    `;
                }
            })
        } else if (response.status == 404) {
            return alert('Du 404!')
        } else {
            throw ("Houve um erro ao tentar buscar os setores: " + response.status);
        }
    }).catch((error) => {
        console.error(error);
    });
}

function criarSetor() {
    // FAZER VALIDAÇÕES -- NÃO ESQUECE

    var idEmpresa = sessionStorage.ID_EMPRESA;
    var nome = document.getElementById('nome_setor').value;
    var select = document.getElementById('selectTipoSetor');
    var armazenaTermolabeis = select.options[select.selectedIndex].value == 'tempAmbiente' ? false : true;

    var setor = {
        nome,
        armazenaTermolabeis,
    }

    fetch(`/setor/criar/${idEmpresa}`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(setor)
    }).then(function (resposta) {

        console.log("resposta: ", resposta);

        if (resposta.ok) {
            window.alert("Post realizado com sucesso pelo usuario de ID: " + idEmpresa + "!");
            // window.location = "/dashboard/mural.html";
        } else if (resposta.status == 404) {
            window.alert("Deu 404!");
        } else {
            throw ("Houve um erro ao tentar realizar a postagem! Código da resposta: " + resposta.status);
        }
    }).catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
        // finalizarAguardar();
    });

    return false;
}
