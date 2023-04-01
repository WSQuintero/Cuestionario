const nombre = document.querySelector('#nombre')
const usuario = document.querySelector('#usuario')
const password = document.querySelector('#password')
const repeat = document.querySelector('#repeat')
const estudiante = document.querySelector('#estudiante')
const profesor = document.querySelector('#profesor')
const button = document.querySelector('button')
const baseUsuarios = JSON.parse(localStorage.getItem('baseUsuarios')) || []

class Usuario {
  constructor (name, user, passw) {
    this.name = name
    this.user = user
    this.pass = passw
  }

  static cifrarRespuestas (users) {
    const clave = '1012437325Cc'
    const respuestasCorrectasJSON = JSON.stringify(users)
    const mensajeCifrado = CryptoJS.AES.encrypt(respuestasCorrectasJSON, clave).toString()
    return mensajeCifrado
  }

  static addNewUser (event) {
    function baseDeDatosAdd (usuarioAdd) {
      baseUsuarios.push(usuarioAdd)

      localStorage.setItem('baseUsuarios', JSON.stringify(Usuario.cifrarRespuestas(baseUsuarios)))
    }

    const usuarioExistente = baseUsuarios.find((a) => a.user === usuario.value)

    if (usuarioExistente === undefined) {
      if (
        (nombre.value && usuario.value && password.value && repeat.value && estudiante.value && profesor.value !== undefined) || '') {
        if (password.value === repeat.value) {
          if (estudiante.checked === false && profesor.checked === false) {
            const errorCont = document.querySelector('.div__error')
            errorCont.innerText = 'Por favor selecciona si eres profesor o estudiante'
            errorCont.style.color = 'red'
            event.preventDefault()
          }

          if (estudiante.checked === true) {
            const usuarioAdd = new Estudent(
              nombre.value,
              usuario.value,
              password.value,
              repeat.value
            )
            baseDeDatosAdd(usuarioAdd)
            alert('Usuario Creado exitosamente')
            const link = document.createElement('a')
            link.href = '../index.html'
            link.click()
            event.preventDefault()
          } else if (profesor.checked === true) {
            const usuarioAdd = new Teacher(
              nombre.value,
              usuario.value,
              password.value,
              repeat.value
            )
            baseDeDatosAdd(usuarioAdd)
            alert('Usuario Creado exitosamente')
            const link = document.createElement('a')
            link.href = '../index.html'
            link.click()
            event.preventDefault()
          }
        } else {
          const errorCont = document.querySelector('.div__error')
          errorCont.innerText = 'Las dos contraseñas deben coincidir'
          event.preventDefault()
        }
      } else {
        const errorCont = document.querySelector('.div__error')
        errorCont.innerText = 'Por favor digita todos los campos'
        errorCont.style.color = 'red'
        errorCont.style.fontWeight = 700
        event.preventDefault()
        const inputs = document.querySelectorAll('input')

        inputs.forEach((a) => {
          if (a.value === undefined || a.value === '') {
            a.style.borderColor = 'red'
          }
        })
      }
    } else {
      const errorCont = document.querySelector('.div__error')
      errorCont.innerText = 'El usuario ya se encuentra registrado'
      errorCont.style.color = 'red'
      errorCont.style.fontWeight = 700
      event.preventDefault()
    }
  }
}

class Estudent extends Usuario {
  constructor (name, user, passw, tipo) {
    super(name, user, passw)
    this.tipo = 'Estudiante'
  }
}

class Teacher extends Usuario {
  constructor (name, user, passw, tipo) {
    super(name, user, passw)
    this.tipo = 'Profesor'
  }
}

button.addEventListener('click', Usuario.addNewUser)
