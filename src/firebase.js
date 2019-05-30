import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBaSNO98KKS4Dz7MpeZlMA9JqrBw8s6I6w",
  authDomain: "pomodoro-212c5.firebaseapp.com",
  databaseURL: "https://pomodoro-212c5.firebaseio.com",
  projectId: "pomodoro-212c5",
  storageBucket: "pomodoro-212c5.appspot.com",
  messagingSenderId: "703957610674",
  appId: "1:703957610674:web:dc61f0f811c01f0f"
};

firebase.initializeApp(firebaseConfig);

export default firebase;