const usuarioLogado = []

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

    usuarioLogado.push(novoCadastro)
    guardarNoLocalStorage(novoCadastro)

    
    formularioHTML.reset()

    montrarRegistroNoHTML() 




    })

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
    
    function montrarRegistroNoHTML() {
        tbody.innerHTML = ''
    
        usuarioLogado.forEach((valor,index) => {
            tbody.innerHTML += `
                    <tr class="meusrecados">
                            
                            <td class="index" ${index + 1} </td>
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
        