<template>
    <div class="quest quest__text"></div>
  </template>
    <script>
  import { defineComponent } from '@vue/composition-api'
  import { ref, onMounted } from 'vue'
  //import IntroTutorial from '../components/Tutorials/Intro.tutorial.vue'
  export default defineComponent({
    components: {
      //IntroTutorial
    },
    setup() {
      const step = ref(0)
  
      onMounted(() => {
        console.log('Holi')
      })
  
      return { step }
    }
  })
  </script>
    