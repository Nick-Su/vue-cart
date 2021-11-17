<template>
  <div :class="{ 'modal-opened': isModalOpened}" class="add-product-modal">
    <div class="modal-content">
      <span class="close" @click="closeModal()">&times;</span>
      <h3>Добавить товар</h3>
      <div v-for="(product, index) in products" :key="index" class="product-list">
        <div class="product-item">
          <p>{{ product }}</p>
          <button type="button" class="btn btn-primary btn-sm" @click="addProduct(product)">Добавить</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import productList from '@/services/mocks/products.json'

export default defineComponent({
  name: 'AddProductModal',
  data () {
    return {
      products: productList
    }
  },
  methods: {
    closeModal () {
      this.$store.commit('toggleIsModalOpened')
    },

    addProduct (productName: string) {
      this.$store.commit('addProduct', productName)
    }
  },
  computed: {
    isModalOpened () {
      return this.$store.state.isModalOpened
    }
  }
})
</script>

<style scoped>
  h3 {
    border-bottom: 1px solid grey;
    padding-bottom: 10px;
  }

  .add-product-modal {
    display: none;
    position: fixed;
    z-index: 1;
    padding-top: 100px;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgb(0,0,0);
    background-color: rgba(0,0,0,0.4);
  }

  .modal-opened {
    display: block;
  }

  .modal-content {
    background-color: #fefefe;
    margin: auto;
    padding: 20px;
    border: 1px solid #888;
    width: 80%;
  }

  .close {
    color: #aaaaaa;
    font-size: 32px;
    right: 3%;
    font-weight: bold;
    position: absolute;
  }

  .close:hover,
  .close:focus {
    color: #000;
    text-decoration: none;
    cursor: pointer;
  }

  .product-list {
    text-align: left;
  }

  .product-item {
    border-bottom: 1px solid lightgray;
    padding: 0.5em 0 0.5em 0;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
</style>
