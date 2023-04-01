const usuarioActual = JSON.parse(localStorage.getItem('usuarioActual'))
const inputArchivo = document.getElementById('seleccionar-archivo')
const main = document.querySelector('main')
const nombre = document.querySelector('h1')
const busqueda = document.querySelector('.busqueda')
const body = document.querySelector('body')
const containerQuestions = main.getElementsByClassName('main__container__trivia')
let contador = 0

inputArchivo.addEventListener('change', seleccionarArchivo)
nombre.innerText = `Hola ${usuarioActual.name}`

function seleccionarArchivo () {
  class Enviar {
    #datoCifrado = '1012437325Cc'

    #desCifrarDato () {
      return this.#datoCifrado
    }

    iniciar () {
      const enviar = document.querySelector('.enviar')

      enviar.addEventListener('click', () => {
        if (respuestasClickeadas()[0].length === containerQuestions.length) {
          const dato = this.#desCifrarDato()
          desCifrar(dato)
        } else {
          alert('Por favor selecciona todas las respuestas')
        }
      }

      )
    }
  }
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
function desCifrar (clave) {
  const cifrado = document.querySelector('.cifrado').innerText
  const decrypted = CryptoJS.AES.decrypt(cifrado, clave).toString(
    CryptoJS.enc.Utf8
  )
  const respuestas = JSON.parse(decrypted)
  const copiaResultados = Object.values(respuestas)

  resultado(copiaResultados)
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
function respuestasClickeadas () {
  const containerPreguntas = document.querySelectorAll(
    '.main__container__trivia'
  )
  const respuestasClickeadas = []
  const respuestasNoClickeadas = []

  for (const compa of containerPreguntas) {
    const contenedorNombrePregunta = compa.querySelector('.containerPregunta')
    const nombrePregunta = contenedorNombrePregunta.querySelector(
      '.main__list__tittle'
    )
    const ul = compa.querySelector('ul')
    const numero = compa.querySelector('span')
    const li = ul.querySelectorAll('li')

    li.forEach((a) => {
      const label = a.querySelector('label')
      const input = label.querySelector('input')

      if (input.checked) {
        respuestasClickeadas.push({
          numero: numero.innerText,
          id: input.id,
          respuesta: label.innerText,
          pregunta: nombrePregunta.innerText
        })
      } else {
        respuestasNoClickeadas.push({
          numero: numero.innerText,
          id: input.id,
          respuesta: label.innerText,
          pregunta: nombrePregunta.innerText
        })
      }
    })
  }

  return [respuestasClickeadas, respuestasNoClickeadas]
}
function respuestas (respuestasCorrectas) {
  const correctas = respuestasClickeadas()[0]
    .filter((clicked, index) => {
      clicked.correcta = respuestasCorrectas[index]
      return clicked.id === respuestasCorrectas[index]
    })
    .map((c) => {
      c.resultado = 'correcta'
      contador++
      return c
    })

  const inCorrectas = respuestasClickeadas()[0]
    .filter((clicked, index) => {
      clicked.correcta = respuestasCorrectas[index]
      return clicked.id !== respuestasCorrectas[index]
    })
    .map((c) => {
      c.resultado = 'Incorrecta'
      return c
    })

  const todas = correctas
    .concat(inCorrectas)
    .sort((a, b) => a.numero - b.numero)

  return todas
}

function resultado (respuestasCorrectas) {
  main.classList.add('remover')

  const containerRespuestas = document.createElement('div')
  containerRespuestas.classList.add('containerRespuestas')
  respuestas(respuestasCorrectas).forEach((a) => {
    const containerRespu = document.createElement('div')
    const correcta = respuestasClickeadas()[1].find(
      (noClick) => noClick.id === a.correcta
    )
    const final = a.resultado === 'Incorrecta' ? correcta.respuesta : a.respuesta

    containerRespu.classList.add('containerRespu')

    containerRespu.innerHTML = `
    <h1 class="tittleRespuesta"><b>${a.numero}.</b> ${a.pregunta}</h1>
    <h2 class="tittleRespuesta2">Tu respuesta fue: ${a.resultado}</h2>
    <p class="respuestaFinal"><b>Respuesta seleccionada:</b> ${a.respuesta}</p>
    <p class="respuestaFinal2"></p>
    `
    if (a.resultado === 'Incorrecta') {
      const respuestaFinal = containerRespu.querySelector('.respuestaFinal')
      const respuestaFinal2 = containerRespu.querySelector('.respuestaFinal2')
      const tittleRespuesta2 = containerRespu.querySelector('.tittleRespuesta2')

      respuestaFinal.style.border = '2px solid red'
      tittleRespuesta2.style.color = 'red'

      respuestaFinal2.innerHTML = `<b>La respuesta correcta era:</b> ${final}`
    } else {
      const respuestaFinal = containerRespu.querySelector('.respuestaFinal')
      const respuestaFinal2 = containerRespu.querySelector('.respuestaFinal2')
      const tittleRespuesta2 = containerRespu.querySelector('.tittleRespuesta2')

      respuestaFinal.style.border = '2px solid green'
      tittleRespuesta2.style.color = 'green'

      respuestaFinal2.classList.add('remover')
    }

    containerRespuestas.appendChild(containerRespu)
  })

  main.insertAdjacentElement('afterend', containerRespuestas)
  containerRespuestas.insertAdjacentHTML(
    'afterend',
		`<span class="contador">Tuviste ${contador} respuestas correctas de ${respuestasClickeadas()[0].length}</span>`
  )
}

// Crear una instancia de la clase y usar la función iniciar
