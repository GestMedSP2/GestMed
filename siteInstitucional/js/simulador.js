var buttonSimular = document.getElementById('buttonSimular');
var inputPrejuizo = document.getElementById('inputPrejuizo');
var simulador = document.getElementById('formSimulador');
var telaAntesComecar = document.getElementById('antesComecar');
var vantagens = document.getElementById('vantagens');

var nomeMedicamento = document.getElementById('inputNomeMedicamento');
var valorLote = document.getElementById('inputValorLote');
var qtdLotes = document.getElementById('inputQtdLotes');

var porcentagemPrejuizo = 10;

function irParaSimulador(resposta) {
    if(resposta == 'Sim' && inputPrejuizo.value == '') {
        alert('Preencha o campo ou clique em "Não"');
    } else if(resposta == 'Sim' && inputPrejuizo.value != '') {
        var prejuizo = Number(inputPrejuizo.value);

        if(prejuizo < porcentagemPrejuizo) 
            porcentagemPrejuizo -= prejuizo;
        
        if(prejuizo > porcentagemPrejuizo)
            porcentagemPrejuizo = prejuizo;
    }

    exibirSimulador();
}

buttonSimular.addEventListener('click', () => {
    if(nomeMedicamento.value == '' || valorLote.value == '' || qtdLotes.value == '') 
        return alert('Preencha todos os campos!');

    buttonSimular.innerHTML = '<span></span>';

    setTimeout(() => {
        calcularLucros();
    }, 2500);
});

function exibirSimulador() {
    simulador.style.display = 'flex';
    telaAntesComecar.style.display = 'none';
}

function calcularLucros() {
    var valorTotal = qtdLotes.value * valorLote.value * 12;
    var valorPerdido = ((valorTotal*porcentagemPrejuizo)/100);
    var valorGanho = valorTotal - valorPerdido;

    document.getElementById('porcentagemLucro').innerText = `+${porcentagemPrejuizo}%`;
    document.getElementById('textoPorcentagemLucro').innerHTML = `de lucro com a venda dos lotes de ${nomeMedicamento.value} desse medicamento`;

    document.getElementById('valorLucro').innerText = `+R$${valorGanho}`;
    document.getElementById('textoValorLucro').innerHTML = `de lucro anual com a venda dos lotes de ${nomeMedicamento.value} utilizando o nosso sistema`;
    
    document.getElementById('qtdLotes').innerText = `+${qtdLotes.value} lotes`;
    document.getElementById('textoQtdLotes').innerHTML = `de ${nomeMedicamento.value} que terão seu desperdício evitado`;
    
    vantagens.style.display = 'flex';

    const elementoTopo = vantagens.offsetTop;
    window.scrollTo({ top: elementoTopo - 100, behavior: "smooth" });

    buttonSimular.innerHTML = 'Simular';
}
