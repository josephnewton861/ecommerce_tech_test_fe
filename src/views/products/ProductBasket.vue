<template>
    <ion-page>
        <folder-page :basket-count="basketCount"></folder-page>
            <ion-item-divider class="main_container">
                <ion-label>
                    Shopping cart:
                </ion-label>
            </ion-item-divider>
            <ion-item v-if="!basketCount">
                <p>No Items in basket please return to the products page to add products</p>
            </ion-item>
            <ion-item v-for="(product, index) in productsInBasket" :key="index"> 
                <ion-thumbnail slot="start">
                    <ion-img :src="removeDoubleQuotes(product.img)"></ion-img>
                </ion-thumbnail>
                <ion-text class="thumbnail_container">
                        <h3>{{product.name}}</h3>
                        <p>{{product.name}}</p>
                </ion-text>
                <ion-button @click="removeBasketItem(index)" color="danger" slot="end"><fa icon="times"></fa></ion-button>
            </ion-item>
            <ion-button router-link="/register" v-if="basketTotal" @click="addOrder()">Checkout £{{basketTotal}}</ion-button>
            <ion-alert
                :is-open="alert"
                header="Alert"
                sub-header="Important message"
                message="This is an alert!"
                :buttons="['OK']"
                @didDismiss="setOpen(false)"
            ></ion-alert>
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
    IonAlert
} from '@ionic/vue';

import axios from 'axios';

export default {
    name: 'ProductBasket',
    components: {
        IonPage,
        IonItemDivider,
        IonText,
        IonItem,
        IonThumbnail,
        IonImg,
        IonAlert
    },

    data() {
        return {
            productsInBasket: [],
            basketCount: null,
            userInfo: null,
            errMsg: null,
            alert: false,
        }
    },
    mounted() {
        this.authenticateUser();
        let basket = JSON.parse(localStorage.getItem('basket')) || 0;
        this.productsInBasket = basket
        this.basketCount = basket.length;
    },
    methods: {
        removeDoubleQuotes(imgUrl) {
            return imgUrl.replace(/['"]+/g, '');
        },
        authenticateUser() {
            this.checkUserInformation().then((res) => {
                this.userInfo = res[0];
            }).catch((err) => {
                console.log(err)
            });
        },
        formatDate(date) {
            let newDate = new Date(date);
            let options = {
                month: "short",
                day: "numeric",
                year: "numeric",
            };
            let formattedDate = newDate.toLocaleDateString("en", options)

            return formattedDate
        },
        removeBasketItem(index) {
            let basket = JSON.parse(localStorage.getItem('basket'));
            basket.splice(index, 1)
            this.productsInBasket = basket;
            localStorage.setItem('basket', JSON.stringify(basket));
        },
        addOrder() {
            let basket = JSON.parse(localStorage.getItem('basket'));

            let productIds = []
            let sizes = []

            basket.forEach((product) => {
                productIds.push(product.id)
                sizes.push(product.chosenSize)
            })

            axios.post(`https://ecommerce-application-joen.herokuapp.com/api/orders/${this.userInfo.id}`, {
                product_ids: productIds,
                sizes: sizes
            }).then(() => {
                this.productsInBasket = [];
                this.basketCount = 0;
                localStorage.clear()
                this.alert = true;
                setTimeout(() => {
                    this.alert = false;
                }, 5000)
            }).catch((err) => {
                this.errMsg = err.msg;
            })
        }
    },
    computed: {
        basketTotal() {
            let prices = [];
            if (this.productsInBasket) {
                this.productsInBasket.forEach((product) => {
                    prices.push(product.price)
                })
                const totalPrice = prices.reduce(function(previousValue, currentValue){
                    return previousValue + currentValue;
                }, 0);
                return totalPrice;
            }
            return 0;
        }
    }
}
</script>

<style scoped>
    .main_container {
        margin-top: 5rem;
        color: black;
    }
    .ion-page {
        display: block;
    }
    ion-item-divider {
        background-color: #a00606;
        color: white
    }
    :host {
        min-height: 0px;
    }
    .thumbnail_container {
        display: flex; 
        justify-content: space-between;
    }
</style>