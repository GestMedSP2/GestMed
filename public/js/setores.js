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
        if(response.ok) {
            response.json().then((resposta) => {
                console.log(resposta);

                for(var i = 0; i < resposta.length; i++) {
                    containerSetores.innerHTML += `
                        <a href="../dashboard/index.html?idSetor=${resposta[i].idSetor}" class="containerSetor setorAtivo">
                            <h2>${resposta[i].nomeSetor}</h2>
                            <p>${resposta[i].enderecoSetor}</p>
                            <div class="statusContainer">
                                <div class="status statusAtivo">
                                    <div></div>
                                    <p>${resposta[i].setoresAtivos} sensores <span>ativos</span></p>
                                </div>
                                <div class="status statusManutencao">
                                    <div></div>
                                    <p>${resposta[i].setoresManutencao} sensores <span>em manutenção</span></p>
                                </div>
                                <div class="status statusInativo">
                                    <div></div>
                                    <p>${resposta[i].setoresInativos} sensores <span>inativo</span></p>
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
