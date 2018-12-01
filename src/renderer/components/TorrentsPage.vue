<!-- Torrent List Page -->
<template>

<div class="flex-col">
  <header class="box-shadow">
    <div class="torrent-categories flex-row space-evenly">
      <div
        v-bind:class="{ active: category.name === $store.state.TorrentCategories.active.name }"
        v-for="category in $store.state.TorrentCategories.categories"
        v-bind:key="category.name"
        @mouseover="categoryHoverOn($event)"
        @mouseleave="categoryHoverOff($event)"
        v-on:click="switchCategory($event)">
        <span>{{ category.name }}</span>
      </div>
    </div>
    <div class="search">
      <img class="search-icon" src="static/search.svg">
      <input v-model="searchQuery" type="text" size="40">
    </div>
  </header>
  <content>
    <div
      v-for="torrent in listTorrents"
      v-bind:key="torrent.name">
      <Torrent class="torrent-section" v-bind:torrent="torrent"></Torrent>
    </div>
  </content>

</div>
</template>

<script>
import './../common.css'

import Torrent from './Torrent.vue'

import { mapActions } from 'vuex'

export default {
  name: 'main-page',
  components: { Torrent },
  computed: {
    listTorrents () {
      let activeCategory = this.$store.state.TorrentCategories.active.name
      let searchQuery = this.searchQuery

      return this.$store.state.Torrents.filter((current) => {
        return (activeCategory === 'All' || current.category === activeCategory) && (searchQuery === '' || this.queryMatch(searchQuery, current.name))
      })
    }
  },
  methods: {
    queryMatch (searchQuery, torrentName) {
      return torrentName.toLowerCase().indexOf(searchQuery.toLowerCase()) >= 0
    },
    categoryHoverOn (event) {
      this.$parent.addClass(event.currentTarget, 'highlighted')
    },
    categoryHoverOff (event) {
      this.$parent.remClass(event.currentTarget, 'highlighted')
    },
    switchCategory (event) {
      let activeName = event.currentTarget.children[0].innerHTML
      this.setActiveTorrentCategory(activeName)
    },
    ...mapActions([
      'setActiveTorrentCategory'
    ])
  },
  data () {
    return {
      searchQuery: ''
    }
  }
}
</script>

<style>
header
{
  height: 150px;
  background-color: #386fff;
}

.torrent-categories
{
  height: 100%;
  font-size: 20px;
}

.torrent-categories div
{
  opacity: 0.7;
  cursor: pointer;
  margin-top: 40px;
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
  display: flex;
  top: 20px;
  right: 10%;
}

.search-icon
{
  margin-right: 10px;
  opacity: 0.7;
}

.highlighted
{
  opacity: 1.0 !important;
}

.active
{
  opacity: 1.0 !important;
  text-decoration: underline;
  font-weight: bold;
}

.torrent-section
{
  width: 100%;
  height: 150px;
  border-bottom: 1px solid #c0c0c0;
}
</style>