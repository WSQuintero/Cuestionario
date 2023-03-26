const usuarioActual = JSON.parse(localStorage.getItem('usuarioActual'))
const inputArchivo = document.getElementById('seleccionar-archivo')
const main = document.querySelector('main')
const nombre = document.querySelector('h1')
const busqueda = document.querySelector('.busqueda')
const body = document.querySelector('body')
let contador = 0

inputArchivo.addEventListener('change', seleccionarArchivo)
nombre.innerText = `Hola ${usuarioActual.name}`

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
  const containerQuestion = document.querySelectorAll(
    '.main__container__trivia'
  )
  let respuestaCorrecta

  for (const compa of containerQuestion) {
    const pregunta = compa.querySelector('.main__list__tittle')
    const label = compa.querySelector('.main__checkbox__label')
    const liRespuestaCorrecta = document.createElement('li')
    const liRespuestaIncorrecta = document.createElement('li')
    const divContainerRespuesta = document.createElement('div')
    const h2 = document.createElement('h2')
    const ul = compa.querySelector('ul')
    const li = ul.querySelectorAll('li')

    h2.innerText = pregunta.innerText
    body.appendChild(divContainerRespuesta)
    divContainerRespuesta.appendChild(h2)
    h2.classList.add('h2Respuesta')
    divContainerRespuesta.classList.add('divContainerRespuesta')

    li.forEach((a) => {
      const input = a.querySelector('input')
      const label = a.querySelector('label')
      for (const quest in objResultados) {
        if (input.id === objResultados[quest]) {
          respuestaCorrecta = label.innerText
        }
        if (input.checked === true) {
          if (input.id === objResultados[quest]) {
            contador++
            liRespuestaCorrecta.innerText = `respuesta correcta ${respuestaCorrecta}`
            divContainerRespuesta.appendChild(liRespuestaCorrecta)
          } else {
            liRespuestaIncorrecta.innerText = `respuesta incorrecta ${label.innerText}`
            liRespuestaCorrecta.innerText = `respuesta correcta ${respuestaCorrecta}`
            divContainerRespuesta.appendChild(liRespuestaIncorrecta)
            divContainerRespuesta.appendChild(liRespuestaCorrecta)
          }
        }
      }
    })
  }
}

// Crear una instancia de la clase y usar la función iniciar
