const modal = document.getElementById('modalCriarSetor');
const overlay = document.querySelector('#modalCriarSetor .overlay');

var checkSetoresCriticos = document.getElementById('checkSetoresCriticos');
var checkSetoresAtencao = document.getElementById('checkSetoresAtencao');
var checkSetoresIdeais = document.getElementById('checkSetoresIdeais');
var checkSetoresInativos = document.getElementById('checkSetoresInativos');

var setores = [];

var umidadeCriticaMax = 74;
var umidadeCriticaMin = 31;

var umidadeAtencaoMax = 70;
var umidadeAtencaoMin = 40;

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
            containerSetores.innerHTML = '';

            setores = [];

            response.json().then((resposta) => {
                preencherTela(resposta);
                setores = resposta;
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
    
    var idEmpresa = sessionStorage.ID_EMPRESA;
    var nome = document.getElementById('nome_setor').value;
    var select = document.getElementById('selectTipoSetor');
    var armazenaTermolabeis = select.options[select.selectedIndex].value == 'tempAmbiente' ? false : true;
    
    if(nome == '') {
        return alert('Insira o nome do setor');
    }

    if(select.options[select.selectedIndex].value == 'Cargo') {
        return alert('Informe o tipo do setor');
    }

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
            alert("Setor criado com sucesso");
            fecharModal();
            obterSetores();
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

document.getElementById('inputPesquisa').addEventListener('input', (event) => {
    var text = event.target.value;

    var setoresPesquisados = setores.filter(item => item.nomeSetor.toLowerCase().includes(text.toLowerCase()));

    if(text.length > 0) {
        preencherTela(setoresPesquisados);
    } else {
        preencherTela(setores);
    }
});

function preencherTela(vetor) {
    containerSetores.innerHTML = '';

    for(var i = 0; i < vetor.length; i++) {
        var background;
        var tipoSetor;

        var filtro = {
            Critico: checkSetoresCriticos ? checkSetoresCriticos.checked : true,
            Atencao: checkSetoresAtencao ? checkSetoresAtencao.checked : true,
            Ideal: checkSetoresIdeais ? checkSetoresIdeais.checked : true,
            Inativo: checkSetoresInativos ? checkSetoresInativos.checked : true
        }

        console.log(filtro);

        if(vetor[i].setoresAtivos == 0) {
            background = '#CDCDCD';
            tipoSetor = 'Inativo';
        } else if (vetor[i].Temperatura > vetor[i].temperaturaCriticaMaxima || vetor[i].Umidade > umidadeCriticaMax || vetor[i].Umidade < umidadeCriticaMin || vetor[i].Temperatura < vetor[i].temperaturaCriticaMinima) {
            background = '#FF5F5F';
            tipoSetor = 'Critico';
        } else if (vetor[i].Temperatura > vetor[i].temperaturaAtencaoMaxima || vetor[i].Umidade > umidadeAtencaoMax || vetor[i].Temperatura < vetor[i].temperaturaAtencaoMinima || vetor[i].Umidade < umidadeAtencaoMin) {
            background = '#f7cf60';
            tipoSetor = 'Atencao';
        } else {
            background = '#50C37E';
            tipoSetor = 'Ideal'
        }

        if(filtro[tipoSetor]) {
            containerSetores.innerHTML += `
                <a style='background-color: ${background}' href="../dashboard/index.html?idSetor=${vetor[i].idSetor}" class="containerSetor setorAtivo">
                    <h2>${vetor[i].nomeSetor}</h2>
                    <p>${vetor[i].enderecoSetor}</p>
                    <div class="statusContainer">
                        <div class="status statusAtivo">
                            <div></div>
                            <p>${vetor[i].setoresAtivos} sensores <span>ativos</span></p>
                        </div>
                        <div class="status statusManutencao">
                            <div></div>
                            <p>${vetor[i].setoresManutencao} sensores <span>em manutenção</span></p>
                        </div>
                        <div class="status statusInativo">
                            <div style='background-color: ${background == '#FF5F5F' && '#BA3931'}'></div>
                            <p>${vetor[i].setoresInativos} sensores <span style='color: ${background == '#FF5F5F' && '#BA3931'}'>inativo</span></p>
                        </div>
                    </div>
                </a>
            `;
        }
    }
}

function abrirModalFiltro() {
    document.getElementById('conteudoFiltro').style.display = "flex"
}
 
 function fecharModalFiltro() {
    document.getElementById('conteudoFiltro').style.display = "none"
}

function filtrar() {
    preencherTela(setores);
    fecharModalFiltro();
}
