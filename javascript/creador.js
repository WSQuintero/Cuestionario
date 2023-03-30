const preguntas = document.querySelector('#preguntas')
const respuestas = document.querySelector('#respuestas')
const container = document.querySelector('.container')
const buttonCreator = document.querySelector('.buttonCreator')
const divCreador = document.querySelector('.creador')
const creadorContainer = document.querySelector('.creadorContainer')

const buttonReiniciar = document.createElement('button')
const botonDescarga = document.createElement('button')
const enviar = document.createElement('button')
let numberQuestion
const respuestasCorrectas = {}
const containerButtons = document.querySelector('.containerButtons')
buttonCreator.addEventListener('click', creador)

function adjustItemsPosition () {
  const containerPregunta = document.querySelector('.container')
  const items = containerPregunta.querySelectorAll('.main__container__trivia')

  items.forEach(a => {
    a.style.position = 'relative'
    a.style.top = '0px'
    console.log(a)
  })
}

function cifrarRespuestas () {
  const clave = '1012437325Cc'
  const respuestasCorrectasJSON = JSON.stringify(respuestasCorrectas)
  const mensajeCifrado = CryptoJS.AES.encrypt(
    respuestasCorrectasJSON,
    clave
  ).toString()
  return mensajeCifrado
}
function createButtonSend () {
  enviar.classList.add('enviar')
  enviar.innerText = 'Enviar'
  containerButtons.appendChild(enviar)
  enviar.classList.add('remover')

  botonDescarga.innerText = 'Descargar cuestionario'
  botonDescarga.classList.add('botonDescarga')
  botonDescarga.addEventListener('click', descargarCuestionario)
  containerButtons.appendChild(botonDescarga)
}
function descargarCuestionario () {
  enviar.classList.remove('remover')
  botonDescarga.classList.add('remover')
  buttonReiniciar.classList.add('remover')
  const section = document.querySelector('section')
  const cifrado = document.createElement('div')
  cifrado.innerText = cifrarRespuestas()
  section.appendChild(cifrado)
  cifrado.classList.add('cifrado')
  cifrado.classList.add('remover')
  const contenido = `${section.innerHTML}`

  const archivo = new Blob([contenido], { type: 'text/html' })
  const urlArchivo = URL.createObjectURL(archivo)

  const link = document.createElement('a')
  link.href = urlArchivo
  link.download = 'mi_cuestionario.html'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  buttonReiniciar.classList.remove('remover')
  enviar.classList.add('remover')
  console.log(respuestasCorrectas)
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
function reset () {
  buttonReiniciar.classList.add('buttonReiniciar')
  buttonReiniciar.innerText = 'Reiniciar'
  containerButtons.appendChild(buttonReiniciar)
  buttonReiniciar.addEventListener('click', () => {
    location.reload()
  })
}
function deleteButtonCorrect () {
  const buttonsCorrect = document.querySelectorAll(`.respuestaCorrecta${numberQuestion}`
  )

  for (const correct of buttonsCorrect) {
    correct.classList.add('remover')
  }
}
function creador (event) {
  event.preventDefault()
  divCreador.classList.add('remover')
  const main = document.querySelector('main')
  main.classList.remove('.main')
  creadorContainer.style.height = 'auto'
  for (let i = 0; i < preguntas.value; i++) {
    const containerQuestions = document.createElement('div')
    const containerPregunta = document.createElement('div')
    const inputPregunta = document.createElement('input')
    const buttonPregunta = document.createElement('button')
    const h2 = document.createElement('h2')
    const ul = document.createElement('ul')
    const divContainerLabel = document.createElement('div')
    let correct
    let respuestaCorrectaClickeado = false

    containerQuestions.classList.add('main__container__trivia')
    containerQuestions.classList.add(`pregunta${i + 1}`)
    containerPregunta.classList.add('containerPregunta')
    buttonPregunta.classList.add('buttonPregunta')
    h2.classList.add('main__list__tittle')
    h2.classList.add('remover')
    divContainerLabel.classList.add('divContainerLabel')

    inputPregunta.type = 'text'
    buttonPregunta.innerText = 'Crear pregunta'
    inputPregunta.placeholder = 'Escibe la pregunta aquí'

    container.appendChild(containerQuestions)
    containerQuestions.appendChild(containerPregunta)
    containerPregunta.appendChild(inputPregunta)
    containerPregunta.appendChild(buttonPregunta)
    containerPregunta.appendChild(h2)
    divContainerLabel.appendChild(ul)

    buttonPregunta.addEventListener('click', () => {
      h2.classList.remove('remover')
      h2.innerText = inputPregunta.value
      buttonPregunta.classList.add('remover')
      inputPregunta.classList.add('remover')
    })

    for (let o = 0; o < respuestas.value; o++) {
      const li = document.createElement('li')
      const label = document.createElement('label')
      const input = document.createElement('input')
      const inputRespuestas = document.createElement('input')
      const ButtonCrearRespuesta = document.createElement('button')
      const respuestaCorrecta = document.createElement('button')
      const containers = document.querySelectorAll('.main__container__trivia')

      const crearRespuesta = () => {
        if (respuestaCorrectaClickeado) {
          label.innerText = inputRespuestas.value
          label.appendChild(input)
          ButtonCrearRespuesta.classList.add('remover')
          inputRespuestas.classList.add('remover')
          input.classList.remove('remover')

          selectionInput()
        } else {
          alert('Por favor selecciona la respuesta correcta primero')
        }
      }
      const seleccionarCorrecta = () => {
        correct = `pregunta${i}respuesta${o}`
        console.log(correct)
        numberQuestion = i
        deleteButtonCorrect()
        respuestaCorrectaClickeado = true
        respuestasCorrectas[`pregunta${i}`] = correct
      }

      input.type = 'radio'
      input.name = `Pregunta${i}`
      divContainerLabel.htmlFor = `Pregunta${i}`

      ul.classList.add('main__container__list')
      li.classList.add('main__element_list')
      label.classList.add('main__checkbox__label')
      input.classList.add('main__input__radio')
      input.classList.add('remover')
      inputRespuestas.classList.add('inputRespuestas')
      inputRespuestas.classList.add('inputRespuestas')
      respuestaCorrecta.classList.add(`respuestaCorrecta${i}`)

      inputRespuestas.placeholder = 'Escribe la opción de respuesta aquí'
      ButtonCrearRespuesta.innerText = 'Crear'
      respuestaCorrecta.innerText = '¿correcta?'

      label.appendChild(inputRespuestas)
      label.appendChild(respuestaCorrecta)
      label.appendChild(ButtonCrearRespuesta)

      ButtonCrearRespuesta.addEventListener('click', crearRespuesta)
      respuestaCorrecta.addEventListener('click', seleccionarCorrecta)

      for (const cadaPregunta of containers) {
        cadaPregunta.appendChild(divContainerLabel)
        ul.appendChild(li)
        li.appendChild(label)
        input.id = `pregunta${i}respuesta${o}`
      }
    }
  }
  adjustItemsPosition()

  window.addEventListener('resize', adjustItemsPosition)
  createButtonSend()
  reset()
}
