import firebase from 'firebase/app'
import 'firebase/firestore'

export const db = firebase
  .initializeApp({ 
    apiKey: "AIzaSyCL52bsLLSxsp1zImp0NtifBsFSCGE6lrU",
    authDomain: "vuejs-keeper.firebaseapp.com",
    databaseURL: "https://vuejs-keeper.firebaseio.com",
    projectId: "vuejs-keeper",
    storageBucket: "vuejs-keeper.appspot.com",
    messagingSenderId: "464207270364",
    appId: "1:464207270364:web:62d46c3f3a44e559a7ff19"
   })
  .firestore()

const { Timestamp } = firebase.firestore
export { Timestamp }