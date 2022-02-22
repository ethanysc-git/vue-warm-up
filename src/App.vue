<template>
      <header class="top-bar spread">
        <nav class="top-bar-nav">
          <router-link to="/" class="top-bar-link">
            <i class="icofont-spoon-and-fork"></i>
            <span>Home</span>
          </router-link>
          <router-link to="/products" class="top-bar-link">
            <span>Products</span>
          </router-link>
          <router-link to="/past-orders" class="top-bar-link">
            <span>Past-Orders</span>
          </router-link>
        </nav>
        <div @click="toggleSidebar" class="top-bar-cart-link">
          <i class="icofont-cart-alt icofont-1x"></i>
          <span>Cart ({{ totalQuantity }})</span>
        </div>
      </header>
  <router-view :inventory="inventory" />
      <sidebar
        :cart="cart"
        v-if="showsidebar"
        :toggle="toggleSidebar"
        :inventory="inventory"
        :remove="removeItem"
        />
</template>

<script>
import food from './food.json'
import Sidebar from '@/components/sidebar.vue'

export default {
  data () {
    return {
      showsidebar: false,
      inventory: food,
      cart: {}
    }
  },
  components: {
    Sidebar
  },
  computed: {
    totalQuantity () {
      const total = Object.values(this.cart).reduce((acc, curr) => {
        return acc + curr
      }, 0
      )
      return total
    }
  },
  methods: {
    addToCart (name, index) {
      if (!this.cart[name]) {
        this.cart[name] = 0
      }
      this.cart[name] += this.inventory[index].quantity
      console.log(name, this.cart[name])
    },
    toggleSidebar () {
      this.showsidebar = !this.showsidebar
    },
    removeItem (name) {
      delete this.cart[name]
    }
  }
}
</script>
