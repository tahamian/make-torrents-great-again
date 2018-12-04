<template>
<div>
  <div v-if="torrent.optionsVisible === false" class="space-between flex-row">
    <div v-if="torrent.image" class="torrent-image">
      <img :src="'./static/torrent_images/' + torrent.image">
    </div>

    <!-- Take up space if there is no image -->
    <div v-if="!torrent.image" class="torrent-image missing-image"></div>

    <div class="torrent-name">{{ torrent.name }}</div>

    <div class="torrent-icon download-icon flex-col space-evenly">
      <img :src="'./static/arrow-downward.svg'">
      <div>{{ torrent.downloadSpeed }}</div>
    </div>

    <div class="torrent-icon upload-icon flex-col space-evenly">
      <img :src="'./static/arrow-upward.svg'">
      <div>{{ torrent.uploadSpeed }}</div>
    </div>  

    <div class="torrent-icon peers-icon flex-col space-evenly">
      <div v-if="torrent.peers > 30"><img :src="'./static/people-many.svg'"></div>
      <div v-if="torrent.peers <= 30"><img :src="'./static/people-few.svg'"></div>
      <div>{{ torrent.peers }}</div>
    </div>

    <div class="torrent-icon flex-col center-all delete-torrent">
      <button type="button" class="flex-col center-all btn" v-on:click="showDeleteTorrentModal($event)"><img src="static/delete-forever.svg"></button>
    </div>
    
    <div class="torrent-icon flex-col center-all torrent-options">
      <button type="button" class="btn" v-on:click="toggleTorrentOptionsVisible({ torrent: torrent, option: true})">...</button>
    </div>
  </div>
  <div v-if="torrent.optionsVisible === true" class="space-between flex-row torrent-options-view">
    <div style="padding-left: 20px;">
      <b-input-group prepend="Max Down limit" append="MBp/s">
        <b-form-input min="0" type="number" v-model="torrent.downLimit"
        ></b-form-input>
      </b-input-group>
      <br>
      <b-input-group prepend="Max Up limit" append="MBp/s">
        <b-form-input min="0" type="number" v-model="torrent.upLimit"></b-form-input>
      </b-input-group>
    </div>
    <div class="torrent-icon flex-col center-all torrent-options" align="right">
      <button type="button" class="btn" v-on:click="toggleTorrentOptionsVisible({ torrent: torrent, option: false})">...</button>
    </div>
  </div>
</div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'Torrent',
  props: {
    torrent: Object
  },
  mounted: function () {
    this.$nextTick( () => {
      window.setInterval(() => {
        this.computeDown()
      }, 1000)
    })
  },
  methods: {
    showDeleteTorrentModal () {
      if (confirm('Do you want to delete this torrent?')) {
        this.deleteTorrent(this.torrent)
      } else {
        console.log('NEVERMIND!')
      }
    },
    ...mapActions([
      'toggleTorrentOptionsVisible',
      'deleteTorrent',
      'updateDown',
      'updateUp',
      'updateTime'
    ]),
    computeDown () {
      this.updateTime({name: this.torrent.name, time: 1000}) 
      
      // UPDATE THIS VARIABLE FOR DOWNLOAD--------------------------------------------|
      let increaseDown = parseFloat(((2* this.torrent.peers)/100) * Math.log(this.torrent.time)).toFixed(2)
      //------------------------------------------------------------------------------|

      let maxlocalDown = this.torrent.downLimit == null  || this.torrent.downLimit == '' ? increaseDown : Math.min(increaseDown , this.torrent.downLimit)
      let maxglobalDown = this.$store.getters.getDown == null || this.$store.getters.getDown == '' ? maxlocalDown : Math.min(maxlocalDown, Number(this.$store.getters.getDown))
      
      // UPDATE THIS VARIABLE FOR DOWNLOAD--------------------------------------------|
      let increaseUp = parseFloat(((2* this.torrent.peers)/100) * Math.log(this.torrent.time)).toFixed(2)
      //------------------------------------------------------------------------------|
      
      let maxlocalUp = this.torrent.upLimit == null  || this.torrent.upLimit == '' ? increaseUp : Math.min(increaseUp , this.torrent.upLimit)
      let maxglobalUp = this.$store.getters.getUp == null || this.$store.getters.getUp == '' ? maxlocalUp : Math.min(maxlocalUp, Number(this.$store.getters.getUp))
      
      if (this.torrent.type = 'down'){
        this.updateDown({name: this.torrent.name, downloadSpeed: maxglobalDown}) 
        this.updateUp({name: this.torrent.name, uploadSpeed: maxglobalUp}) 
      }
      else {
        this.updateUp({name: this.torrent.name, uploadSpeed: maxglobalUp}) 
      }
    }
  }
}
</script>

<style>
.missing-image
{
  min-width: 150px;
  min-height: 150px;
}

.torrent-image img
{
  height: 150px;
  width: 150px;
  min-height: 150px;
  min-width: 150px;
}

.torrent-icon img
{
  width: 35px;
  height: 50px;
}

.torrent-name
{
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  width: 200px;
}

.torrent-options
{
  cursor: pointer;
  font-size: 20px;
  margin-right: 70px;
  font-weight: bold;
}

.delete-torrent *
{
  height: 40px;
  width: 30px;
}

.delete-torrent button:hover
{
  background-color: #dd0033;
}

.torrent-options-view
{
  height: 150px;
  width: 100%;
  min-height: 150px;
  min-width: 100%;
}
</style>