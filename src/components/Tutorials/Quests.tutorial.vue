<template>
  <swiper-container v-if="quests" allowTouchMove="true">
    <swiper-slide v-for="quest of quests" :key="quest.id">
      <q-text :quest="quest" v-if="quest.type == QuestType.QText" @onNext="onNext()" @onBack="onBack()"></q-text>
      <q-multiple :quest="quest" v-if="quest.type == QuestType.QMultiple" @onNext="onNext()"
        @onBack="onBack()"></q-multiple>
      <q-geo :quest="quest" v-if="quest.type == QuestType.QGeo" @onNext="onNext()"
        @onBack="onBack()"></q-geo>
      <q-wand :quest="quest" v-if="quest.type == QuestType.QWand" @onNext="onNext()"
        @onBack="onBack()"></q-wand>
    </swiper-slide>
  </swiper-container>
</template>
<script lang="ts">
import { onMounted, ref } from 'vue'
import { IQuest, IQGeo, IQMultiple, IQuestText, IQWand, QuestType } from '@/models/IQuest.model'

import QText from '@/components/Quests/QText.quest.vue'
import QMultiple from '@/components/Quests/QMultiple.quest.vue'
import QGeo from '@/components/Quests/QGeo.quest.vue'
import QWand from '@/components/Quests/QWand.quest.vue'

export default {
  name: 'QuestsTutorial',
  components: {
    QText,
    QMultiple,
    QGeo,
    QWand
  }
}
</script>
<script setup lang="ts">
const response = ref('');
const swiperEl = ref<Element | null>(null);

const q0: IQuestText = {
  id: 0,
  title: 'Who is in the portrait?',
  type: QuestType.QText,
  info: {
    description: 'In the heart of Wizengamot, I was him support. At a couple s wedding, I stood by his side. An old, loyal friend, one of a kind, in the world of magic, who am I, you ll find?',
    image: '/img/ai_pictures/t1_p4.jpeg/',
  },
  config: {},
  answer: 'Elphias Doge',
  validator: (value: string): boolean => {
    return value == q0.answer;
  }
};

const q1: IQMultiple = {
  id: 1,
  title: 'Whats this book about?',
  type: QuestType.QMultiple,
  info: {
    description: 'Under the portrait, a weathered manual, its title illegible but marked by the name "Wildsmith." What secrets lie within its pages?',
    image: '/img/ai_pictures/t1_p6.jpg/',
  },
  config: {
    options: [
      "Advance Handbook of Floo's Powder",
      "One Thousand Magical Herbs and Fungi",
      "Asiatic Handbook Anti-Venoms Manual",
      "Magical Water Plants of the Mediterranean",
    ]
  },
  get answer() {
    return this.config.options[0]
  },
  validator: (value: string): boolean => {
    return value == q0.answer;
  }
};

const q2: IQGeo = {
  id: 2,
  title: 'Whats this book about?',
  type: QuestType.QGeo,
  info: {
    description: 'Within Wildsmiths book, a map unfolds, hand-drawn with tales untold. Trace the dance on the chessboards floor, where water ascends, enchantments galore. ',
    image: '/img/ai_pictures/t1_p7.jpeg/',
  },
  config: {
    tolerance: {
      lat: 0.000005,
      lng: 0.000005
    },
    position: {
      lat: 4.693918,
      lng:  -74.033357, 
    }
  },
  get answer() {
    return this.config.position
  },
  validator: (value: string): boolean => {
    return value == q0.answer;
  }
};

const q3: IQWand = {
  id: 3,
  title: 'Wingardium Leviosa',
  type: QuestType.QWand,
  info: {
    description: 'Within Wildsmiths book, a map unfolds, hand-drawn with tales untold. Trace the dance on the chessboards floor, where water ascends, enchantments galore. ',
    image: '/img/ai_pictures/t1_p7.jpeg/',
  },
  config: {
   
  },
  error:{

  },
  actions: [],
  get answer() {
    return this.config.options[0]
  },
  validator: (value: string): boolean => {
    return value == q0.answer;
  }
};

const quests = ref([
  q0, q1, q2, q3
])

onMounted(() => {
  swiperEl.value = document.querySelector('swiper-container');
})

function onNext() {
  const swiper = (swiperEl.value as any).swiper;
  swiper.slideNext();
}

function onBack() {
  const swiper = (swiperEl.value as any).swiper;
  swiper.slidePrev();
}
</script>
<style lang="scss">
.swiper-slide {
  height: auto;
}
</style>