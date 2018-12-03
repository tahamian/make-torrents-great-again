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
      <div v-if="torrent.peers > 10"><img :src="'./static/people-many.svg'"></div>
      <div><img :src="'./static/people-few.svg'"></div>
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
    <div style="width: 100%; padding-left: 20px;">
      <div class="flex-row space-evenly">
        <div class="flex-col space-evenly">
          <label for="maxDown">Max Download Speed</label>
          <input v-model="downCap" type="number" class="form-control" id="exampleInputEmail1" placeholder="">
          <select class="form-control" id="exampleFormControlSelect1">
            <option v-for="unit in unitsForSpeed">{{ unit }}</option>
          </select>
        </div>
        <div class="flex-col space-evenly" style="">
          <label for="maxDown">Max Download Speed</label>
          <input type="number" v-model="upCap" class="form-control" id="exampleInputEmail1" placeholder="">
          <select class="form-control" id="exampleFormControlSelect1">
            <option v-for="unit in unitsForSpeed">{{ unit }}</option>
          </select>
        </div>
        <button class="btn btn-success" v-on:click="saveTorrentOptions()">Save</button>
      </div>
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
  data () {
    return {
      unitsForSpeed: ['MBp/s', 'GBp/s', 'KBp/s'],
      downCap: '',
      upCap: ''
    }
  },
  methods: {
    saveTorrentOptions () {
      alert('Options saved')
    },
    showDeleteTorrentModal () {
      if (confirm('Do you want to delete this torrent?')) {
        this.deleteTorrent(this.torrent)
      } else {
        console.log('NEVERMIND!')
      }
    },
    ...mapActions([
      'toggleTorrentOptionsVisible',
      'deleteTorrent'
    ])
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