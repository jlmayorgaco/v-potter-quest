<template>
  <div class="theme" :class="themeStore.theme__class">
    <nav v-if="false">
      <router-link to="/">Home</router-link> | <router-link to="/about">About</router-link> |
      <router-link to="/start">Getting Started</router-link>|
      <router-link to="/map">Map</router-link>|
      <router-link to="/quest/:id">Quest :id</router-link>|
      <router-link to="/error">error</router-link>|
      <router-link to="/success">Success</router-link>
    </nav>
    <router-view v-slot="{ Component }">
      <transition name="scale" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
    <footer-component :class="themeStore.theme__class"></footer-component>
    <splash-component v-if="themeStore.splash"></splash-component>
  </div>
</template>
<script lang="ts">
import { ref } from 'vue'
import { useThemeStore } from './stores/theme'
import FooterComponent from './components/footer.vue'
import SplashComponent from './components/splash.vue'

export default {
  components: {
    SplashComponent,
    FooterComponent
  },
  setup() {
    const themeStore = useThemeStore()

    return {
      themeStore
    }
  }
}
</script>
<style lang="scss">
  @import './styles/index';
</style>
