
var firebaseConfig ={
    apiKey: "AIzaSyBJYt2q-_eRIzjxsw1epmlmwsdB_Q9wPLo",
    authDomain: "chat-e7dff.firebaseapp.com",
    projectId: "chat-e7dff",
    storageBucket: "chat-e7dff.appspot.com",
    messagingSenderId: "818635831682",
    appId: "1:818635831682:web:fc937fcd16ef605710f79b"
}
//inicializamos nuestra conexxion
firebase.initializeApp(firebaseConfig);

const db=firebase.firestore()