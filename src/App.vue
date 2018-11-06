<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/gender.jpeg">
    <GenderChecker />
  </div>
</template>

<script>
import GenderChecker from './components/GenderChecker.vue'

export default {
  name: 'app',
  components: {
    GenderChecker
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
