const usuarioActual = JSON.parse(localStorage.getItem('usuarioActual'))
const inputArchivo = document.getElementById('seleccionar-archivo')
const main = document.querySelector('main')
const nombre = document.querySelector('h1')
const busqueda = document.querySelector('.busqueda')
nombre.innerText = `Hola ${usuarioActual.name}`

inputArchivo.addEventListener('change', seleccionarArchivo)

class Enviar {
  #datoCifrado = '1012437325Cc'

  #desCifrarDato () {
    return this.#datoCifrado
  }

  iniciar () {
    const enviar = document.querySelector('.enviar')
    enviar.addEventListener('click', () => {
      const dato = this.#desCifrarDato()
      desCifrar(dato)
    })
  }
}
function desCifrar (clave) {
  const cifrado = document.querySelector('.cifrado').innerText
  const decrypted = CryptoJS.AES.decrypt(cifrado, clave).toString(
    CryptoJS.enc.Utf8
  )
  const respuestas = JSON.parse(decrypted)
  resultado(respuestas)
}
function selectionInput () {
  const li = document.querySelectorAll('li')
  li.forEach((a) => {
    a.querySelectorAll('input').forEach((b) => {
      a.addEventListener('click', () => {
        b.checked = true
      })
    })
  })
}
function seleccionarArchivo () {
  const archivo = inputArchivo.files[0]

  const reader = new FileReader()

  reader.addEventListener('load', () => {
    fetch(reader.result)
      .then((response) => response.text())
      .then((data) => {
        main.innerHTML = data
        selectionInput()
        const enviar = new Enviar()
        enviar.iniciar()
      })
  })

  reader.readAsDataURL(archivo)
  inputArchivo.classList.add('remover')
  busqueda.innerHTML = 'Muy buena suerte'
}
function resultado (objResultados) {
  main.classList.add('remover')
  // aquí va la lógica para saber la cantidad de respuestas correctas
}
// Crear una instancia de la clase y usar la función iniciar
