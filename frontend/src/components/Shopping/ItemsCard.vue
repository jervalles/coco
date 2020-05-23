<template>
	<div id="items-card">
		<div class="image-container">
			<img class="item-image" 
				:src="require(`../../assets/items/${item.image}`)" 
				alt="Bubble Tea Picture" />
		</div>
		<div class="item-details">
			<span class="item-title">
				{{ itemName }}
			</span>
			<p>
				{{ item.description}}
			</p>
			<div class="item-bottom">
				<div class="item-price">{{ item.price }} €</div>
				<div class="add-remove-item">
					<div v-if="item.added">{{ item.added }}</div>
					<v-btn v-if="(item.added > 0)" class="mx-2"
						fab dark x-small
						color="blue"
						@click="removeItem()">
						<v-icon>mdi-minus</v-icon>
					</v-btn>
					<v-btn class="mx-2"
						fab dark x-small
						color="#FF5252"
						@click="addItem()">
						<v-icon>mdi-plus</v-icon>
					</v-btn>
				</div>
			</div>
      
		</div>
      
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
	},
	computed: {
		itemName() {
			return this.item.name.toUpperCase()
		}
	}
}

</script>

<style lang="scss">

#items-card {
	display: flex;
	flex-direction: row;
	padding-bottom: 4px;
	.image-container {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100px;
		.item-image {
			width: 80px;
			height: 80px;
			border-radius: 10px;
			border: white solid 1px;
		}
	}
	.item-details {
		width: 100%;
		display: flex;
		flex-direction: column;
		margin-left: 4px;
		.item-title {
			display: block;
			text-align: left;
			font-weight: bold;
			font-size: 12px;
		}
		p {
			font-size: 11px;
			text-align: center;
			margin-bottom: 8px;
			margin-right: 10px;
		}
		.item-bottom {
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			.item-price {
				color: #FF5252;
			}
			.add-remove-item {
				display: flex;
				button {
					height: 24px;
					width: 24px;
				}
			}
		}
	}
}

</style>