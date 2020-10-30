<template>
  <div id="app" class="app">
    <WorkingWindow ref="left"  @setActive="setActivWindow($refs.left)"/>
    <WorkingWindow ref="right" @setActive="setActivWindow($refs.right)"/>
    <TheActionBar />
  </div>
</template>

<script>
import axios from 'axios'
import { Api } from './server/api.js'
window.api = new Api();
import TheActionBar from './components/TheActionBar.vue'
import WorkingWindow from './components/WorkingWindow.vue'

export default {
  name: 'App', 
  components: {
    TheActionBar,
    WorkingWindow
  },
  methods: {
    setActivWindow: function(activWindow) {
        this.$options.activeWindow = activWindow;
    },
  },
}
</script>

<style>
.app{
    display: flex; 
    align-items: center; 
    justify-content: center;
    height: 100vh;
    width: 100%;
    flex-wrap: wrap;
}
</style>
