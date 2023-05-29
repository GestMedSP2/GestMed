var idEmpresa = sessionStorage.ID_EMPRESA;

function buscarAlertas() {
    fetch(`/avisos/listar/${idEmpresa}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        },
    }).then((response) => {
        if (response.ok) {
            response.json().then((resposta) => {
                console.log(resposta);
            })
        }
    }).catch((error) => {
        console.error(error);
    });
}