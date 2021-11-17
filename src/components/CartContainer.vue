<template>
    <div :class="{'submitted': sessionData.isSubmitted}" class="cart-container">
      <TrunstileInfo :trunstile="sessionData.trunstile" :sessionAlias="sessionData.alias" />
      <ProductList :products="sessionData.products" :sessionId="sessionData.sessionId" :isSubmitted="sessionData.isSubmitted" />
    </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'
import { ISessionData } from '@/services/models/ISessionData'
import ProductList from '@/components/ProductList.vue'
import TrunstileInfo from '@/components/TrunstileInfo.vue'

export default defineComponent({
  name: 'CartContainer',
  props: {
    sessionData: Object as () => { type: ISessionData[], required: true}
  },
  components: {
    ProductList,
    TrunstileInfo
  }
})
</script>

<style scoped>
  .cart-container {
    width: 50%;
    min-width: 280px;
    border: 2px solid palevioletred;
    border-radius: 10px;
    margin: 3em auto;
  }

  .submitted {
    border: 2px solid blue;
  }
</style>
