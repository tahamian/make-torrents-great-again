<template>
<div class="flex-row center-all">{{ torrent.name }}</div>
</template>

<script>
export default {
  name: 'Torrent',
  props: {
    torrent: Object
  }
}
</script>