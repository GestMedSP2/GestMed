const modal = document.getElementById('modalCriarSetor');
const overlay = document.querySelector('#modalCriarSetor .overlay');

var checkFuncionariosCMM = document.getElementById('checkADM');
var checkFuncionariosADM = document.getElementById('checkCMM');
var funcionarios = document.getElementById('idBodyFuncionarios');
var funcionarioInput = document.getElementById('inputPesquisa');
var funcionariosCargos = [];


function abrirModalFiltro() {
    document.getElementById('conteudoFiltro').style.display = "flex"
}
 
 function fecharModalFiltro() {
    document.getElementById('conteudoFiltro').style.display = "none"
}


function buscarFuncionarios() {
    var idEmpresa = sessionStorage.ID_EMPRESA;
    

    fetch(`/funcionarios/listar/${idEmpresa}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        },
    }).then((response) => {
        if (response.ok) {
            funcionarios.innerHTML = '';

                    funcionariosCargos = [];
            response.json().then((resposta) => {
                preencherTela(resposta);
                funcionariosCargos = resposta;
            })
                    
        }
    }).catch((error) => {
        console.error(error);
    });
}


document.getElementById('inputPesquisa').addEventListener('input', (event) => {
    var text = event.target.value;
    
    var funcionariosFiltrados = funcionariosCargos.filter(item => {
        if (!isNaN(text)) { 
            return item.idFuncionario.toString().includes(text);
        } else { 
            return item.nome.toLowerCase().includes(text.toLowerCase());
        }
      });

    if(text.length > 0) {
        console.log(funcionariosFiltrados)
        preencherTela(funcionariosFiltrados);
    }else {
        preencherTela(funcionariosCargos);
    }
});

function preencherTela(vetor) {
    funcionarios.innerHTML = '';
    

    for(var i = 0; i < vetor.length; i++) {
        var tipoCargo;

        var filtro = {
            ADM: checkFuncionariosADM ? checkFuncionariosADM.checked : true,
            CMM: checkFuncionariosCMM ? checkFuncionariosCMM.checked : true
        }
        
        if(vetor[i].cargo == 'CMM') {
            tipoCargo = 'ADM';
        } else {
            tipoCargo = 'CMM'
        }

        if(filtro[tipoCargo]) {
            funcionarios.innerHTML += `
                            <tr>
                                <td>${vetor[i].idFuncionario}</td>
                                <td>${vetor[i].nome}</td>
                                <td>${vetor[i].cargo}</td>
                                <td>${vetor[i].email}</td>
                                <td><button class= btnEditar onclick="editarFuncionario()"><span class="iconify" data-icon="ci:settings" data-width="30"></span></button></td>
                            </tr>
                        `;
        }
    }
}

function filtrar() {
    preencherTela(funcionariosCargos);
    fecharModalFiltro();
}




function editarFuncionario(){
    
}

