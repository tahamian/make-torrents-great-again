<template>
  <div>
  <div id="upload" style="padding:50px">
    <h4>Upload Files:</h4>
    <div class="dropbox">
       <input type="file" multiple id="file" ref="file" class="input-file" v-on:change="handleFileUpload()">
       <p>Drag your files here or click to browse</p>
    </div>
  </div>
  <div id="table">
    
    
    
    
  
  
  </div>
  <div id="createTorrent">
    <button v-on:click="createTorrentFile()">Create Torrent</button>
  </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        obj: [],
        store: [],
        write: []
      }
    },
    methods: {
      parse () {
        var input = this.$refs.file.files
        console.log(input)
        for (var i = 0; i < input.length; i++) {
          this.obj.push({'name': input[i].name, 'path': input[i].path, 'category': this.checkFileType(input[i])})
        }
        console.log(this.obj)
      },
      checkFileType (file) {
        if (file.type.includes('image/')) {
          return 'other'
        } else if (file.type.includes('audio/')) {
          return 'music'
        } else if (file.type.includes('video/')) {
          if (file.size < 4000000000) {
            return 'tv'
          } else {
            return 'movie'
          }
        } else if (file.type.includes('application/pdf') || file.type.includes('application/txt') || file.type.includes('application/docx')) {
          return 'book'
        } else if (file.type.includes('application/')) {
          return 'app'
        } else {
          return 'other'
        }
      },
      handleFileUpload () {
        this.parse()
        // this.createTorrentFile(this.write)
      },
      createTorrentFile () {
        this.write = JSON.stringify(this.obj)
        console.log(this.write)
        const fs = require('fs')
        try {
          fs.writeFileSync('torren.json', this.write, 'utf-8')
          console.log('File Written')
        } catch (e) {
          alert('Failed to save the file !')
        }
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

