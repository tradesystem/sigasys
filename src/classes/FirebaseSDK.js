import firebase from '@react-native-firebase/app'

const config = {
    apiKey: 'AIzaSyDJlXfOhdDuLSK7OpXtn0KLZrXoY98ow4E',
    authDomain: "sigasys-36154.firebaseapp.com",
    projectId: "sigasys-36154",
    storageBucket: "sigasys-36154.appspot.com",
    messagingSenderId: "139297712123",
    appId: "1:139297712123:web:2c3d538747890a92850d5e",
}

let FirebaseSDK

if(!firebase.apps.length){
    FirebaseSDK = firebase.initializeApp(config)
}

export default FirebaseSDK
