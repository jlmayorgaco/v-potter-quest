<template>
  <main class="view view__home">
    <!-- <intro-tutorial></intro-tutorial> -->
    <div class="map progress_map">
     
      <map-background-component :w="w" :h="h"></map-background-component>
      
      <map-progress-component :steps="steps" :w="w" :h="h"></map-progress-component>
   
    </div>
  </main>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'

import HelloWorld from '@/components/HelloWorld.vue' // @ is an alias to /src
import IntroTutorial from '@/components/Tutorials/Intro.tutorial.vue'
import MapComponent from '@/components/Map/map.vue'
import MapStepComponent from '@/components/Map/step.vue'
import MapProgressComponent from '@/components/Map/progress.vue'
import MapBackgroundComponent from '@/components/Map/bg.vue'

import { svgPath, bezierCommand } from '../helpers/svg_path.generator'
import { IStep } from '@/models/IStep.model'
import { GAME } from '@/config/GAME';
import { useGameStore } from '@/stores/game'

@Options({
  components: {
    HelloWorld,
    IntroTutorial,
    MapComponent,
    MapStepComponent,
    MapProgressComponent,
    MapBackgroundComponent
  }
})
export default class HomeView extends Vue {
  public w = 0
  public h = 0

  public store = useGameStore();

  public get steps(): Array<IStep> {
    return this.store.game.steps
  }

  public mounted() {
    this.w = 0.9 * 360;
    this.h = 2500;
  }

  goToStep(id: number) {
    this.$router.push(`/quest/${id}`)
  }
}
</script>
