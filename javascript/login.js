const baseUsuarios = JSON.parse(localStorage.getItem('baseUsuarios')) || []
const usuario = document.querySelector('#usuario')
const password = document.querySelector('#password')
const button = document.getElementById('button')
const error = document.querySelector('#error')

console.log(baseUsuarios)
button.addEventListener('click', ingresar)

function ingresar (event) {
  const busqueda = desCifrar().find(
    (a) => a.user === usuario.value && a.pass === password.value
  )

  localStorage.setItem('usuarioActual', JSON.stringify(busqueda))

  if (busqueda === undefined) {
    error.innerText = 'El usuario o contraseña son incorrectos'
    error.style.color = 'red'
    error.style.textAlign = 'center'
    event.preventDefault()
  } else {
    if (busqueda.tipo === 'Estudiante') {
      const link = document.createElement('a')
      link.href = './html/juego.html'
      link.click()
      event.preventDefault()
    } else if (busqueda.tipo === 'Profesor') {
      const link = document.createElement('a')
      link.href = './html/creador.html'
      link.click()
      event.preventDefault()
    }
  }
}

function desCifrar () {
  const decrypted = CryptoJS.AES.decrypt(baseUsuarios, '1012437325Cc').toString(
    CryptoJS.enc.Utf8
  )
  const respuestas = JSON.parse(decrypted)
  return respuestas
}
