<template>
    <div class="quest quest--card quest__multiple">
        <quest-card-template :title="quest.title" :enabled="isValidOk" :error="quest.error" :info="quest.info"
            :actions="quest.actions" @onNext="doHandleNext()" @onBack="doHandleBack()">
            <template #container>
                <div class="q_multiple__container">
                    <ul>
                        <li :class="{
                            isSelected: selected === option
                        }" v-for="option in quest.config.options" :key="option">
                            <button @click="onButtonClick(option)">
                                {{ option }}
                            </button>
                        </li>
                    </ul>
                </div>
            </template>
        </quest-card-template>
    </div>
</template>
<script>
import { defineComponent } from '@vue/composition-api'
import QuestCardTemplate from './_quest.card.vue';
import { ref, computed, reactive, onMounted, toRaw } from 'vue'

export default defineComponent({
    components: {
        QuestCardTemplate
    },
    props: {
        quest: Object
    },
    setup(props) {


        const isValidOk = ref(false);
        const selected = ref('');

        const onButtonClick = (btn) => {
            selected.value = btn;
            isValidOk.value = (btn === props.quest.answer)
            if (isValidOk.value) {
                selected.value = btn;
            }
            else {
                setTimeout(() => {
                    selected.value = '';
                }, 500)
            }
        }

        function doHandleNext() {
            this.$emit('onNext')
        }

        function doHandleBack() {
            this.$emit('onBack')
        }


        return { selected, isValidOk, onButtonClick, doHandleNext, doHandleBack }
    }
})
</script>
<style lang="scss" scoped>
.q_multiple__container {
    ul {

        display: block;
        width: 100%;
        padding: 1em;

        li {
            display: block;
            background-color: white;
            border: 1px solid var(--color-main);
            border-radius: 10px;
            margin-bottom: 0.5em;

            button {
                padding: 0.5em;
                background: none;
                outline: none;
                border: none;
                color: var(--color-main);

                font-size: 16px;
                letter-spacing: 1px;
                text-align: center;
                height: 54px;
                overflow: hidden;
            }


            &.isSelected {
                background-color: var(--color-main);
                border: 1px solid var(--color-main);

                transition-property: all;
                transition-duration: 0.5s;
                transition-timing-function: linear;
                transition-delay: 0s;

                button {
                    color: white;

                transition-property: all;
                transition-duration: 0.5s;
                transition-timing-function: linear;
                transition-delay: 0s;
                }
            }
        }
    }
}
</style>