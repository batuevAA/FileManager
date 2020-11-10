<template>
  <div id="app" class="app">
    <WorkingWindow ref="left"  @error="getError($event)" @setActive="setActivWindow($refs.left)"/>
    <WorkingWindow ref="right" @error="getError($event)" @setActive="setActivWindow($refs.right)"/>
    <TheActionBar @error="getError($event)"/>
    <MadalWindow ref="modal" :errMessage = "errMessage" :errCode = "errCode" />
  </div>
</template>

<script>
import axios from 'axios'
import { Api } from './server/api.js'
window.api = new Api();
import TheActionBar from './components/TheActionBar.vue'
import WorkingWindow from './components/WorkingWindow.vue'
import MadalWindow from './components/ModalWindow'

export default {
  name: 'App', 
  components: {
    TheActionBar,
    WorkingWindow,
    MadalWindow
  },
  data() {
    return {
      errCode: null,
      errMessage: null
    }
  },
  methods: {
    setActivWindow(activWindow) {
        this.$options.activeWindow = activWindow;
    },
    getError(err) {
      console.log('Код ошибки ' + err.code);
      console.log('Текст ошибки ' + err.message);
      this.errCode = err.code;
      this.errMessage = err.message;
    }
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
