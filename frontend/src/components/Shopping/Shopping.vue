<template>
  <div class="shopping-container">

    <v-dialog v-model="basketIsOpen" fullscreen hide-overlay transition="dialog-bottom-transition">
        <template v-slot:activator="{ on }">
          <v-btn color="primary" dark v-on="on">Open Dialog</v-btn>
        </template>
        <v-card>
          <v-toolbar dark color="primary">
            <v-btn icon dark @click="basketIsOpen = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-toolbar-title>Settings</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
              <v-btn dark text @click="dialog = false">Save</v-btn>
            </v-toolbar-items>
          </v-toolbar>
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
import Router from '../../router'
import { mapGetters, mapActions } from 'vuex'

export default {
    name: 'Shopping',
    components: {
      CategoryList,
      ItemsList
    },
    data() {
      return {
        categories: [
          { name: 'Tous les Cocos' },
          { name: 'Categorie 2' },
          { name: 'Categorie 3' },
          { name: 'Categorie 4' },
          { name: 'Categorie 5' },
          { name: 'Categorie 6' },
        ],
        selectedCategory: 0,
        totalPrice: 0,
        basketIsOpen: false,
        items: [
          {
            name: 'Le classique',
            category: 1,
            price: 5,
            added: 0,
            description: 'Thé Jasmin sucré au lait avec ses perles tendres !',
            image: 'classic-tea.jpg'
          },
          {
            name: 'Le fresh juice',
            category: 1,
            price: 4,
            added: 0,
            description: 'Boisson fraiche aux fruits exotiques !',
            image: 'classic-tea.jpg'
          },
          {
            name: 'Le fresh juice',
            category: 1,
            price: 4,
            added: 0,
            description: 'Boisson fraiche aux fruits exotiques !',
            image: 'classic-tea.jpg'
          },
          {
            name: 'Le fresh juice',
            category: 1,
            price: 4,
            added: 0,
            description: 'Boisson fraiche aux fruits exotiques !',
            image: 'classic-tea.jpg'
          },
          {
            name: 'Le fresh juice',
            category: 1,
            price: 4,
            added: 0,
            description: 'Boisson fraiche aux fruits exotiques !',
            image: 'classic-tea.jpg'
          },
          {
            name: 'Le fresh juice',
            category: 1,
            price: 4,
            added: 0,
            description: 'Boisson fraiche aux fruits exotiques !',
            image: 'classic-tea.jpg'
          },
          {
            name: 'Le fresh juice',
            category: 1,
            price: 4,
            added: 0,
            description: 'Boisson fraiche aux fruits exotiques !',
            image: 'classic-tea.jpg'
          },
          {
            name: 'Le Panplemous',
            category: 2,
            price: 4,
            added: 0,
            description: "Lorem ipsum dolor sit amet consectetur adipisicing",
            image: 'panplemous-tea.jpg'
          },
          {
            name: 'Fruits de la Passion',
            category: 3,
            price: 5.50,
            added: 0,
            description: "Lorem ipsum dolor sit amet consectetur adipisicing",
            image: 'passion-tea.jpg'
          },
          {
            name: 'nom5',
            category: 4,
            price: 5,
            added: 0,
            description: "Lorem ipsum dolor sit amet consectetur adipisicing",
            image: 'passion-tea.jpg'
          },
          {
            name: 'nom6',
            category: 5,
            price: 5,
            added: 0,
            description: "Lorem ipsum dolor sit amet consectetur adipisicing",
            image: 'passion-tea.jpg'
          },
          {
            name: 'nom7',
            category: 5,
            price: 7,
            added: 0,
            description: "Lorem ipsum dolor sit amet consectetur adipisicing",
            image: 'passion-tea.jpg'
          },
        ]
      }
    },
    computed: {
    ...mapGetters([
      'user'
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
      },
      selectCategory(event) {
        this.selectedCategory = event
      },
      addItem(event) {
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
  position: absolute;
  top: 450px;
  padding: 0px;
  margin: 0px;
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

</style>