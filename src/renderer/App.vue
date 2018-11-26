<template>
  <div id="app" class="flex-row">
    <div class="side-bar">
      <div class="main-logo flex-row center-all">
        <img src="static/main-logo.svg">
      </div>
      <nav class="flex-col space-evenly">
        <div @mouseover="iconHoverOn($event)" @mouseleave="iconHoverOff($event)" class="flex-col space-evenly">
          <img src="static/create.svg">
          Create a Torrent
        </div>
        <div @mouseover="iconHoverOn($event)" @mouseleave="iconHoverOff($event)" class="flex-col space-evenly">
          <img src="static/add.svg">
          Add a Torrent
        </div>
        <div @mouseover="iconHoverOn($event)" @mouseleave="iconHoverOff($event)" class="flex-col space-evenly">
          <img src="static/settings.svg">
          Settings
        </div>          
      </nav>
    </div>
    <div class="page-body">

    </div>
  </div>
</template>

<script>
import './common.css'

export default {
  name: 'make-torrents-great-again',
  methods: {
    open (link) {
      this.$electron.shell.openExternal(link)
    },
    iconHoverOn (event) {
      event.currentTarget.classList.add('icon-highlighted')
    },
    iconHoverOff (event) {
      event.currentTarget.classList.remove('icon-highlighted')
    }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro');
@import url('https://fonts.googleapis.com/css?family=Roboto');

body
{
  margin: 0px;
  font-family: 'Roboto';
}

.page-body
{
  width: 100%;
  height: 100vh;
}

.side-bar
{
  height: 100vh;
  width: 200px;
}

.main-logo
{
  width: 200px;
  height: 200px;
  background-color: #70a0ff;
}

.main-logo img
{
  height: 100px;
  width: 100px;
}

nav
{
  height: 85%;
}

nav img
{
  height: 70px;
  width: 70px;
  margin: 10px;
}

.icon-highlighted
{
  opacity: 0.5;
}
</style>
