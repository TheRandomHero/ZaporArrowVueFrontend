import firebase from 'firebase'
import 'firebase/firestore'
const firebaseConfig = {
    apiKey: process.env.VUE_APP_FIREBASEAPIKEY,
    authDomain: "zaporarrow-7f6ed.firebaseapp.com",
    databaseURL: "https://zaporarrow-7f6ed.firebaseio.com",
    projectId: "zaporarrow-7f6ed",
    storageBucket: "zaporarrow-7f6ed.appspot.com",
    messagingSenderId: process.env.VUE_APP_FIREBASEMESSAGESENDERID,
    appId: process.env.VUE_APP_FIREBASEAPPID,
    measurementId: process.env.VUE_APP_FIREBASEMEASUREMENTID
  };
  
  
  export default firebase.initializeApp(firebaseConfig);