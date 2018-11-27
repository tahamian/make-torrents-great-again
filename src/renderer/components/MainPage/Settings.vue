<template>
  <div>
    <b-btn v-b-modal.modal-center>Launch centered modal</b-btn>
    <b-modal id="modal-center" centered title="Bootstrap-Vue">
    <p class="my-4">Vertically centered modal!</p>
  </b-modal>
  </div>
</template>

<script>
  export default {
    data () {
      return {}
    }
  }
</script>
<style scoped>
</style>
