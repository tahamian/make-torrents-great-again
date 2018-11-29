<template>
<div class="space-between flex-row">
  <div v-if="torrent.image" class="torrent-image">
    <img :src="'./static/torrent_images/' + torrent.image">
  </div>

  <!-- Take up space if there is no image -->
  <div v-if="!torrent.image" class="torrent-iamge missing-image"></div>

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
    <button type="button" class="flex-col center-all btn"><img src="static/delete-forever.svg"></button>
  </div>
  
  <div class="torrent-icon flex-col center-all torrent-options">
    ...
  </div>
</div>
</template>

<script>
export default {
  name: 'Torrent',
  props: {
    torrent: Object
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
  background-color: #ff3060;
}
</style>