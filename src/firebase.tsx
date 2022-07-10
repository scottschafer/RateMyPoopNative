// Import the functions you need from the SDKs you need

// import firebase, { initializeApp } from "react-native-firebase";
import firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
// import firebase, { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// import { getAuth, onAuthStateChanged, signInAnonymously } from "firebase/auth";
// import { child, equalTo, get, getDatabase, orderByChild, query, ref, set } from 'firebase/database'

// import { getAuth, onAuthStateChanged, signInAnonymously } from "@react-native-firebase/auth";
// import { child, equalTo, get, getDatabase, orderByChild, query, ref, set } from '@react-native-firebase/database'


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA68hVCB6ElXaAYzHmJXXlu5P71wCr5r6E",
  authDomain: "multiplayer-game-f788f.firebaseapp.com",
  databaseURL: "https://multiplayer-game-f788f.firebaseio.com",
  projectId: "multiplayer-game-f788f",
  storageBucket: "multiplayer-game-f788f.appspot.com",
  messagingSenderId: "5875390216",
  appId: "1:5875390216:web:f4ca641fed244268b3bebd",
  measurementId: "G-SPWZM8KHHM"
};

// // Initialize Firebase
// const app = firebase.initializeApp(firebaseConfig);
// // const database = firebase.getDatabase(app);
// // const analytics = getAnalytics(app);

// // const auth = getAuth();
// auth().signInAnonymously()
//   // signInAnonymously(auth)
//   .then(() => {
//     // Signed in..
//     // debugger;
//   })
//   .catch((error) => {
//     const errorCode = error.code;
//     const errorMessage = error.message;
//     // ...
//   });


// onAuthStateChanged(auth, (user) => {
//   if (user) {
//     // User is signed in, see docs for a list of available properties
//     // https://firebase.google.com/docs/reference/js/firebase.User
//     const uid = user.uid;
//     // ...
//   } else {
//     // User is signed out
//     // ...
//   }
// })

export const initFirebase = () => {
  auth().signInAnonymously();
}

export const isNameAvailable = async (name: string) => {
  return new Promise<boolean>((resolve, reject) => {
    

    database()
  .ref(`rmpUser/${name.toLowerCase()}`)
  .once('value')
  .then(snapshot => {
    debugger;
    snapshot.val();
  //   console.log('User data: ', snapshot.val());
  // });

    // firebase.database().ref(`rmpUser/${name.toLowerCase()}`).once(result => {

    })

  //   database
  // const testNameRef = query(ref(database, `rmpUser/${name.toLowerCase()}`));
  // const result = await get(testNameRef);
  // return ! result.exists();
})
}

//   once
//   topUserPostsRef.once
//   if (topUserPostsRef.)
// const dbRef = ref(getDatabase(), 'rmpUser');
// get(orderByChild()

// orderByChild('name').type
// get(orderByChild('name'))

// dbRef.orderByChild("name").equalTo("Raja Tamil")
// get(child(dbRef, 'rmpUser')).orderByChild("name").equalTo("Raja Tamil")
// ref(database, "rmpUser").o

// getDatabase(app).
// firebase.d
// firebase.database().
// app.d
// // firebase
// // firebase.database()
// // database
// let gameFirebase = app.database().ref(ref);

// databaseReference.orderByChild("type").equalTo

//   return true;
// }

export const claimName = async (name: string, id: string) => {

  const avail = await isNameAvailable(name);
  if (avail) {
    debugger;
    // const nameRef = ref(database, `rmpUser/${name.toLowerCase()}`);
    // await set(nameRef, {id})
    return true;
  }
  return false;
};
