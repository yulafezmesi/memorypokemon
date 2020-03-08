<template>
  <li
    :class="{ 'poke-match': poke.match}"
    @click="pokeClick"
    class="card"
    :style=" poke.match ? 'animation-duration: 1s; animation-name: poke-match' : 'border: none;' "
  >
    <div
      v-show="poke.faceup"
      class="cardimage"
      :style="{'background-image': `url( ${require(`../assets/img/pokemon/g${poke.generation}/${poke.name}.png`)} )`}"
    >
      <p class="caption">{{poke.name}}</p>
    </div>
  </li>
</template>

<script>
import EventBus from "../event-bus";

export default {
  props: {
    poke: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      required: true
    },
    selectedPokesCount: {
      type: Number,
      required: true
    }
  },
  mounted() {},
  methods: {
    pokeClick() {
      if (!this.poke.match && this.selectedPokesCount < 2) {
        console.log(this.poke);
        this.poke.faceup = !this.poke.faceup;
        this.poke.index = this.index;
        EventBus.$emit("pokeClick", this.poke);
      }
    }
  },
  data() {
    return {
      faceUp: false,
      isClick: true
    };
  }
};
</script>

<style>
@keyframes poke-match {
  from {
    height: 125px;
    width: 125px;
    background: #02b3e4;
  }
  50% {
    height: 150px;
    width: 150px;
  }
  to {
    height: 125px;
    width: 125px;
    background: #02ccba;
  }
}
.cardimage {
  height: 70px;
  width: 70px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  position: relative;
}
.poke-match {
  cursor: default !important;
  background: #02ccba !important;
}
.caption {
  position: absolute;
  bottom: 0;
  left: 0;
  background: #000;
  color: #fff;
  width: 100%;
  margin: 0;
}
</style>