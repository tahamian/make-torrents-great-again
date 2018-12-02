<template>
  <div>
    Enter Magnet Link
    <input name="enter magnet link" />
    </div>
</template>

<script>
// import fontList from 'font-list'
  export default {
    data () {
      return {
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
