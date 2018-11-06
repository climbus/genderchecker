<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/gender.jpeg">
    <Testowa />
  </div>
</template>

<script>
import Testowa from './components/Testowa.vue'

export default {
  name: 'app',
  components: {
    Testowa
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
