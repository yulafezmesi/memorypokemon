<template>
  <div>
    <div class="container">
      <h1>Poke Matching</h1>
      <div class="cards">
        <li v-for="poke in pokemons" :key="poke" class="card">
          <img class="cardimage" :src="require(`../../src/assets/img/pokemon/g1/${poke}.png`)" />
        </li>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  
  data() {
    return {
      pokemons: [
        "bulbasaur",
        "ivysaur",
        "venusaur",
        "charmander",
        "charmeleon",
        "charizard",
        "squirtle",
        "wartortle",
        "blastoise",
        "caterpie",
        "metapod",
        "butterfree",
        "weedle",
        "kakuna",
        "beedrill",
        "pidgey",
        "pidgeotto",
        "pidgeot",
        "rattata",
        "raticate",
        "spearow",
        "fearow",
        "ekans",
        "nidorina",
        "nidoqueen"
      ]
    };
  },
  name: "Container"
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
