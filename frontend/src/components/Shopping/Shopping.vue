<template>
  <div class="shopping-container">
    <v-dialog v-model="basketIsOpen" fullscreen hide-overlay transition="dialog-bottom-transition">
        <v-card>
          <v-toolbar dark color="primary">
            <v-btn icon dark @click="basketIsOpen = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-toolbar-title>Panier</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <div class="basket-cards">
            <div v-for="(item, i) in this.items"
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
          </div>
        </v-card>
      </v-dialog>
    <div class="shopping">
      <div class="left-menu">
        <category-list 
          :categories="categories" 
          @selectCategory="selectCategory($event)" 
        />
        <v-btn x-small @click="loginPage()">Account</v-btn>
        <v-btn x-small @click="basket()">Panier</v-btn>
      </div>
      <items-list :items="items" 
        :selectedCategory="selectedCategory"
        @addItem="addItem($event)"
        @removeItem="removeItem($event)" 
      />
    </div>
    Total: {{ totalPrice }}€
    <v-btn @click="clear()">Clear</v-btn>
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
        categories: [
          { name: 'Categorie 1' },
          { name: 'Categorie 2' },
          { name: 'Categorie 3' },
          { name: 'Categorie 4' },
          { name: 'Categorie 5' },
          { name: 'Categorie 6' },
        ],
        selectedCategory: 0,
        totalPrice: 0,
        basketIsOpen: false
      }
    },
    computed: {
    ...mapGetters([
      'user',
      'items'
    ])
    },
    mounted() {
      console.log(this.user)
      this.init()
    },
    methods: {
      ...mapActions([
			'fetchItems'
		]),
      async init() {
        await this.fetchItems()
        console.log(this.items)
      },
      selectCategory(event) {
        this.selectedCategory = event
      },
      addItem(event) {
        console.log(event)
        this.items[event].added += 1
        this.totalPrice += this.items[event].price
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
      },
      loginPage() {
        Router.push({ name: 'login'}).then(() => window.scrollTo(0, 0));
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
    }
  }
}

.basket-cards {
  margin-top: 10px;
}


</style>