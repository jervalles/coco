<template>
  <div class="shopping-container">

    <!-- FOR DEVELOPPEMENT ONLY: USER INFORMATIONS -->
    <div>
      {{ user }}
      {{ isAuthed ? 'Logged-in' : 'Not Logged in' }} 
    </div>
    <!-- -->

    <v-dialog
      v-model="thanksDialog"
      max-width="320"
    >
      <template>
        <v-card>
          <v-card-title>CONFIRMATION</v-card-title>
          <v-card-text>Merci pour votre commande :)</v-card-text>
        </v-card>
      </template> 
    </v-dialog>

    <cart-modal 
      :basketIsOpen="basketIsOpen"
      :itemsInBasket="itemsInBasket"
      :totalPrice="totalPrice"
      :basketIsEmpty="basketIsEmpty"
      :user="user"
      @close-basket="basketIsOpen = false"
      @clear-basket="clear()"
      @add-item="addItem($event)"
      @remove-item="removeItem($event)"
      @confirm-order="confirmOrder($event)"
      @order-success="orderSuccess()"
    />

    <div class="shopping">
      <div class="left-menu">
        <category-list 
          :categories="this.categories" 
          @selectCategory="selectCategory($event)" 
        />
        <div class="user-menu">
          <v-btn icon large @click="loginPage()">
            <v-icon>mdi-account</v-icon>
          </v-btn>
          <v-btn icon large @click="basket()">
            <v-icon>mdi-basket</v-icon>
          </v-btn>
        </div>
        
      </div>
      <items-list :items="items" 
        :selectedCategory="selectedCategory"
        @addItem="addItem($event)"
        @removeItem="removeItem($event)"
        :loading="loading"
      />
    </div>
  </div>
</template>

<script>
import CategoryList from './CategoriesList'
import ItemsList from './ItemsList'
import CartModal from './CartModal'
import Router from '../../router'
import { mapGetters, mapActions } from 'vuex'

export default {
    name: 'Shopping',
    components: {
      CategoryList,
      ItemsList,
      CartModal
    },
    data() {
      return {
        selectedCategory: 1,
        totalPrice: 0,
        basketIsOpen: false,
        basketIsEmpty: true,
        loading: true,
        thanksDialog: false,
        itemsInBasket: []
      }
    },
     watch: {
      itemsFetching: function(status){
        if (status.success) {
          this.loading = false
        } else if (status.error) {
          // console.log("NOT OK")
        }
      }
    },
    computed: {
      ...mapGetters([
        'user',
        'items',
        'categories',
        'itemsFetching',
        'isAuthed'
      ])
    },
    mounted() {
      this.init()
    },
    methods: {
      ...mapActions([
        'fetchItemCategories',
        'fetchItems',
        'createOrder'
		]),
      async init() {
        await this.fetchItemCategories()
        await this.fetchItems()
      },
      selectCategory(event) {
        this.selectedCategory = event + 1
      },
      addItem(index) {
        if (this.itemsInBasket.includes(this.items[index])) {
          this.items[index].added += 1
        } else {
          this.items[index].added += 1
          this.itemsInBasket.push(this.items[index])
        }
        this.totalPrice += this.items[index].price
      },
      removeItem(event) {
        if (this.items[event].added > 0) {
          this.items[event].added -= 1
          this.totalPrice -= this.items[event].price
        } else {
          console.log("non autorisé")
        }
      },
      clear() {
        for (let i = 0; i < this.items.length; i++) {
          this.items[i].added = 0
        }
        this.totalPrice = 0
        this.itemsInBasket = []
      },
      async confirmOrder() {
        await this.createOrder({order: this.itemsInBasket, user: this.user})
      },
      orderSuccess() {
        this.clear()
        this.basketIsOpen = false
        this.thanksDialog = true
        setTimeout(function () {
            this.thanksDialog = false
        }.bind(this), 5000)
      },
      loginPage() {
        Router.push({ name: 'login'})
          .then(() => window.scrollTo(0, 0))
      },
      basket() {
        this.basketIsOpen = true
      }
    }
}

</script>

<style lang="scss">
  .shopping-container {
    margin-top: 10px;
    padding: 0px;
    width: 100%;

  .shopping {
    position: relative;
    justify-content: center;
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    .left-menu {
      width: 110px;
      .user-menu {
        display: flex;
        align-items: center;
        flex-direction: column;
      }
    }
  }
}

</style>