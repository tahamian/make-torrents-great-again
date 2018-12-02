<template>
  <div>
    Enter Magnet Link
    <input name="enter magnet link" />
    {{fonts}}
    <button v-on:click="getfonts">H</button>
    <button v-on:click="changefonts"> Change Font </button>
  </div>
</template>

<script>
import fontList from 'font-list'
  export default {
    data () {
      return {
        fonts: 'fontManager.getAvailableFontsSync()'
      }
    },
    methods: {
      getfonts () {
        fontList.getFonts()
  .then(fonts => {
    console.log(fonts)
  })
  .catch(err => {
    console.log(err)
  })
      },
      changefonts () {
        Helvetica
        document.html
      }
    }
  }
</script>
<style scoped>
  
</style>
