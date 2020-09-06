!<template>
    <div class="orders-list">
        <div class="orders-list-container" v-for="(order, i) in orders" :key="i">
            <orders-card 
                :order="order"
                :index="i"
                v-on:delete-order="removeOrder(i, order.orderId)"
            />
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import OrdersCard from '../Orders/OrdersCard'

    export default {
        name: 'OrdersList',
        components: {
            OrdersCard
        },
        data() {
            return {
                
            }
        },
        computed: {
            ...mapGetters(['orders'])
        },
        mounted() {
            console.log(this.orders)
            this.init()
        },
        methods: {
            ...mapActions([
                'fetchOrders',
                'deleteOrder'
            ]),
            async init() {
                await this.fetchOrders()
            },
            async removeOrder(index, orderId) {
                await this.deleteOrder(orderId)
                this.orders.splice(index, 1)
            }
        }
    }
</script>

<style lang="scss">

    .orders-list {
        margin-top: 40px;
        padding: 0px 10px 0px 10px;
        width: 100%;
        height: auto;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        .orders-list-container {
            display: flex;
            flex-direction: row;
            width: 48%;
        }
    }

</style>