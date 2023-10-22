//tiene que estar en un servidor ggg, puede ser XAMP o live server
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      //si se logea que pase esto
      $('#procesos').load('./aseets/pages/chat.html')
      var uid = user.uid;
      $('#cerrarSesion').removeClass('d-none')
      //var nombreUser= localStorage.getItem("userName");
      //console.log(nombreUser);
        //hacemos una consulta con un observador (en tiempo real) con snapshot
        db.collection('chat').orderBy('index', 'desc').onSnapshot((query)=>{
          const contenido =document.getElementById('contenido')
          contenido.innerHTML = ""
          query.forEach((element =>{
            const doc=element.data();
            //que me concardene con el contenido que vamos a traer
            contenido.innerHTML += `<div class="cnt__msj d-flex flex-column animate__animated animate__fadeIn"> 
            <div class="cnt__info d-flex align-items-center"> 
              <i class="fa-solid fa-user"></i>
              <span>${doc.nombre}</span>
            </div>
            <div class="msj">${doc.mensaje} </div>
            <div class="cnt__fecha">${doc.fecha} </div>
            <hr>

            </div>`
          }))
        })
        //sino se LOGEO
    } else {
        $('#procesos').load('./aseets/pages/login.html')
        $('#cerrarSesion').addClass('d-none')
    }
  });

  function registro(){
    const nombre=document.getElementById('registerName').value
    const email=document.getElementById('registerEmail').value
    const password=document.getElementById('registerPassword').value

    
     //checar que este en API CON ESPACIO DE NO
     //la contraseña debe ser mayor a 6, debe ser gmail y mas de 5 el nombre
     //no debe haber un email repertido
  firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(() => {
        db.collection('usuarios').add({
            email: email,
            nombre: nombre,
        }).then(() => {
            // Usuario registrado y datos almacenados en Firestore
            localStorage.setItem('userName', nombre);
        }).catch((error) => {
            // Error al agregar datos a Firestore
            var errorCode = error.code;
            var errorMessage = error.message;
        });
    })
    .catch((error) => {
        // Error al crear el usuario en Firebase Authentication
        var errorCode = error.code;
        var errorMessage = error.message;
        // Manejar el error aquí, si es necesario
    });

  }

 function cerrar(){
  firebase.auth().signOut().then(() => {
    // Sign-out successful.
  }).catch((error) => {
    // An error happened.
  });
 }

 function login(){
  //los saque de los input de login
  const email=document.getElementById('email').value
  const password=document.getElementById('password').value

  firebase.auth().signInWithEmailAndPassword(email, password)
  .then((userCredential) => {
    // Signed in
    var user = userCredential.user;
    db.collection('usuarios').where('email',"==", email).get().then((query)=>{
      query.forEach(element => {
        var nombrex=element.data().nombre
        localStorage.setItem('userName', nombrex);

      });
    })

  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
  });

 }

function enviar(){
  //va a recoger la info del btn para enviarla a la bd
  const mensaje =document.getElementById('inputChat')
  var nombreUser =  localStorage.getItem("userName")

  if(mensaje.value === ""){
    Swal.fire(
      'Enviaste algo?',
      'No hay mensaje para enviar',
      'question'
    )
    
  }else{
    db.collection('chat').get().then((query) => {
      var index =""
      const ubicacion = query.docs.length + 1
      

      if(ubicacion < 10){
        index='0' + ubicacion 
      }else{
        //le decimos que es igual a la ubicacion si es mayor a 10 para hacer el orden
        index= ubicacion.toString()
      }
       //hacemos la consulta
      db.collection('chat').add({
        mensaje:mensaje.value,
        nombre:nombreUser,
        fecha:moment().format('MMMM D YYYY, h:mm:ss a'),
        index:index
      })

      }).then(()=>{
        mensaje.value=""
      })
  }
 

}


