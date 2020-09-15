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
          <v-btn icon x-large @click="loginPage()">
            <v-icon>mdi-account</v-icon>
          </v-btn>
          <v-btn icon x-large @click="basket()">
            <div class="basket-icon-container">
              <v-icon class="basket-icon">mdi-basket</v-icon>
              <div id="items-count">{{ itemsCountInBasket }}</div>
            </div>
          </v-btn>
          <v-btn v-if="isAdmin" icon x-large @click="admin()">
            <v-icon>mdi-beaker-check</v-icon>
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
        itemsInBasket: [],
        bouncing: false
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
        'isAuthed',
        'isAdmin'
      ]),
      itemsCountInBasket() {
        let count = 0
        for (let i = 0; i < this.itemsInBasket.length; i++) {
          count = count + this.itemsInBasket[i].added
          
        } return count ? count : null
      }
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
      bounceEffect() {
        if (this.bouncing == false) {
          this.bouncing = true
          let element = document.getElementById("items-count")
          element.classList.add("basket-count","bounce")
          setTimeout(function(){
            element.classList.remove("bounce", "basket-count")
            this.bouncing = false
          }.bind(this),2000)
        }
      },
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
        this.bounceEffect()
      },
      removeItem(index) {
        console.log(index)
        if (this.items[index].added > 0) {
          if (this.items[index].added === 1) {
            console.log("condition ok")
            for (let i = 0; i < this.itemsInBasket.length; i++) { 
              if ( this.itemsInBasket[i].id === this.items[index].id) { 
                this.itemsInBasket.splice(i, 1) 
              }
            }
          }
          this.items[index].added -= 1
          this.totalPrice -= this.items[index].price
          
          
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
      },
      admin() {
        Router.replace({ name: "admin" })
          .then(() => window.scrollTo(0, 0))
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
        .basket-icon-container {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          top: 0;
          left: 0;
          .basket-icon {
            position: relative;
            top: 0;
            left: 0;
          }
          #items-count {
            position: absolute;
            width: 22px;
            top: 10px;
            left: 16px;
            background-color: white;
            border-radius: 100px;
          }
          .basket-count {
            align-self: center;
            animation-duration: 2s;
            animation-iteration-count: infinite;
            margin: 0 auto 0 auto;
            transform-origin: bottom;
            width: 22px;
          }
        
    }
    .bounce {
        animation-name: bounce;
        animation-timing-function: cubic-bezier(0.280, 0.840, 0.420, 1);
    }
    @keyframes bounce {
        0%   { color: red;transform: scale(1,1)      translateY(-100); }
        10%  { color: red;transform: scale(1.1,.9)   translateY(-0); }
        30%  { color: red;transform: scale(.9,1.1)   translateY(-10px); }
        50%  { color: red;transform: scale(1.05,.95) translateY(0); }
        57%  { color: red;transform: scale(1,1)      translateY(-50); }
        64%  { color: red;transform: scale(1,1)      translateY(-4px); }
        100% { transform: scale(1,1)      translateY(0); }
    }
      }
    }
  }
}

</style>