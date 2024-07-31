<template>
  <button
    :id="getButtonId(id)"
    :class="{ hidden: !enable }"
    :style="{
      top: '0px',
      left: getButtonLeft(id)
    }"
    :disabled="!enable"
    @click="onClick(id)"
  >
  <div class="button__container">
    STEP {{ id }}
  </div>

  </button>
</template>
  <script lang="ts">
import { Options, Vue } from 'vue-class-component'

@Options({
  props: {
    id: Number,
    enable: Boolean
  }
})
export default class MapStepComponent extends Vue {
  id!: number
  enable!: true

  onClick(id: number) {
    this.$emit('onClick', id)
  }

  getButtonId(id: number) {
    return `button-${id}`
  }

  getButtonTop(id: number) {
    if (id === 0) return '30px'
    return 100 * id + 0 * (Math.random() - Math.random()) + 'px'
  }
  getButtonLeft(id: number) {
    const options = ['30px', 'calc(50% - 40px)', 'calc(100% - 80px - 30px)']
    if (id % 2 !== 0) {
      return options[1]
    } else {
      if (id % 4 === 0) return options[0]
      return options[2]
    }
  }
}
</script>
<style scoped lang="scss">
//@import '../styles/index';
    svg * {
      transform-box: fill-box;
    }

    .node {
      cursor: pointer;
    }

    .node .back {
      fill: transparent;
      stroke: black;
      stroke-width: 8;
    }

    .node .front {
      fill: lightblue;
      stroke: black;
      stroke-width: 4;
    }

    .node:hover:not(.selected) .front {
      stroke: white;
      stroke-width: 3;
    }

    .node.selected .back {
      display: none;
    }
</style>