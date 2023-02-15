
const novoCadastros = buscarDadosDoLocalStorage('usuarios')

const formularioHTML = document.getElementById('formulario-cadastro');

const feedback = document.getElementById('feedback');


formularioHTML.addEventListener('submit', (evento) => {
    evento.preventDefault()

    const usuario = document.getElementById('usuario').value
    const senha = document.getElementById('senha').value
    const verificacao = document.getElementById('varificacao').value

    if (senha !== verificacao) {
        showFeedback(false,"As senhas devem ser iguais")
        return
        
    }
    


    const existe = novoCadastros.some((valor) => valor.usuario === usuario)
    if (existe) {
        showFeedback(false, "Usuario já cadastrado")
        return
    } else {
        showFeedback(false, "usuario cadastrado com sucesso")
        window.location.href = './index.html'
    }

    



    const cadastro = {
        usuario: usuario,
        senha: senha,
        recados: []


    }


    novoCadastros.push(cadastro)

    guardarNoLocalStorage('usuarios', novoCadastros)


    formularioHTML.reset()


})

function guardarNoLocalStorage(chave, valor) {
    const valorJSON = JSON.stringify(valor)

    localStorage.setItem(chave, valorJSON)

}

function buscarDadosDoLocalStorage(chave) {

    const dadoJSON = localStorage.getItem(chave)

    if (dadoJSON) {
        const listaDados = JSON.parse(dadoJSON)
        return listaDados
    } else {
        return []
    }

}  

function showFeedback(success, mensagem){
    if(!success){
        feedback.classList.add('text-bg-primary')
        feedback.children[0].children[0].innerHTML = mensagem
    }

    const toastFeedback = new bootstrap.Toast(feedback);
    toastFeedback.show();
}
