const modal = document.getElementById('modalCriarSetor');
const overlay = document.querySelector('#modalCriarSetor .overlay');

function abrirModal() {
    modal.style.display = 'block';
}

function fecharModal() { 
    modal.style.display = 'none';
}

overlay.addEventListener('click', (event) => {
    if(event.target.className == 'overlay') {
        fecharModal();
    }
});
