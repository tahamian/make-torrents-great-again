<template>

<div class="flex-col">
  <router-link :to="{name : 'settings'}"> Hey</router-link>
  <header>
    <div class="torrent-categories flex-row space-evenly">
      <div><b>Music</b></div>
      <div>Movies</div>
      <div>Books</div>
    </div>
    <div class="search">
      <input type="text">
    </div>
    <img class="search-icon" src="static/search.svg">
  </header>
  <content>
    This is the body
  </content>

</div>
</template>

<script>
import './../common.css'

export default {
  name: 'main-page',
  methods: {}
}
</script>

<style>
header
{
  height: 150px;
  background-color: #70a0ff;
}

.torrent-categories div
{
  height: 100%;
  display: flex;
  align-items: center;
  font-size: 1.5em;
  color: white;
}

.search
{
  opacity: 0.7;
  position: absolute;
  top: 20px;
  right: 20px;
}

.search-icon
{
  opacity: 0.7;
  position: absolute;
  top: 20px;
  right: 80px;
}
</style>