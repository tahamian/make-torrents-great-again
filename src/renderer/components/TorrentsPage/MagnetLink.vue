<template>
  <div>
    <header 
    v-bind:style="{ 'background-color' :headerBackground }"
    >
      <div class="create">Add Torrent From Magnet Link</div>
    </header>

    <b-card 
    :bg-variant="getColor" 
    :text-variant="getText" 
    :header-text-variant="getText"
    >
      <div role="group">
        <label for="inputLive">Magnet Link:</label>
        <b-form-input
          id="inputLive"
          v-model.trim="name"
          type="text"
          :state="nameState"
          aria-describedby="inputLiveHelp inputLiveFeedback"
          placeholder="Enter Magnet Link"
        ></b-form-input>
        <b-form-invalid-feedback id="inputLiveFeedback">Enter Valid Magnet link</b-form-invalid-feedback>

        <div>
          <br>
          <b-button ref="button" disabled variant="success" v-if=" ! nameState">Download</b-button>

          <b-button
            ref="button"
            variant="success"
            v-if=" nameState"
            v-on:click="handleFileUpload"
          >Download</b-button>
        </div>
      </div>
    </b-card>

    <div class="createTorrent">
      <b-container class="bv-example-row">
        <b-row class="text-center">
          <b-col></b-col>
          <b-col cols="12">
            <b-card 
            title="Added Files" 
            v-if="obj.length > 1"
            :bg-variant="getColor" 
            :text-variant="getText" 
            :header-text-variant="getText"
            >
              <custom-table :down="obj"></custom-table>

              <b-btn
                v-on:click="createTorrentFile()"
                v-b-modal.modalPopover
                v-if="obj.length > 1"
              >Download Files</b-btn>
            </b-card>
          </b-col>
          <b-col></b-col>
        </b-row>
      </b-container>

      <b-modal id="modalPopover" title="Modal with Popover" hide-header ok-only>
        <p>Finised Adding Torrent File.</p>
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
import "vuetify/dist/vuetify.min.css";

export default {
  components: { customTable },
  computed: {
    nameState() {
      return this.name.length > 2 ? true : false;
    },
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
  data() {
    return {
      obj: [],
      write: [],
      name: ""
    };
  },
  methods: {
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
      this.obj.push(
        {
          name: "Deadpool 4K",
          path: "Downloads",
          check: true,
          category: "Movies"
        },
        {
          name: "How to be Smart",
          path: "Downloads",
          check: true,
          category: "Books"
        }
      );
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
            peers: Math.floor(Math.random() * 100),
            optionsVisible: false,
            type: 'down',
            time: 0,
            downLimit: null,
            upLimit: null
          };
          this.addTorrent(current);
        }
      }
      this.write = JSON.stringify(data);
      const fs = require("fs");
      try {
        fs.writeFileSync("torrent.json", this.write, "utf-8");
        console.log("File Written");
      } catch (e) {
        alert("Failed to save the file !");
      }
      this.obj = [];
    },
    ...mapActions([
      "addTorrent"
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

