<template>
  <div class="quest quest--card quest__text">
    <quest-card-template :title="quest.title" :enabled="isValidOk" :error="quest.error" :info="quest.info"
      :actions="quest.actions" @onNext="doHandleNext()" @onBack="doHandleBack()">
      <template #container>
        <div class="q_text__container">
          <div class="q_text__words">
            <div class="q_text__word" v-for="word in buttons" :key="word">
              <button-flip 
                  :isOpen="word.typed.toUpperCase() === word.answer.toUpperCase()" 
                  :message="word.typed.toUpperCase()">
              </button-flip>
            </div>
          </div>
          <div class="q_text__keyboard">
            <div class="q_text__keychar" v-for="btn in chars" :key="btn">
              <button @click="onCharClick(btn)">
                {{ btn }}
              </button>
            </div>
          </div>
        </div>
      </template>
    </quest-card-template>
  </div>
</template>
<script>
import { defineComponent } from '@vue/composition-api'
import { ref, computed, reactive, onMounted, toRaw } from 'vue';

import ButtonFlip from '../button.flip.vue';
import QuestCardTemplate from './_quest.card.vue';


const doGenRandomString = (nCharacteres) => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  return characters
    .split('')
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value)
    .slice(0, nCharacteres);
}
export default defineComponent({
  components: {
    QuestCardTemplate,
    ButtonFlip
  },
  props: {
    quest: Object
  },
  setup(props) {

    const letters = ref(props.quest.answer.split(''));
    const nLetters = letters.value.length;

    const buttons = ref(
      letters.value.map(item => {
        return {
          typed: 'X',
          answer: item,
          isCursor: false
        }
      })
    );

    buttons.value[0].isCursor = true;

    const chars = computed(() =>
      [
        ...letters.value.map(item => item.toUpperCase()),
        ...doGenRandomString(Math.max(0, 17 - nLetters))
      ]
      .map((a) => ({ sort: Math.random(), value: a }))
      .sort((a, b) => a.sort - b.sort)
      .map((a) => a.value)
    );

    const isValidOk = computed(() =>
      buttons.value
        .map(button =>
          button.typed.toUpperCase() === button.answer.toUpperCase()
        ).every(element => element === true)
    )

    const onCharClick = (btn) => {
      buttons.value.forEach((char, index) => {
        if (char.answer == btn || char.answer.toUpperCase() == btn.toUpperCase()) {
          char.typed = btn;
        }
      });
    }

    function doHandleNext() {
      this.$emit('onNext')
    }
    function doHandleBack() {
      this.$emit('onBack')
    }


    return { buttons, chars, isValidOk, onCharClick, doHandleNext, doHandleBack }
  }
})
</script>
<style lang="scss" scoped>
.q_text__container {
  input {
    padding: 1em;
    margin: 1em;
    outline: none;
    border: none;
    border-bottom: 1px dashed black;
    font-size: 14px;
    letter-spacing: 1px;
  }
}

.q_text__words {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  align-items: center;
  justify-content: center;

  margin-bottom: 10px;

  width: 100%;
  padding: 1em;
  padding-top: 2em;

}

.q_text__word {
  display: flex;
  flex-direction: row;

  align-items: center;
  justify-content: center;

  margin-bottom: 10px;

}

.q_text__word label {

  padding: 2px;

  background-color: white;
  color: var(--color-main);

  margin-right: 5px;

  width: 2em;
  height: 2em;
  border: 1px solid var(--color-main);
  border-radius: 10px;

  min-width: 1em;
  min-height: 1em;

  display: block;
  position: relative;

  display: flex;
  flex-direction: row;

  align-items: center;
  justify-content: center;

  filter: drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.55));

}


.q_text__keyboard {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-content: center;
  align-items: center;
  justify-items: center;

  width: 100%;
  padding: 1em;
  padding-top: 0em;

  margin-top: 0em;
}

.q_text__keychar {
  margin-right: 5px;
  margin-bottom: 5px;
}

.q_text__keychar button {
  background-color: var(--color-main);
  color: white;

  border: 0px solid white;
  outline: none;

  padding: 2px;

  width: 38px;
  height: 38px;
  font-size: 20px;

  border: 1px solid var(--color-main);
  border-radius: 10px;

  min-width: 1em;
  min-height: 1em;
}
</style>