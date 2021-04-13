import firebase from 'firebase';
require('@firebase/firestore')

const firebaseConfig = {
  apiKey: "AIzaSyBe_iCtOrFIcg30jBQZIbbODNx2zF5_xmg",
  authDomain: "myapp-28c4e.firebaseapp.com",
  projectId: "myapp-28c4e",
  storageBucket: "myapp-28c4e.appspot.com",
  messagingSenderId: "690422822252",
  appId: "1:690422822252:web:24edaa58045f4e134a6f49"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase.firestore();
