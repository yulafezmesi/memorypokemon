<template>
  <div>
    <div class="container">
      <h1>Poke Matching</h1>
      <div class="cards">
        <li v-for="(poke,i) in pokemons" :key="poke.id" class="card">
          <p>{{ getImage(i)}}</p>
          {{poke.imageUrl}}
          <img class="cardimage" :src="poke.imageUrl" />
        </li>
      </div>
    </div>
  </div>
</template>

<script>
var firebase = require("firebase");
const firebaseConfig = require("../firebasekey/config");

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();

export default {
  mounted() {
    db.collection("pokemons")
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          let obj = { ...doc.data() };
          this.pokemons.push(obj);
          console.log(obj);
          // console.log(`${doc.id} => ${doc.data().pokemon}`);
        });
      });
  },
  data() {
    return {
      pokemons: []
    };
  },
  name: "Container",
  methods: {
    getPokemons() {},
    getImage(index) {
      var that = this;
      var storage = firebase.storage();
      var gsReference = storage.refFromURL(
        "gs://simpleblog-297e2.appspot.com/pokemons/g1/aerodactyl.png"
      );
      gsReference
        .getDownloadURL()
        .then(function(url) {
          console.log(url + index);
          that.pokemons[index].imageUrl = url;
          console.log(that.pokemons);
        })
        .catch(function(error) {
          console.error(error);
        });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.cards {
  width: 660px;
  min-height: 680px;
  background: linear-gradient(160deg, #02ccba 0%, #aa7ecd 100%);
  padding: 32px;
  border-radius: 10px;
  box-shadow: 12px 15px 20px 0 rgba(46, 61, 73, 0.5);
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  margin: 0 0 3em;
}
.card {
  height: 125px;
  width: 125px;
  background: #2e3d49;
  font-size: 0;
  color: #ffffff;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 5px 2px 20px 0 rgba(46, 61, 73, 0.5);
}
.cardimage {
  height: 70px;
  width: 70px;
}
.container {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}
</style>
