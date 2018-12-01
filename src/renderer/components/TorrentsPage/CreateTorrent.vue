<template>
  <div>
  <div id="upload" style="padding:50px">
    <h4>Upload Files:</h4>
    <div class="dropbox">
       <input type="file" multiple id="file" ref="file" class="input-file" v-on:change="handleFileUpload()">
       <p>Drag your files here or click to browse</p>
    </div>
  </div>
  <div id="table" align = "center" class = "tcontainer" overflow-y>
    <table id = "fileTable" align = "center" class = "table" style="width:100%">
</table>
  </div>
  <div id="createTorrent" align = "center">
    <button  v-on:click="createTorrentFile()">Create Torrent</button>
  </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        obj: [],
        store: [],
        rowId: 0,
        write: []
      }
    },
    methods: {
      parse () {
        var input = this.$refs.file.files
        console.log(input)
        for (var i = 0; i < input.length; i++) {
          this.obj.push({'name': input[i].name, 'path': input[i].path, 'category': this.checkFileType(input[i])})
          this.tableCreate(input[i].name, input[i].path)
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
      tableCreate (name, size) {
        this.rowId++
        // var thisRowID = this.rowId
        var table = document.getElementById('fileTable')
        var row = table.insertRow(0)
        var cell0 = row.insertCell(0)
        var cell1 = row.insertCell(1)
        var cell2 = row.insertCell(2)
        var btn = document.createElement('input')
        btn.type = 'button'
        btn.className = 'btn'
        btn.onclick = function () {
          alert('Baba')
        }
        // cell0.innerHTML = '<input type="button" value="x"></input>'
        cell0.innerHTML = '<button class=\'btn\' v-on:click =this.buttonClicked()></button>'
        cell1.innerHTML = name
        cell2.innerHTML = size
      },
      buttonClicked () {
        console.log('Worked')
      },
      tableReset () {
        this.obj = []
        this.write = []
        var Table = document.getElementById('fileTable')
        Table.innerHTML = ''
      },
      handleFileUpload () {
        this.parse()
        // this.createTorrentFile(this.write)
      },
      deleteRow (rowid) {
        var row = document.getElementById(rowid)
        row.parentNode.removeChild(row)
      },
      createTorrentFile () {
        this.write = JSON.stringify(this.obj)
        console.log(this.write)
        const fs = require('fs')
        try {
          fs.writeFileSync('torrent.json', this.write, 'utf-8')
          console.log('File Written')
        } catch (e) {
          alert('Failed to save the file !')
        }
        this.tableReset()
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
  .tcontainer{
    position: relative;
    padding: 10px 10px;
    overflow: auto;
    max-height: 25vh;
    max-width: 100vh;
  }
  .table {
    padding: 100px;
  }
  .smallB {
   padding-top: 2px;
   height: 50%;
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

