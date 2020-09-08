<template>
  <div class="shopping-container">

    <!-- FOR DEVELOPPEMENT ONLY: USER INFORMATIONS -->
    <div>
      {{ user }}
      {{ isAuthed ? 'Logged-in' : 'Not Logged in' }} 
    </div>
  
    <v-dialog
      v-model="thanksDialog"
      max-width="320"
    >
      <template>
        <v-card>
        <v-card-title>CONFIRMATION</v-card-title>
        <v-card-text>Merci pour votre commande :)</v-card-text>
        <v-card-actions>
        </v-card-actions>
      </v-card>
      </template> 
    </v-dialog>
    <v-dialog v-model="basketIsOpen" fullscreen hide-overlay transition="dialog-bottom-transition">
        <v-card>
          <v-dialog
            v-model="orderDialogAsk"
            persistent
            max-width="320"
          >
            <template>
              <v-card>
              <v-card-title>CONFIRMATION</v-card-title>
              <v-card-text>Confirmez-vous la commande ?</v-card-text>
              <v-alert 
                v-if="errorOrderBdd"
                type="warning"
                dismissible>
                Un problème est survenu. Etes-vous connecté ?
            </v-alert>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="red" @click="orderDialogAsk = false">ANNULER</v-btn>
                <v-btn color="primary" @click="confirmOrder">CONFIRMER</v-btn>
              </v-card-actions>
            </v-card>
            </template>  
          </v-dialog>
          <v-toolbar dark color="primary">
            <v-btn icon dark @click="basketIsOpen = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-toolbar-title>Panier</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <div class="basket-cards">
            <v-alert 
              v-if="emptyBasketAlert"
              type="warning"
              dismissible>
              Votre panier est vide.
            </v-alert>
            <div class="final-price">
              <span class="sous-total">Sous-total: </span>
              <span class="total-price">{{ totalPrice }}€</span>
            </div>
            <div v-for="(item, i) in this.itemsInBasket"
              :key="i"
            >
              <items-card 
                v-if="item.added > 0"
                :item="item"
                :index="i"
                @addItem="addItem($event)"
                @removeItem="removeItem($event)"
              />
            </div>
            <v-btn @click="clear()" 
              class="clear-basket"
              color="red" 
              dark
              small
            >
              <v-icon dark left>mdi-delete</v-icon>
              Vider le panier
            </v-btn>
            <v-btn
              class="clear-basket"
              color="green" 
              dark
              small
              @click="order()"
            >
              <v-icon dark left>mdi-cart-outline</v-icon>
              Valider le panier
            </v-btn>
          </div>
          {{ emptyBasket }}
        </v-card>
      </v-dialog>
    <div class="shopping">
      <div class="left-menu">
        <category-list 
          :categories="this.categories" 
          @selectCategory="selectCategory($event)" 
        />
        <v-btn x-small @click="loginPage()">Account</v-btn>
        <v-btn x-small @click="basket()">Panier</v-btn>
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
import ItemsCard from './ItemsCard'
import Router from '../../router'
import { mapGetters, mapActions } from 'vuex'

export default {
    name: 'Shopping',
    components: {
      CategoryList,
      ItemsList,
      ItemsCard
    },
    data() {
      return {
        selectedCategory: 1,
        totalPrice: 0,
        basketIsOpen: false,
        basketIsEmpty: true,
        orderDialogAsk: false,
        loading: true,
        emptyBasketAlert: false,
        thanksDialog: false,
        itemsInBasket: [],
        errorOrderBdd: false
      }
    },
     watch: {
      itemsFetching: function(status){
        if (status.success) {
          this.loading = false
        } else if (status.error) {
          // console.log("NOT OK")
        }
      },
      createOrderStatus(status) {
        if (status.error) {
          this.errorOrderBdd = true
        } else if (status.success) {
          this.orderSucess()
        }
      }
    },
    computed: {
      ...mapGetters([
        'user',
        'items',
        'categories',
        'itemsFetching',
        'createOrderStatus',
        'isAuthed'
      ]),
      emptyBasket() {
        if (this.items) {
          for (let i = 0; i < this.items.length; i++) {
            if (this.items[i].added > 0) {
              return
            }
          }
        }
        
        return "Votre panier est vide"
      }
    },
    mounted() {
      console.log(this.user)
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
      order() {
        if (this.emptyBasket) {
          this.emptyBasketAlert = true
        } else {
          this.orderDialog()
        }
      },
      orderDialog() {
        this.orderDialogAsk = true
      },
      async confirmOrder() {
        await this.createOrder({order: this.itemsInBasket, user: this.user})
      },
      orderSucess() {
        this.orderDialogAsk = false
        this.clear()
        this.basketIsOpen = false
        this.thanksDialog = true
        setTimeout(function () {
          this.thanksDialog = false
        }.bind(this), 5000);
      },
      loginPage() {
        Router.push({ name: 'login'})
          .then(() => window.scrollTo(0, 0))
      },
      basket() {
        this.basketIsOpen = true
        this.emptyBasketAlert = false
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
    }
  }
}

.basket-cards {
  margin-top: 10px;
  .final-price {
    background-color: rgb(212, 226, 247);
    border-radius: 5px;
    margin: 6px;
    .sous-total {
      margin-left: 4px;
    }
    .total-price {
      color: red;
      margin-left: 2px;
    }
  }
  .clear-basket {
    margin-left: 6px;
  }
}


</style>