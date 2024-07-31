<template>
  <div class="card basic_card">
    <div class="card__picture">
      <img :src="picture" />
    </div>
    <div class="card__text">
      <p v-for="parragraph of parragraphs" v-bind:key="parragraph">
        {{ parragraph }}
      </p>
    </div>
  </div>
  <br>
  <br>
</template>
<script>
export default {
  name: 'BasicCard',
  components: {},
  props: ['picture', 'parragraphs']
}
</script>
<style lang="scss">

</style>