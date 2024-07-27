<template>
  <div class="quest quest--card quest__wand">
    <quest-card-template :title="quest.title" :enabled="isValidOk" :error="quest.error" :info="quest.info"
      :actions="quest.actions" @onNext="doHandleNext()" @onBack="doHandleBack()">
      <template #container>
        <div class="q_wand__container">
          <!-- Contenedor para el canvas -->
          <canvas ref="canvas" @touchstart="startDrawing" @touchmove="draw" @touchend="endDrawing"></canvas>
          <button @click="checkAnswer">Verificar Respuesta</button>
        </div>
      </template>
    </quest-card-template>
  </div>
</template>
<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import QuestCardTemplate from './_quest.card.vue';
import { IQWand } from '@/models/IQuest.model';
export default defineComponent({
  components: {
    QuestCardTemplate
  },
})
</script>

<script setup lang="ts">
import { ref, Ref, computed, reactive, onMounted, toRaw, watch, defineProps, defineEmits } from 'vue'

const props = defineProps<{ quest: IQWand }>();
const emit = defineEmits(['onNext', 'onBack']);


function doHandleNext() {
  emit('onNext')
}

function doHandleBack() {
  emit('onBack')
}

const canvasElement: Ref<HTMLCanvasElement | undefined> = ref();
const context: Ref<CanvasRenderingContext2D | undefined> = ref();

const isValidOk = ref<boolean>(false);
const drawing = ref(false);
const lastX = ref(0);
const lastY = ref(0);
const userDrawing = ref<any[]>([]);

onMounted(() => {
    // Configurar el contexto del canvas
   context.value = canvasElement.value?.getContext('2d') || undefined;
   if(context.value){
    context.value.lineWidth = 3;
    context.value.lineCap = 'round';
   }

})

const startDrawing = (e) => {
  drawing.value = true;
  lastX.value = e.touches[0].clientX;
  lastY.value = e.touches[0].clientY;
  userDrawing.value = []; // Limpiar el dibujo del usuario al comenzar
};

const draw = (e) => {
  if (!drawing.value) return;

  const x = e.touches[0].clientX;
  const y = e.touches[0].clientY;

  // Dibujar una línea
  if(context.value){
  context.value.beginPath();
  context.value.moveTo(lastX.value, lastY.value);
  context.value.lineTo(x, y);
  context.value.stroke();
  }

  // Almacenar las coordenadas del dibujo del usuario
  userDrawing.value.push({ x, y });

  lastX.value = x;
  lastY.value = y;
};

const endDrawing = () => {
  drawing.value = false;
};

const checkAnswer = () => {
  // Implementa la lógica de verificación aquí
  const isCorrect = isDrawingCorrect();
  console.log(isCorrect ? '¡Correcto!' : 'Incorrecto :(');
};

const isDrawingCorrect = () => {
  // Implementa la lógica para verificar si el dibujo del usuario es correcto.
  // Puedes comparar las coordenadas almacenadas en userDrawing con las de una forma esperada.
  // Calcula el error y compáralo con una tolerancia.

  // Ejemplo simple: ver si la longitud del dibujo es mayor a un umbral.
  return userDrawing.value.length > 10;
};



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