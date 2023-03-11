const container = document.querySelector(".container");
const nombre = document.querySelector("#nombre");
const usuario = document.querySelector("#usuario");
const password = document.querySelector("#password");
const repeat = document.querySelector("#repeat");
const estudiante = document.querySelector("#estudiante");
const profesor = document.querySelector("#profesor");
const button = document.querySelector("button");
let baseUsuarios = JSON.parse(localStorage.getItem("baseUsuarios")) || [];
let nuevoUsuario;
class Usuario {
  constructor(name, user, passw) {
    this.name = name;
    this.user = user;
    this.pass = passw;
  }
}

class Estudent extends Usuario {
  constructor(name, user, passw, tipo) {
    super(name, user, passw);
    this.tipo = "Estudiante";
  }
}

class Teacher extends Usuario {
  constructor(name, user, passw, tipo) {
    super(name, user, passw);
    this.tipo = "Profesor";
  }
}

button.addEventListener("click", addNewUser);

function addNewUser(event) {
    function baseDeDatosAdd(usuarioAdd){
      baseUsuarios.push(usuarioAdd);
        localStorage.setItem("baseUsuarios", JSON.stringify(baseUsuarios));
    }
    const usuarioExistente = baseUsuarios.find((a) => a.user === usuario.value);

    if(usuarioExistente === undefined){
      if (
        (nombre.value &&
          usuario.value &&
          password.value &&
          repeat.value &&
          estudiante.value &&
          profesor.value !== undefined ||
          "") 
      ) {
    if(password.value ===repeat.value){
      
        
      if(estudiante.checked ===false&& profesor.checked===false){
        const errorCont=document.querySelector(".error");
        errorCont.innerText="Por favor selecciona si eres profesor o estudiante";
        event.preventDefault();      
      }
    
      if (estudiante.checked === true) {
        const usuarioAdd = new Estudent(
          nombre.value,
          usuario.value,
          password.value,
          repeat.value
        );
        baseDeDatosAdd(usuarioAdd);
        alert("Usuario Creado exitosamente");
      } else if (profesor.checked === true) {
        const usuarioAdd = new Teacher(
          nombre.value,
          usuario.value,
          password.value,
          repeat.value
        );
        baseDeDatosAdd(usuarioAdd);
        alert("Usuario Creado exitosamente");
      }
        }else{
          const errorCont=document.querySelector(".error");
        errorCont.innerText="Las dos contraseñas deben coincidir";
        errorCont.style.color="red";
        errorCont.style.fontWeight=700;
        event.preventDefault();
        }
    }else{
      const errorCont=document.querySelector(".error");
        errorCont.innerText="Por favor digita todos los campos";
        errorCont.style.color="red";
        errorCont.style.fontWeight=700;
        event.preventDefault();
      const inputs =document.querySelectorAll("input");
      
      inputs.forEach(a=>{
        if(a.value === undefined || a.value ===""){
          a.style.borderColor="red";
        }
      })
    };
    }else{
      const errorCont=document.querySelector(".error");
      errorCont.innerText="El usuario ya se encuentra registrado";
      errorCont.style.color="red";
      errorCont.style.fontWeight=700;
      event.preventDefault();
    }

 

}
    
      
  


console.log(baseUsuarios);

/*    let usuariosJSON = JSON.stringify(valorGuardado);

        let archivo = new Blob([usuariosJSON], { type: "text/javascript" });
  
        let enlace = document.createElement("a");
  
        enlace.href = URL.createObjectURL(archivo);
        enlace.download =`${window[nombreValue].name}.js`;
        enlace.click();         */
