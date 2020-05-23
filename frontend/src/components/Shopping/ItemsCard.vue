<template>
	<div id="items-card">
      {{ item.name }} / {{ item.price}}€
      <v-btn rounded @click="addItem()">+</v-btn>
      <v-btn rounded @click="removeItem()">-</v-btn>
      <div>{{ item.added }}</div>
  </div>
</template>

<script>

export default {
  name: 'ItemsCard',
	data() {
		return {

		}
	},
	props: {
		item: Object,
		index: Number
	},
	methods: {
    addItem() {
			this.$emit('addItem', this.index)
    },
    removeItem() {
      this.$emit('removeItem', this.index)
    }
  }
}

</script>

<style lang="scss">

#items-card {

}

</style>