<template>
  <div class="flip-card" :class="{
    'hover': isOpen
  }">
    <div class="flip-card-inner">
      <div class="flip-card-front">
        <span>{{ message }}</span>
      </div>
      <div class="flip-card-back">
        <span>{{ message }}</span>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from 'vue-class-component'

@Options({
  props:{
    isOpen: Boolean,
    message: String
  }
})
export default class ButtonFlip extends Vue {
  message!: string;
  isOpen!: string;
}
</script>
<style lang="scss">
@import '../styles/sizes';
/* The flip card container - set the width and height to whatever you want. We have added the border property to demonstrate that the flip itself goes out of the box on hover (remove perspective if you don't want the 3D effect */
.flip-card {
  background-color: transparent;
  width: 35px;
  height: 32px;
  border: 1px solid #f1f1f1;
  perspective: 1000px; /* Remove this if you don't want the 3D effect */
}

/* This container is needed to position the front and back side */
.flip-card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.8s;
  transform-style: preserve-3d;
}

/* Do an horizontal flip when you move the mouse over the flip box container */
.flip-card.hover .flip-card-inner {
  transform: rotateY(180deg);
}

/* Position the front and back side */
.flip-card-front, .flip-card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden; /* Safari */
  backface-visibility: hidden;
  
  font-weight: bold;
}

/* Style the front side (fallback if image is missing) */
.flip-card-front {
  padding: 2px;
  

    background-color: var(--color-main);
    color: white;

    margin-right: 5px;
    width: 2em;
    height: 2em;
    border: 1px solid var(--color-main);
    border-radius: 10px;
    min-width: 1em;
    min-height: 1em;
    display: block;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    filter: drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.55));
}

/* Style the back side */
.flip-card-back {
    padding: 2px;
    background-color: white;
    color: var(--color-main);
    margin-right: 5px;
    width: 2em;
    height: 2em;
    border: 1px solid var(--color-main);
    border-radius: 10px;
    min-width: 1em;
    min-height: 1em;
    display: block;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    filter: drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.55));
  transform: rotateY(180deg);
}

</style>