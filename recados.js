const modaelEditar = new bootstrap.Modal('#modalEditar')

const usuarioLogado = buscarDadosDoLocalStorage('usuarioLogado')

document.addEventListener('DOMContentLoaded', () => {
    if (!usuarioLogado.usuario) {
        window.location.href = "./index.html"
    } else {
        montrarRegistroNoHTML()
    }
})




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

    usuarioLogado.recados.push(novoCadastro)





    formularioHTML.reset()

    montrarRegistroNoHTML()

    guardarNoLocalStorage('usuarioLogado', usuarioLogado)




})

function montrarRegistroNoHTML() {
    tbody.innerHTML = ''

    usuarioLogado.recados.forEach((valor, index) => {
        tbody.innerHTML += `
                    <tr id="${index}" class="row text-center mt-4">
                            
                            <td class="col-1  fs-4" > ${index + 1} </td>
                            <td class ="col-4 fs-4">${valor.descricao}</td>
                            <td class ="col-5  fs-4">${valor.recadoEscrito}
                            <td class= "col-2  fs-5">
                                <button class = "btn btn-outline-light" onclick = "botaoApagar(${index})">Apagar</button>
                                <button onclick = "editar(${index})" class = "btn btn-outline-light" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modalEditar">Editar</button>
                            </td>
                            
                          </tr>
            
            `
    })
}




function salvarRecados() {
    const listaUsuario = buscarDadosDoLocalStorage('usuarios')

    const acharUsuario = listaUsuario.findIndex((valor) => valor.usuario === usuarioLogado.usuario)

    listaUsuario[acharUsuario].recados = usuarioLogado.recados

    guardarNoLocalStorage('usuarios', listaUsuario)
}

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
        return {}
    }
}

function botaoApagar(indice) {
    const recadoApagar = usuarioLogado.recados.filter((valor, index) => {
        return indice !== index
    })
    console.log(recadoApagar)
    usuarioLogado.recados = recadoApagar

    guardarNoLocalStorage('usuarioLogado', usuarioLogado)

    const linha = document.getElementById(indice)
    linha.remove()

    montrarRegistroNoHTML()

}

function sair() {
    salvarRecados()
    localStorage.removeItem('usuarioLogado')
    window.location.href = "./index.html"
}

function editar (index) {

    const descricaoEditar = document.getElementById('descricaoEditar')
    const recadoEscritoEditar = document.getElementById('recadoEscritoEditar')

    descricaoEditar.value = usuarioLogado.recados[index].descricao
    recadoEscritoEditar.value = usuarioLogado.recados[index].recadoEscrito

    const recadosFormulario = document.getElementById('cadastro-formulario')

recadosFormulario.addEventListener('submit', (evento) => {
    evento.preventDefault()
    
    usuarioLogado.recados[index].descricao = descricaoEditar.value
    usuarioLogado.recados[index].recadoEscrito = recadoEscritoEditar.value

   
   
   
    guardarNoLocalStorage('usuarioLogado', usuarioLogado)

    montrarRegistroNoHTML()

   
    modaelEditar.hide()
})
}








