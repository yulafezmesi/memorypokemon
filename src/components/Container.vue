<template>
  <div class="container">
    <div class="d-flex header">
      <div
        class="cardimage"
        :style="{'background-image': `url( ${require(`../assets/img/pokemon/cute/g${generation.gen}/cute1.png`)} )`}"
      />
      <h1>Poke Matching</h1>
      <div
        class="cardimage"
        :style="{'background-image': `url( ${require(`../assets/img/pokemon/cute/g${generation.gen}/cute2.png`)} )`}"
      />
    </div>
    <div class="d-flex">
      <v-btn-toggle
        borderless
        style="margin-bottom:10px"
        width="100"
        @change="changeGeneration"
        v-model="generation"
        mandatory
      >
        <v-btn class="bordercolor" :value="g1">
          <img class="generation" :src="require(`../assets/img/pokemon/g1/g1.png`)" />
        </v-btn>
        <v-btn :value="g2">
          <img class="generation" :src="require(`../assets/img/pokemon/g2/g2.png`)" />
        </v-btn>
        <v-btn :value="g3">
          <img class="generation" :src="require(`../assets/img/pokemon/g3/g3.png`)" />
        </v-btn>
        <v-btn :value="g4">
          <img class="generation" :src="require(`../assets/img/pokemon/g4/g4.png`)" />
        </v-btn>
        <v-btn :value="g5">
          <img class="generation" :src="require(`../assets/img/pokemon/g5/g5.png`)" />
        </v-btn>
        <v-btn :value="g6">
          <img class="generation" :src="require(`../assets/img/pokemon/g6/g6.png`)" />
        </v-btn>
      </v-btn-toggle>
    </div>
    <div class="cards">
      <ul v-for="(poke,i) in pokemons" :key="i">
        <app-poke-item
          :selectedPokesCount="selectedPokesCount"
          :index="i"
          :faceUp="faceUp"
          :poke="poke"
        ></app-poke-item>
      </ul>
    </div>
  </div>
</template>

<script>
import EventBus from "../event-bus";
import PokeItem from "./Pokeitem";
var firebase = require("firebase");
const firebaseConfig = require("../firebasekey/config");
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();
export default {
  mounted() {
    this.getPokemons();
    EventBus.$on("pokeClick", obj => {
      this.selectedPokes.push(obj);
      if (this.selectedPokes.length == 2) {
        if (
          this.selectedPokes[0].id == this.selectedPokes[1].id &&
          this.selectedPokes[0].index != this.selectedPokes[1].index
        ) {
          this.pokemons[this.selectedPokes[0].index].match = true;
          this.pokemons[this.selectedPokes[1].index].match = true;
          this.selectedPokes = [];
        } else {
          setTimeout(() => {
            this.pokemons[this.selectedPokes[0].index].faceup = false;
            this.pokemons[this.selectedPokes[1].index].faceup = false;
            this.selectedPokes = [];
          }, 1000);
        }
      }
    });
  },
  methods: {
    changeGeneration() {
      this.getPokemons();
    },
    getUniqueNumbers(range) {
      let min = range[0];
      let max = range[1];
      let arr = [];
      for (let i = 0; i < 8; i++) {
        let random = Math.floor(Math.random() * (max - min + 1) + min);
        if (arr.indexOf(random) == -1) arr.push(random);
        else {
          i--;
        }
      }
      return arr;
    },
    shuffleArray() {
      for (let i = this.pokemons.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [this.pokemons[i], this.pokemons[j]] = [
          this.pokemons[j],
          this.pokemons[i]
        ];
      }
    },
    getPokemons() {
      db.collection("pokemons")
        .where("generation", "==", this.generation.gen)
        .where("id", "in", this.getUniqueNumbers(this.generation.range))
        .limit(8)
        .get()
        .then(querySnapshot => {
          this.pokemons = [];
          querySnapshot.forEach(doc => {
            let obj = { ...doc.data(), match: false, faceup: false };
            let repObj = { ...obj, match: false, faceup: false };
            repObj.id = Math.random() + this.generation.range[1] * 15;
            repObj.id = obj.id;
            this.pokemons.push(obj);
            this.pokemons.push(repObj);
          });
          this.shuffleArray();
        });
    }
  },
  computed: {
    selectedPokesCount() {
      const selectedPokesCount = this.selectedPokes.filter(poke => !poke.match);
      return selectedPokesCount.length;
    }
  },
  components: {
    appPokeItem: PokeItem
  },
  data() {
    return {
      faceUp: false,
      selectedPokes: [],
      pokemons: [],
      g1: {
        gen: 1,
        range: [1, 151]
      },
      g2: {
        gen: 2,
        range: [152, 251]
      },
      g3: {
        gen: 3,
        range: [252, 386]
      },
      g4: {
        gen: 4,
        range: [387, 493]
      },

      g5: {
        gen: 5,
        range: [494, 649]
      },
      g6: {
        gen: 6,
        range: [650, 721]
      },
      generation: {
        gen: 1,
        range: [1, 151]
      }
    };
  },
  name: "Container"
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.header {
  justify-content: space-around !important;
  width: 70%;
  flex-direction: row !important;
}
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

.container {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}
.generation {
  width: 50px;
  height: auto;
}
</style>
