<template>
<div class="flex-row space-evenly">
  <!-- Warning icon if there is at least one speed cap -->
  <div
    class="global-speed-cap-icon flex-row ceter-all"
    v-if="downloadCapActive || uploadCapActive">
    <img :src="'./static/info.svg'">
  </div>

  <!-- Global download speed -->
  <div class="global-speed-cap">
    <div v-if="downloadCapActive">
      Download speed limited to:
      {{ this.$store.state.SpeedCaps.download }}
    </div>
  </div>

  <!-- Global upload speed -->
  <div class="global-speed-cap">
    <div v-if="uploadCapActive">
      Upload speed limited to:
      {{ this.$store.state.SpeedCaps.upload }}
    </div>
  </div>
  
</div>
</template>

<script>
import './../common.css'

export default {
  name: 'StatsFooter',
  computed: {
    downloadCapActive () {
      return this.$store.state.SpeedCaps.download !== null
    },
    uploadCapActive () {
      return this.$store.state.SpeedCaps.upload !== null
    }
  }
}
</script>

<style>
.global-speed-cap
{
  margin-left: 20px;
  margin-right: 20px;
}
</style>