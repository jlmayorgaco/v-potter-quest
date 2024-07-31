<template>
    <div class="card button_card">
      <div class="card__picture">
        <img :src="picture" />
      </div>
      <div class="card__text">
        <p v-for="parragraph of parragraphs" v-bind:key="parragraph">
          {{ parragraph }}
        </p>
        <div class="buttons">
            <button v-for="button in actions" :key="button.id"
                @click="$emit('onAction', button.id)"
            >
            {{ button.label  }}
            </button>
        </div>
      </div>
    </div>
    <br>
    <br>
  </template>
  <script>
  export default {
    name: 'ButtonCard',
    components: {},
    props: ['picture', 'parragraphs', 'actions'],
    data () {
      return {}
    }
  }
  </script>
  <style scoped lang="scss">
  .swiper-slide {
    height: auto;
  }
  </style>