<template>
  <footer>
    <ul>
      <li>
        <router-link to="/">
          <div class="">
          <i class="fa fa-solid fa-house"></i>
        </div></router-link>
      </li>
      <li>
        <router-link to="/map"><i class="fa fa-solid fa-map"></i></router-link>
      </li>
      <li>
        <router-link :to="'/quest/' + currentId"><i class="fa fa-regular fa-circle-play"></i></router-link>
      </li>
      <li>
        <router-link to="/vr"><i class="fa fa-solid fa-camera"></i></router-link>
      </li>
      <li>
        <router-link to="/about">
          <i class="fa fa-solid fa-suitcase"></i>
        </router-link>
      </li>
    </ul>
  </footer>
</template>

<script setup lang="ts">
// TypeScript enabled
import { useGameStore } from '@/stores/game';
const store = useGameStore();
const currentId = store.getNow

</script>


<style lang="scss">
@import '../styles/sizes';

footer {
  position: fixed;
  bottom: 0px;
  left: 0px;
  width: 100%;
  height: $size-footer-h;
  background-color: white;
  ul {
  width: 100%;
  height: $size-footer-h;
  display: -webkit-flex;
  display: flex;
  -webkit-flex-direction: row;
  flex-direction: row;
  -webkit-flex-wrap: nowrap;
  flex-wrap: nowrap;
  -webkit-justify-content: space-around;
  justify-content: space-around;
  -webkit-align-content: center;
  align-content: center;
  -webkit-align-items: center;
  align-items: center;


  max-width: $size-max-w !important;
  max-height: $size-max-h !important;
  margin: 0 auto !important;

}
li:nth-child(3) a{
  font-size: 40px;
  i{
      position: relative;
      top: 3.45px
    }
}
  li a{
    font-size: 20px;
    color: #e5e5e5 !important;
    width: 50px;
    height: 50px;
    display: block;
    border-radius: 100%;
    i{
      position: relative;
      top: 13px
    }
  }
  .router-link-active{
    color: var( --color-main) !important;
}
}

</style>