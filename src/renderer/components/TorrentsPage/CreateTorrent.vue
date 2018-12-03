<template>
  <div>
    <header 
    v-bind:style="{ 'background-color' :headerBackground }"
    >
      <div class="create">Create Torrent</div>
    </header>
    <div id="upload" style="padding:50px">
      <h4>Upload Files:</h4>
      <div class="dropbox">
        <input
          type="file"
          multiple
          id="file"
          ref="file"
          class="input-file"
          v-on:change="handleFileUpload()"
        >
        <p>Drag your files here or click to browse</p>
      </div>
    </div>
    <b-card title="Added Files" 
    :bg-variant="getColor" 
    :text-variant="getText" 
    :header-text-variant="getText">
      <custom-table :down="obj"></custom-table>
    </b-card>
    <div class="createTorrent" align="center">
      <b-btn v-on:click="createTorrentFile()" v-b-modal.modalPopover>Create Torrent File</b-btn>
      <b-modal id="modalPopover" title="Modal with Popover" hide-header ok-only>
        <p>Finished Creating Torrent File.</p>
      </b-modal>
    </div>
    <div></div>
  </div>
</template>
<script>
import customTable from "./Download/Table";
import "./../../common.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

import Torrent from "./../Torrent.vue";
import { mapActions } from "vuex";
export default {
  components: { customTable },
  data() {
    return {
      obj: [],
      write: [],
      cardBack: '',
      cardText: ''
    };
  },
  computed: {
    getColor () {
      if (this.$store.getters.getThemes == 'Dark') { return 'dark' }
      else if (this.$store.getters.getThemes == 'Blue') { return 'primary' }
      else { return 'light' }
    },
    getText () {
      if (this.$store.getters.getThemes == 'Light') { return 'black' }
      else { return 'white' }
    },
    headerBackground () {
      let x = this.$store.state.Settings.currentTheme
      if (x == 'Dark') { return '#343a40' }
      else { return '#007bff' }
    }
  },
  methods: {
    parse() {
      var input = this.$refs.file.files;
      console.log(input);
      for (var i = 0; i < input.length; i++) {
        this.obj.push({
          name: input[i].name,
          path: input[i].path,
          check: true,
          category: this.checkFileType(input[i])
        });
      }
    },
    checkFileType(file) {
      if (file.type.includes("image/")) {
        return "Etc.";
      } else if (file.type.includes("audio/")) {
        return "Music";
      } else if (file.type.includes("video/")) {
        if (file.size < 4000000000) {
          return "T.V.";
        } else {
          return "Movies";
        }
      } else if (
        file.type.includes("application/pdf") ||
        file.type.includes("application/txt") ||
        file.type.includes("application/docx")
      ) {
        return "Books";
      } else if (file.type.includes("application/")) {
        return "Applications";
      } else {
        return "Etc/";
      }
    },
    handleFileUpload() {
      this.parse();
      // this.createTorrentFile(this.write)
    },
    createTorrentFile() {
      var data = [];
      for (var i = 0; i < this.obj.length; i++) {
        if (this.obj[i].check == true) {
          data.push({
            filename: this.obj[i].name,
            path: this.obj[i].path,
            category: this.obj[i].category
          });
          var current = {
            category: this.obj[i].category,
            image: "",
            name: this.obj[i].name,
            optionsVisible: false,
            downloadSpeed: 0,
            uploadSpeed: 0,
            peers: 0,
            optionsVisible: false
          };
          this.addTorrent(current);
        }
        this.obj = [];
      }
      this.write = JSON.stringify(data);

      console.log(this.$store.state.Torrents);
      const fs = require("fs");
      try {
        fs.writeFileSync("torrent.json", this.write, "utf-8");
        console.log("File Written");
      } catch (e) {
        alert("Failed to save the file !");
      }
    },
    ...mapActions([
      "addTorrent" // mapped the function
    ])
  }
};
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
.createTorrent {
  padding: 50px;
}
.tcontainer {
  position: relative;
  padding: 10px 10px;
  overflow: auto;
  max-height: 25vh;
  max-width: 100vh;
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
.create {
  height: 100%;
  font-size: 20px;
  opacity: 0.7;
  cursor: pointer;
  /* margin-top: 40px; */
  height: 100%;
  display: flex;
  align-items: center;
  font-size: 1.5em;
  color: white;
}
</style>

