<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <Container />
  </div>
</template>

<script>
import Container from "./components/Container.vue";

var firebase = require("firebase");

var firebaseConfig = {
  apiKey: "AIzaSyBkaRPhQu2DftTnQaMDEZWTJKwzF0v3j0k",
  authDomain: "simpleblog-297e2.firebaseapp.com",
  databaseURL: "https://simpleblog-297e2.firebaseio.com",
  projectId: "simpleblog-297e2",
  storageBucket: "simpleblog-297e2.appspot.com",
  messagingSenderId: "756151578258",
  appId: "1:756151578258:web:59c7a3d0cd87f3d12f404b"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();
db.collection("pokemons")
  .get()
  .then(querySnapshot => {
    querySnapshot.forEach(doc => {
      let obj = { ...doc.data() };
      console.log(obj);
      // console.log(`${doc.id} => ${doc.data().pokemon}`);
    });
  });

var storage = firebase.storage();
var gsReference = storage.refFromURL('gs://simpleblog-297e2.appspot.com/pokemons/g1/aerodactyl.png')
gsReference.getDownloadURL().then(function(url)                             {
 console.log(url)
}).catch(function(error) {
  console.error(error);
});
export default {
  name: "App",
  components: {
    Container
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 20px;
}
</style>
