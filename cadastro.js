
 const novoCadastros = buscarDadosDoLocalStorage('usuarios')

const formularioHTML = document.getElementById('formulario-cadastro');


formularioHTML.addEventListener('submit', (evento) => {
    evento.preventDefault()

    const usuario = document.getElementById('usuario').value
    const senha = document.getElementById('senha').value
    const verificacao = document.getElementById('varificacao').value

    if(senha !== verificacao){
        alert('As senhas devem ser iguais')
        return
    }


        
    const existe = novoCadastros.some((valor) => valor.usuario === usuario) 
    if(existe){
        alert('Usuario já cadastrado')
        return
    } else {
        alert(`usuario cadastrado com sucesso`)
    }

   
   
    const cadastro = {
        usuario:usuario ,
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

    if(dadoJSON) {
        const listaDados = JSON.parse(dadoJSON)
        return listaDados
    } else {
        return []
    }

}  
