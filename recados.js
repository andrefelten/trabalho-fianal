const usuarioLogado = buscarDadosDoLocalStorage('usuarioLogado')

document.addEventListener('DOMContentLoaded', () => {
    if(!usuarioLogado.usuario) {
        window.location.href="./index.html"
    } else {
        montrarRegistroNoHTML()
    }
})

const listaRecados = usuarioLogado.recados

const formularioHTML = document.getElementById('formulario-cadastro')

const tbody = document.getElementById('registros')

formularioHTML.addEventListener('submit', (evento) => {
    evento.preventDefault()

    const descricao = document.getElementById('descricao').value
    const recadoEscrito = document.getElementById('recadoEscrito').value

    const novoCadastro = {
        descricao: descricao,
        recadoEscrito: recadoEscrito,
    }

    listaRecados.push(novoCadastro)

    salvarRecados()
   

    
    formularioHTML.reset()

    montrarRegistroNoHTML() 

    guardarNoLocalStorage('usuarioLogado', usuarioLogado)




    })

    function montrarRegistroNoHTML() {
        tbody.innerHTML = ''
    
        listaRecados.forEach((valor,index) => {
            tbody.innerHTML += `
                    <tr class="meusrecados" id="${index}">
                            
                            <td class="index" > ${index + 1} </td>
                            <td class ="valorDescricao">${valor.descricao}</td>
                            <td class = "recadoEscrito">${valor.recadoEscrito}
                            <td>
                                <button class = "apagar">Apagar</button>
                                <button class = "editar">Editar</button>
                            </td>
                            
                          </tr>
            
            `
    })
}




function salvarRecados(){
    const listaUsuario = buscarDadosDoLocalStorage('usuarios')

    const acharUsuario = listaUsuario.findIndex((valor) => valor.usuario === usuarioLogado.usuario)
 
    listaUsuario[acharUsuario].recados = listaRecados
 
    guardarNoLocalStorage('usuarios', listaUsuario)
}

function guardarNoLocalStorage(chave, valor) {
    const valorJSON = JSON.stringify(valor)

    localStorage.setItem(chave, valorJSON)

}

function buscarDadosDoLocalStorage(chave) {

    const dadoJSON = localStorage.getItem(chave)

    if(dadoJSON) {
        const listaDados = JSON.parse(dadoJSON)
        return listaDados
    } else {
        return {}
    }
}

        