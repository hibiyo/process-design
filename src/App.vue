<template>
  <!-- <div id="app"> -->
    <VueBpmn />
  <!-- </div> -->
</template>

<script>
import VueBpmn from './components/VueBpmn/index'

export default {
  name: 'App',
  components: {
    VueBpmn
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
