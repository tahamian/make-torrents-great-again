<template>
  <div id="app">
    <div id="wrapper">
      <header class="center-all flex-row shadow p-3">
        <div id="main-logo" class="center-all flex-row">
          <img height="80px" width="80px" src="static/main-logo.svg">
        </div>
        <nav>
        </nav>
      </header>
      <div id="sidebar" class="flex-col center-all">
        <ul class="flex-col center-all full-height text-center">
          <li>Add Torrent</li>
          <li>Create Torrent</li>
          <li>Settings</li>
        </ul>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
// import Buefy from 'buefy'
import './common.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

export default {
  name: 'make-torrents-great-again',
  methods: {
    open (link) {
      this.$electron.shell.openExternal(link)
    }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro');
@import url('https://fonts.googleapis.com/css?family=Roboto');

body {
  font-family: 'Roboto';
}

ul,
ul li {
  list-style: none;
}

header {
  height: 200px;
  background-color: #386FFF;
  box-shadow: 5px 10px;
  margin-bottom: 0px;
}

#sidebar {
  height: 100vh;
  min-width: 200px;
  max-width: 200px;
  background-color: #f0f0f0;
}

#main-logo {
  flex: 2;
  max-width: 200px;
}

header nav {
  flex: 8;
}
</style>
