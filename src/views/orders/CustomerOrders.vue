<template>
    <ion-page>
        <folder-page></folder-page>
            <ion-item-divider class="main_container header_labels">
                <ion-label class="header_label">
                    Orders
                </ion-label>
            </ion-item-divider>
            <ion-item v-if="!orders.length">
                    <p>No orders present please view our home page to see available products</p>
            </ion-item>
            <ion-item-group v-else>
                <ion-item v-for="(order, index) in orders" :key="index"> 
                    <ion-thumbnail slot="start">
                        <ion-img :src="removeDoubleQuotes(order.img)"></ion-img>
                    </ion-thumbnail>
                    <ion-text class="thumbnail_container">
                            <h4>{{order.name}}</h4>
                            <p>Chosen size: {{order.chosen_size}}</p>
                            <p>Style: {{order.style}}</p>
                    </ion-text>
                    <ion-text class="right_order_side">
                        <p class="pending" v-if="order.status === 0">Pending</p>
                        <ion-note>{{formatOrderDate(order.issue_date)}}</ion-note>
                        <p v-if="order.delivered_date" class="arrived">Arrived</p>
                        <ion-note v-if="order.delivered_date">{{formatOrderDate(order.delivered_date)}}</ion-note>
                    </ion-text>
                </ion-item>
            </ion-item-group>
    </ion-page>
</template>


<script>
import { 
    IonPage, 
    IonItemDivider, 
    IonText, 
    IonItem,
    IonThumbnail,
    IonImg,
    IonNote
} from '@ionic/vue';

import axios from 'axios'

export default {
    name: 'CustomerOrders',
    components: {
        IonPage,
        IonItemDivider,
        IonText,
        IonItem,
        IonThumbnail,
        IonImg,
        IonNote
    },
    mounted() {
        this.authenticateUser();
    },
    data() {
        return {
            userInfo: null,
            orders: [],
            errMsg: ''
        }
    },

    methods: {
        formatOrderDate(date) {
            return this.formatDate(date)
        },
        removeImgQuotes(imgUrl) {
            return this.removeDoubleQuotes(imgUrl)
        },
        authenticateUser() {
            this.checkUserInformation().then((res) => {
                this.userInfo = res[0];
                this.getOrders();
            }).catch((err) => {
                console.log(err)
            });
        },

        getOrders() {
            if (this.userInfo) {
                axios.get(`https://ecommerce-application-joen.herokuapp.com/api/orders/${this.userInfo.id}`)
                .then((res) => {
                    this.orders = res.data;
                }).catch((err) => {
                    this.errMsg = err.msg
                })
            }
        }
    },  
}
</script>

<style scoped>
    .main_container {
        margin-top: 5rem;
        color: white;
    }
    .ion-page {
        display: block;
        overflow-y: scroll;
    }
    .header_labels {
        background-color: #a00606;
        color: white;
    }
    :host {
        min-height: 0px;
    }
    .header_label {
        text-transform: uppercase;
        font-size: 1.2rem;
        padding: 0.2rem
    }
    p {
        margin-top: 0.2rem;
        margin-bottom: 0.2rem;
    }
    .right_order_side {
        margin-left: auto
    }
    .pending {
        color: #a00606
    }
    .arrived {
        color: green
    }
</style>