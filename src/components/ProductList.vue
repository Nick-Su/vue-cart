<template>
    <div v-for="item in this.products" :key='item.id'>
      <div class="product-item">
        <div class="product-name">{{ item.productName }}</div>
        <div class="product-count">
          <button v-if="!isSubmitted" @click="deleteItem(item.productName)" class="trash-btn styless-btn"><i class="fa fa-trash"></i></button>
          <button v-if="!isSubmitted" @click="decreaseProductCount(item.productName)" class="styless-btn"><i class="fa fa-minus"></i></button>
          <div class="count">{{ item.productCount }}</div>
          <button v-if="!isSubmitted" @click="increaseProductCount(item.productName)" class="styless-btn"><i class="fa fa-plus"></i></button>
        </div>
      </div>
    </div>
    <div v-if="!isSubmitted" class="cart-operation-btns">
      <button type="button" class="btn btn-primary btn-sm" @click="showAddProductModal()">Добавить продукт</button>
      <button type="button" class="btn btn-success btn-sm" @click="submitShoppingCart()">Сохранить</button>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ProductList',
  props: {
    products: { required: true },
    sessionId: { type: String, required: true },
    isSubmitted: { type: Boolean, required: true }
  },
  methods: {
    deleteItem (productName: string) {
      this.$store.commit('deleteProductItem', { productName, sid: this.sessionId })
    },
    increaseProductCount (productName: string) {
      this.$store.commit('increaseProductItem', { productName, sid: this.sessionId })
    },
    decreaseProductCount (productName: string) {
      this.$store.commit('decreaseProductItem', { productName, sid: this.sessionId })
    },
    showAddProductModal () {
      this.$store.commit('toggleIsModalOpened', this.sessionId)
    },
    submitShoppingCart () {
      this.$store.commit('submitShoppingCart', this.sessionId)
    }
  }
})
</script>

<style scoped>
  .styless-btn {
    background: none;
    color: inherit;
    border: none;
    font: inherit;
    cursor: pointer;
    outline: inherit;
  }
  .product-item {
    margin: 0 auto;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 10px;
  }

  .product-count {
    display: inline-block;
    min-width: 120px;
  }

  .count {
    width: 90px;
    padding: 0 20px;
  }

  .product-count div {
    display: inline-block;
    padding: 0 5px;
    width: 30px;
  }

  .trash-btn {
    margin-right: 1em;
  }

  .trash-btn i {
    color: lightcoral;
  }

  .cart-operation-btns {
    border-top: 1px solid grey;
    padding: 10px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .cart-operation-btns button {
    padding: 10px;
  }
</style>
