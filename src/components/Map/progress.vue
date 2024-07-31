<template>
  <svg id="svg_progress_map" :width="w + 'px'" :height="h + 'px'">

    <svg class="svg_map__paths" v-if="d" x="42" y="42">
      <path id="svg_steps__path" :d="d" stroke="black" stroke-width="5" stroke-linecap="round" stroke-dasharray="12"
        fill="transparent"></path>
    </svg>

    <hex-badget-component v-for="step in steps" v-bind:key="step.id" 
      @onClick="onClick"
      :step="step" 
      :x="getStepX(step)"
      :y="getStepY(step)">
    </hex-badget-component>

  </svg>
</template>
<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import { useThemeStore } from '../../stores/theme'
import { svgPath, bezierCommand } from '../../helpers/svg_path.generator'
import { getHexagonPathData } from '../../helpers/getHexGenerator'

import HexBadgetComponent from './hex-badget.vue';
import { IStep } from '@/models/IStep.model.js';


@Options({
  components: {
    HexBadgetComponent
  },
  props: {
    steps: Array,
    w: Number,
    h: Number
  }
})
export default class MapComponent extends Vue {
  public d = '';

  public w!: number
  public h!: number
  public msg!: string
  public steps!: any[]

  public theme = useThemeStore()

  onClick($step: IStep){
    this.$router.push('/quest/'+$step.id)
  }

  setHouse(houseName: string) {
    this.theme.setHouse(houseName)
  }

  doContinue() {
    this.theme.setSplash(false)
  }

  public step_h = 120

  mounted(): void {
    const points = this.steps.map((step: IStep) => ([step.pos.x, step.pos.y]))
    const d = svgPath(points, bezierCommand)
    this.d = d
  }

  getStepX(step: IStep) {
    return step.pos.x + 'px'
  }

  getStepY(step: IStep) {
    return step.pos.y + 'px'
  }
}
</script>
<style scoped lang="scss">
#svg_progress_map {
  display: block;
  position: relative;
  margin: 0 auto;
 //background-image: url("https://www.transparenttextures.com/patterns/clean-gray-paper.png");
}

#svg_grid_map {
  display: block;
  position: absolute;
  top: 0px;
  left: 0px;
}

//@import '../../styles/index';
</style>