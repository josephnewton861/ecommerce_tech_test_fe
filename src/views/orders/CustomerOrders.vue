<template>
    <ion-page>
        <folder-page></folder-page>
        <ion-item-divider v-if="!orders.length" class="main_container no_colour">
            <ion-text class="">
                <p>No orders present please view our home page to see available products</p>
            </ion-text>
        </ion-item-divider>
        <ion-item-divider v-if="orders.length > 0" class="main_container">
            <ion-label>
                Orders
            </ion-label>
        </ion-item-divider>
        <ion-item v-for="(order, index) in orders" :key="index"> 
            <ion-thumbnail slot="start">
                <ion-img :src="removeImgQuotes(order.img)"></ion-img>
            </ion-thumbnail>
            <ion-text class="thumbnail_container">
                    <h3>{{order.name}}</h3>
                    <p>{{order.style}}</p>
                    <p>{{order.style}}</p>
                    <p>£{{order.price}}</p>
            </ion-text>
            <ion-text>
                <h3>{{formatOrderDate(order.issue_date)}}</h3>
                <p v-if="order.delivered_date">{{order.deliveredDate}}</p>
                <p v-if="order.status === 0">Pending</p>
                <p v-else>Arrived</p>
            </ion-text>
        </ion-item>
    </ion-page>
</template>


<script>
import { 
    IonPage, 
    IonItemDivider, 
    IonText, 
    IonItem,
    IonThumbnail,
    IonImg
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
.ion-page {
    display: block;
}

.page_container {
  margin-top: 5rem;
  padding: 0.5rem;
}
    .main_container {
        margin-top: 5rem;
        color: black;
    }
ion-item-divider {
    background-color: #a00606;
  }
  .no_colour {
      background-color: transparent
  }

  
  .ion-label {
      color: white;
  }
  .thumbnail_container {
      display: flex; 
      justify-content: space-between
  }
</style>