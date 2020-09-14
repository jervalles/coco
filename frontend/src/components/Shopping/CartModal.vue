<template>
  <div>
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
          <v-btn icon dark @click="closeBasket()">
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
          <div>
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
        </div>
        {{ emptyBasket }}
      </v-card>
    </v-dialog>
  </div>
  
</template>

<script>
  import ItemsCard from './ItemsCard'
  import { mapGetters } from 'vuex'

  export default {
    name: 'CartModal',
    components: {
        ItemsCard
    },
    data() {
      return {
        errorOrderBdd: false,
        emptyBasketAlert: false,
        orderDialogAsk: false
      }
    },
    props: {
      basketIsOpen: Boolean,
      itemsInBasket: Array,
      totalPrice: Number,
      basketIsEmpty: Boolean
    },
    watch: {
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
        'createOrderStatus',
      ]),
      emptyBasket() {
        if (this.itemsInBasket) {
          for (let i = 0; i < this.itemsInBasket.length; i++) {
            if (this.itemsInBasket[i].added > 0) {
              return
            }
          }
        }
        return "Votre panier est vide"
      }
    },
    methods: {
      closeBasket() {
        this.$emit('close-basket')
        this.emptyBasketAlert = false
      },
      addItem(index) {
        this.$emit('add-item', index)
      },
      removeItem(index) {
        this.$emit('remove-item', index)
      },
      clear() {
        this.$emit('clear-basket')
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
        this.$emit('confirm-order')
      },
      orderSucess() {
        this.orderDialogAsk = false
        this.$emit('order-success')
      },
    }
  }

</script>

<style lang="scss">
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