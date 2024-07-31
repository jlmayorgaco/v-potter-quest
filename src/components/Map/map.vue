<template>
  <div class="progress_map">

    <slot name="background"></slot>

    <slot name="container"></slot>


    <br /><br /><br /><br /><br /><br />
  </div>
</template>
<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import { useThemeStore } from '../../stores/theme'
import { svgPath, bezierCommand } from '../../helpers/svg_path.generator'

@Options({
  props: {
    steps: Array,
  }
})
export default class MapComponent extends Vue {
  public msg!: string
  public steps!: any[]

  public theme = useThemeStore()

  setHouse(houseName: string) {
    this.theme.setHouse(houseName)
  }

  doContinue() {
    this.theme.setSplash(false)
  }

  public step_h = 120

  mounted(): void {
    //Init Layouts
    //this.doUpdatePathsSVG()
    //this.doDrawSVG()

    setTimeout(() => {
      //this.doUpdatePathsSVG()
    }, 500)
  }

  doDrawSVG() {
    const points = []
    for (let k = 0; k < this.steps.length; k++) {
      const step = this.steps[k]
      const button1Id = `button-${step.id}`
      var btn1: HTMLElement = document.getElementById(button1Id) as HTMLElement
      var rect1 = btn1.getBoundingClientRect()
      if (btn1) {
        var x1 = btn1.offsetLeft + rect1.width / 2
        var y1 = btn1.offsetTop + rect1.height / 2
        points.push([Math.round(x1), Math.round(y1)])
      }
    }

    const elemPathsContainer: any = document.getElementById('svg_steps__path')
    const d = svgPath(points, bezierCommand)
    elemPathsContainer.setAttribute('d', d)
  }
  doUpdatePathsSVG() {
    const map = (document.querySelector('.buttons') as any).getBoundingClientRect()
    const svg = document.getElementById('svg_map_lines')
    const background = document.getElementById('progress_map__background')

    const mapW = map.width
    const mapH = map.height

    if (svg) {
      svg.style.width = mapW + 'px'
      svg.style.height = mapH + 'px'
    }

    if (background) {
      background.style.width = 'calc(100% - 2em)'
      background.style.height = mapH + 'px'
    }
  }
}
</script>
<style  lang="scss">
//@import '../../styles/index';
</style>