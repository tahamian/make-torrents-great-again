<template>
  <div id="app" class="flex-row">
    <div class="side-bar">
      <div class="main-logo box-shadow flex-row center-all">
        <h1>∈</h1>
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
      <router-view></router-view>
    </div>
    <StatsFooter class="stats-footer"></StatsFooter>
  </div>
</template>

<script>
import './common.css'

import './store/index.js'

import StatsFooter from './components/StatsFooter.vue'

export default {
  name: 'make-torrents-great-again',
  components: { StatsFooter },
  methods: {
    open (link) {
      this.$electron.shell.openExternal(link)
    },
    addClass (element, className) {
      element.classList.add(className)
    },
    remClass (element, className) {
      element.classList.remove(className)
    },
    iconHoverOn (event) {
      this.addClass(event.currentTarget, 'icon-highlighted')
    },
    iconHoverOff (event) {
      this.remClass(event.currentTarget, 'icon-highlighted')
    }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro');
@import url('https://fonts.googleapis.com/css?family=Roboto');

body
{
  overflow: hidden;
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
  width: 150px;
}

.main-logo
{
  width: 150px;
  height: 150px;
  background-color: #386fff;
}

.box-shadow
{
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

.main-logo img
{
  height: 100px;
  width: 100px;
}

nav
{
  height: 100%;
  border: 1px solid #e0e0e0;
}

nav div
{
    opacity: 0.5;
}

nav img
{
  height: 70px;
  width: 70px;
  margin: 10px;
}

.icon-highlighted
{
  opacity: 0.9;
  cursor: pointer;
}

.main-logo h1
{
  font-size: 80px;
  transform: rotate(10deg);
  font-family: 'Roboto';
  color: white;
  text-shadow: 2px 2px 4px #707070;
}

.stats-footer
{
  position: fixed;
  bottom: 0px;
  height: 30px;
  border: 1px solid #e0e0e0;
  right: 0px;
  left: 150px;
}
</style>
