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
