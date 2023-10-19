//tiene que estar en un servidor ggg, puede ser XAMP o live server
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      $('#procesos').load('./aseets/pages/chat.html')
      var uid = user.uid;
      $('#cerrarSesion').removeClass('d-none')
    
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

 