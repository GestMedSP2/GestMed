function validarSessao() {
    var email = sessionStorage.EMAIL_USUARIO;
    var nome = sessionStorage.NOME_USUARIO;
    var empresa = sessionStorage.EMPRESA_USUARIO;

    var nomeUsuario = document.getElementById("nome_usuario");
    var nomeEmpresa = document.getElementById('nome_empresa')

    if (email != null && nome != null) {
        // window.alert(`Seja bem-vindo, ${nome}!`);
        nomeUsuario.innerHTML = nome;
        nomeEmpresa.innerHTML = empresa;
    } else {
        window.location = "../Login";
    }
}