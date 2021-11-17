<template>
  <SessionsContainer />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import SessionsContainer from './components/SessionsContainer.vue'

export default defineComponent({
  name: 'App',
  components: {
    SessionsContainer
  }
})
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
