<template>
  <div class="container">
    <div class="shopping">
      <category-list 
        :categories="categories" 
        @selectCategory="selectCategory($event)" 
      />
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
        items: [
          {
            name: 'Le classique',
            category: 1,
            price: 5,
            added: 0
          },
          {
            name: 'Le fresh juice',
            category: 1,
            price: 4,
            added: 0
          },
          {
            name: 'nom3',
            category: 2,
            price: 4,
            added: 0
          },
          {
            name: 'nom4',
            category: 3,
            price: 5.50,
            added: 0
          },
          {
            name: 'nom5',
            category: 4,
            price: 5,
            added: 0
          },
          {
            name: 'nom6',
            category: 5,
            price: 5,
            added: 0
          },
          {
            name: 'nom7',
            category: 5,
            price: 7,
            added: 0
          },
        ]
      }
    },
    methods: {
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
      }
    }
}

</script>

<style lang="scss">
.container {
  position: absolute;
  top: 440px;
  .shopping {
    position: relative;
    justify-content: center;
    width: 100%;
    height: auto;
    
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
}

</style>