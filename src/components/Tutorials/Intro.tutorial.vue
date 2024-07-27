<template>
  <swiper-container v-if="slides">
    <swiper-slide v-for="slide of slides" :key="slide.id">
      <basic-card v-if="slide.type == CardType.BASIC" :picture="slide.picture"
        :parragraphs="slide.parragraphs"></basic-card>
      <button-card v-if="slide.type == CardType.ACTION" 
      :picture="slide.picture" 
      :parragraphs="slide.parragraphs"
        :actions="slide.actions" @onAction="doHandleAction(slide.id, $event)">
      </button-card>
    </swiper-slide>
  </swiper-container>
</template>
<script lang="ts">
// Cakewalk
import { ref } from 'vue'

import { CardType } from '@/models/ICard.model';

import BasicCard from '@/components/basic.card.vue'
import ButtonCard from '@/components/button.card.vue'

import { useThemeStore } from '@/stores/theme';
import { useGameStore } from '@/stores/game';

export default {
  name: 'IntroTutorial',
  components: {
    BasicCard,
    ButtonCard
  }
}
</script>
<script setup lang="ts">
import { useRouter } from 'vue-router';
const router = useRouter()
const store = useGameStore();

const slides = ref([
  {
    id: 0,
    type: CardType.BASIC,
    picture: '/img/ai_pictures/t1_p0.png',
    parragraphs: [
      'A few years later after the Hogwarts Battle incident, an eerie shroud of mystery and foreboding settled upon the venerable grounds of Hogwarts School of Witchcraft and Wizardry.',
      'Within the enigmatic depths of the Forbidden Forest, custodians and enchanted creatures alike made a disquieting discovery: a group of Hippogriffs, noble and proud, stood grievously wounded.'
    ]
  },
  {
    id: 1,
    type: CardType.BASIC,
    picture: '/img/ai_pictures/t1_p1.png',
    parragraphs: [
      'But the most disheartening sight was the lifeless form of one, cruelly stripped of its talons, those magnificent symbols of strength and grace.',
      'Within the castles hallowed halls, whispers of unease rippled through the student body, and even the most steadfast among the staff couldnt deny the unsettling aura that had descended upon the school.'
    ]
  },
  {
    id: 2,
    type: CardType.ACTION,
    picture: '/img/ai_pictures/t1_p3.jpeg',
    parragraphs: [
      'Now its time to start your adventure.'
    ],
    actions: [{
      id: 0,
      label: 'Go To Home',
      color: '',
      action: () => { 
        router.push({ path: '/'})
      }
    },
    {
      id: 1,
      label: 'Next Quest',
      color: '',
      action: () => { 
        store.goToStep(1)
        router.push({ path: '/quest/1'})
      }
    }
    ]
  }
])


function doHandleAction(slideId: number, actionId: number) {
  const slide = slides.value[slideId].actions;
  const action = slide ? slide[actionId] : null;
  action?.action();
}

</script>
<style lang="scss">
.swiper-slide {
  height: auto;
}
</style>