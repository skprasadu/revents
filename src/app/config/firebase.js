import firebase from 'firebase';
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyBSqE4JYY4k-Dpi6Q5QiohJy3nMxxO6s6Q",
    authDomain: "revents-229904.firebaseapp.com",
    databaseURL: "https://revents-229904.firebaseio.com",
    projectId: "revents-229904",
    storageBucket: "revents-229904.appspot.com",
    messagingSenderId: "283888878575"
}

firebase.initializeApp(firebaseConfig);
const firestore = firebase.firestore();
const settings = {
    timestampsInSnapshots: true
}

firestore.settings(settings);

export default firebase;