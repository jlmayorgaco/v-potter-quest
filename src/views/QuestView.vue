<template>
  <div class="quest">

    <!-- <intro-tutorial></intro-tutorial> -->
    <intro-tutorial v-if="step == 0"></intro-tutorial>
    <quests-tutorial v-if="step == 1"></quests-tutorial>

  </div>
</template>
<script>
import { defineComponent } from '@vue/composition-api'
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import IntroTutorial from '../components/Tutorials/Intro.tutorial.vue'
import QuestsTutorial from '../components/Tutorials/Quests.tutorial.vue'

export default defineComponent({
  components: {
    IntroTutorial,
    QuestsTutorial
  },
  setup() {

    const step = ref(0)
    const route = useRoute()

    onMounted(() => {
      step.value = route.params.id;
    })

    watch(() => route.params, () => {
      step.value = route.params.id;
    });

    return { step, route }
  }
})
</script>
