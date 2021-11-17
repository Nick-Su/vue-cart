<template>
  <div class="trunstile">
    <div class="trunstile-header">
      <img src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_640.png" alt="user avatar">
      <div class="session-info">
        <p>{{ sessionAlias }}</p>
        <p>{{ getEntranceDate }} - {{ getExitTime }}</p>
      </div>
    </div>
    <div class="trunstile-footer">
      <h5>Вход</h5>
      <p>{{ getEntranceDate }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'TrunstileInfo',
  props: {
    trunstile: { type: Object, required: true },
    sessionAlias: { required: true, default: '' }
  },
  computed: {
    getEntranceDate () {
      for (let i = 0; i < this.trunstile.length; i++) {
        if (this.trunstile[i].type === 'open') {
          return new Date(this.trunstile[i].timestamp * 1000).toLocaleTimeString('ru-RU')
        }
      }
      return null
    },

    getExitTime () {
      for (let i = 0; i < this.trunstile.length; i++) {
        if (this.trunstile[i].type === 'exit') {
          return new Date(this.trunstile[i].timestamp * 1000).toLocaleTimeString('ru-RU')
        }
      }
      return null
    }
  }
})
</script>

<style scoped>
  .trunstile {
    padding: 10px;
  }
  .trunstile-header {
    display: flex;
    flex-direction: row;
    justify-content: left;
    text-align: left;
  }

  .session-info {
    margin-left: 1em;
  }

  .session-info p {
    padding: 0;
    margin: 0;
  }

  .trunstile-footer {
    height: 45px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    border-bottom: 1px solid grey;
    margin-top: 1em;
  }

  img {
    border-radius: 50%;
    width: 50px;
    height: 50px;
  }
</style>
