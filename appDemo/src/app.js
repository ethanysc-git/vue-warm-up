let app = Vue.createApp({
    data() {
      return {
        showsidebar: false,
        inventory: [],
        cart: {
        }
      }
    },
    computed: {
      totalQuantity() {
        const total = Object.values(this.cart).reduce((acc, curr) => {
          return acc + curr
        },0
        )
        return total
      },

    },
    methods: {
      addToCart(name, quantity) {
        if(!this.cart[name]) {
          this.cart[name] = 0;
        }
        this.cart[name] += quantity
        console.log(name, this.cart[name])
      },
      toggleSidebar() {
        this.showsidebar = !this.showsidebar
      },
      removeItem(name) {
        delete this.cart[name]
      },
    },
    async mounted() {
        const res = await fetch('./food.json')
        const data = await res.json() 
        this.inventory = data
      },  
      components: {
        sidebar: {
          props: ['toggle', 'cart', 'inventory', 'remove'],
          computed: {
          },
          methods: {
            getPrice(name) {
              console.log(name)
              const product = this.inventory.find((p) => {
                return p.name === name
              })
              return product.price.USD
            },
            calculateTotal() {
              //const names = Object.keys(this.cart)
              //const total = Object.values(this.cart).reduce((acc, curr, index) => {
                //return acc + (curr * this.getPrice(names[index]))
              //},0
              //)
              //return total.toFixed(2)
              //[key, value]
              const total = Object.entries(this.cart).reduce((acc, curr, index) => {
                return acc + (curr[1] * this.getPrice(curr[0]))
              }, 0)
              return total.toFixed(2)
            }
          },
          template: `
          <aside class="cart-container">
          <div class="cart">
            <h1 class="cart-title spread">
              <span>
                Cart
                <i class="icofont-cart-alt icofont-1x"></i>
              </span>
              <button @click='toggle' class="cart-close">&times;</button>
            </h1>
      
            <div class="cart-body">
              <table class="cart-table">
                <thead>
                  <tr>
                    <th><span class="sr-only">Product Image</span></th>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Qty</th>
                    <th>Total</th>
                    <th><span class="sr-only">Actions</span></th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(quantity, key, i) in cart" :key="i">
                    <td><i class="icofont-carrot icofont-3x"></i></td>
                    <td>{{ key }}</td>
                    <td>\${{ getPrice(key) }}</td>
                    <td class="center">{{ quantity }}</td>
                    <td>\${{ quantity*getPrice(key) }}</td>
                    <td class="center">
                      <button @click="remove(key)" class="btn btn-light cart-remove">
                        &times;
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
      
              <p class="center" v-if="!Object.keys(cart).length" ><em>No items in cart</em></p>
              <div class="spread">
                <span><strong>Total:</strong> \${{ calculateTotal() }}</span>
                <button class="btn btn-light">Checkout</button>
              </div>
            </div>
          </div>
        </aside>
          `
        },
        products: {
          props: ['product', 'index', 'add'],
          computed: {
          },
          methods: {
          },
          template: `
          <div class="card">
              <div class="card-title">
                  {{ product.name }}
              </div>
              <div class="card-body">
                  <i class="icofont-10x icofont-carrot"></i>
                  <form>
                  <div class="row">
                      <div class="cell">
                      <label>Type:</label>
                      </div>
                      <div class="cell">
                      <em>{{ product.type }}</em>
                      </div>
                  </div>
                  <div class="row">
                      <div class="cell">
                      <label>Price:</label>
                      </div>
                      <div class="cell">
                      \${{ product.price.USD }}
                      </div>
                  </div>
                  <div class="row">
                      <div class="cell">
                      <label>Quantity:</label>
                      </div>
                      <div class="cell">
                      <input type="number" v-model.number="quantity">
                      </div>
                  </div>
                  </form>
              </div>
              <div class="card-footer">
                  <button @click="add(product.name, quantity)" class="btn btn-light">Add to cart</button>
              </div>
          </div>
          `
        }
      },    
  })
  app.mount('#app')