<template>
  <div class="quest card quest__text">
    <div class="top">
      <div class="quest__title">{{ title }}</div>
      <div class="quest__info">
        <div class="info__only_text" v-if="!info.image && info.description">
          <p>{{ info.description }}</p>
        </div>
        <div class="info__only_image" v-if="info.image && !info.description">
          <img :src="info.image">
        </div>
        <div class="info__both_text_image" v-if="info.image && info.description">

          <!-- Card Info :: Both Image and Text, Flip -->
            <div class="card__info">
              <div class="card__inner">
                <div class="card__front">
                  <img :src="info.image" width="100%">
                </div>
                <div class="card__back">
                  <p>{{ info.description }}</p>
                </div>
              </div>
            </div>
            <!-- .Card Info :: Both Image and Text, Flip -->

      </div>


      </div>
      <div class="quest__container">
          <slot name='container'></slot>
        </div>
    </div>
    <div class="bottom">
        <div class="quest__actions">
          <button @click="$emit('onBack')">
            Go Back
          </button>
          <button @click="$emit('onNext')" 
          :disabled="!enabled"
          :class="{
            'enabled': enabled,
            'disabled': !enabled
          }">
            Next Quest
          </button>
        </div>
      </div>
  </div>
</template>
<script>
import { defineComponent } from '@vue/composition-api'
import { ref, onMounted } from 'vue'
export default defineComponent({
  props: {
    title: String,
    info: Object,
    enabled: Boolean,
    actions: Array,
  },
  components: {
    //IntroTutorial
  },
  setup() {
    const step = ref(0)


    return { step }
  }
})
</script>
  