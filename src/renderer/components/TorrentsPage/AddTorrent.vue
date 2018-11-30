<template>
  <div id="upload">
    <h4>Add Torrent File:</h4>
    <div class="dropbox">
       <input type="file" id="file" ref="file" class="input-file" v-on:change="handleFileUpload()">
       <p>Drag your files here or click to browse</p>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        file: '',
        stInital: 0,
        stSaving: 1,
        stSucess: 2,
        stFailed: 3,
        currentStatus: null
      }
    },
    computed: {
      isInitial () {
        return this.currentStatus === this.stInital
      },
      isSaving () {
        return this.currentStatus === this.stSaving
      }
    },
    methods: {
      handleFileUpload () {
        console.log('CHANGE')
        this.file = this.$refs.file.files[0]
        console.log(this.file)
      }
    }
  }
</script>
<style scoped>
  .dropbox {
    outline: 2px dashed grey; 
    outline-offset: -10px;
    background: lightcyan;
    color: dimgray;
    padding: 10px 10px;
    min-height: 200px; 
    position: relative;
    cursor: pointer;
  }
  .input-file {
    opacity: 0;
    height: 100%;
    width: 100%;
    display: table-cell;
    position: absolute;
    cursor: pointer;
  }
  .dropbox p {
    font-size: 1.2em;
    text-align: center;
    padding: 50px 0;
  }
  .dropbox:hover {
    background: lightblue; /* when mouse over to the drop zone, change color */
  }
</style>
