<template>
  <svg class="svg_map__button" :x="x" :y="y" v-if="step" v-on:click="onClick()">
    <defs>
      <pattern :id="'def_bg_' + step.id" patternUnits="userSpaceOnUse" width="100" height="100">
        <image style="filter: grayscale(0.20);" :x="step.image.offset.x" :y="step.image.offset.y"
          :width="step.image.offset.w" :height="step.image.offset.h" :href="step.image.url" />
      </pattern>
      <filter id="grayscale">
        <feColorMatrix type="matrix"
          values="0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0 0 0 1 0" />
      </filter>
    </defs> <svg class="hex__button" v-if="d" x="17" y="0">
      <path :class="{ 'svg__active': step.enabled }" stroke="#bd7c4f" stroke-width="5" fill="#fff6ed" :d="d"></path>
      <path :class="{ 'svg__active': step.enabled }" stroke="#bd7c4f" stroke-width="5" :fill="getImage()" :d="d"
        :filter="getFilter()" animation="transition: margin-right 4s ease-in-out 1s;"></path>
    </svg> <svg class="hex__label" height="35" width="125" x="0" y="80">
      <g>
        <rect transform="translate(0,0) scale(1 1)" height="35" width="125" stroke="#bd7c4f" rx="15" stroke-width="0"
          fill="#bd7c4f" x="0" y="0" :filter="getFilter()" /> <text font-weight="bold" color="white" stroke="white"
          x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="Arial, sans-serif" font-size="18"
          stroke-width="0" fill="white" letter-spacing="2px">{{ getText() }}</text>
      </g>
    </svg>
  </svg>
</template>
<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import { IStep } from '../../models/IStep.model';
import { getHexagonPathData } from '../../helpers/getHexGenerator';

@Options({
  props: {
    x: String,
    y: String,
    step: Object
  }
})
export default class HexBadgetComponent extends Vue {

  public d = '';
  public x!: string;
  public y!: string;

  public step!: IStep;

  mounted(): void {
    this.d = getHexagonPathData()
  }

  onClick() {
    if (this.step.enabled) {
      this.$emit('onClick', this.step)
    }
  }

  getImage(): string {
    if (this.step.enabled) {
      return 'url(#def_bg_' + this.step.id + ')';
    }
    return '#3ff';

  }

  getFilter(): string {
    if (this.step.enabled) {
      return '';
    }
    return 'url(#grayscale)';
  }

  getText(): string {
    if (this.step.enabled) {
      return this.step.text;
    }
    return 'blocked';
  }


  // https://images.ctfassets.net/usf1vwtuqyxm/6mWwi4BAAMAWEcKCkuC2Wm/9cdcc766c7cf1d183334bb34e496dba0/Harry_Potter.png?w=914&q=70&fm=webp
}
</script>
<style scoped lang="scss">
//@import '../../styles/index';
.hex__button,
.hex__label {
  filter: drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.25));
}

.button__disabled .hex__button {
  filter: grayscale(0.20);
}

/* Spin south Animation */
@keyframes spinSouth {
  0% {
    transform: rotate(4deg);
  }

  100% {
    transform: rotate(2deg);
  }
}

/* Wiggle Animation */
@keyframes wiggleSouth {
  0% {
    transform: rotate(2deg);
  }

  50% {
    transform: rotate(-2deg);
  }

  100% {
    transform: rotate(2deg);
  }
}

.hex__button path.svg__active {
  transform-origin: 5% 5%;
  animation-name: wiggleSouth;
  animation-delay: 0s, 1s;
  animation-duration: 1s, 1s;
  animation-iteration-count: 10, 10;
  animation-fill-mode: forwards;
}</style>