const novoCadastros = buscarDadosDoLocalStorage('usuarios')

const formularioHTML = document.getElementById('formulario-login')

formularioHTML.addEventListener('submit', (evento) => {
    evento.preventDefault()

    const usuario = document.getElementById('usuario').value
    const senha = document.getElementById('senha').value

    const usuarioEncontrado = novoCadastros.find((valor) => valor.usuario === usuario && valor.senha === senha)

    if (!usuarioEncontrado) {
        alert('Usuario ou senha estão incorretos ou não existem')
        return
    } else {

        guardarNoLocalStorage('usuarioLogado', usuarioEncontrado)

        window.location.href = "./recados.html"
    }



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
