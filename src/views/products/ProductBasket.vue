<template>
    <ion-page>
        <folder-page :basket-count="basketCount"></folder-page>
            <ion-item-divider class="main_container header_labels">
                <ion-label class="header_label">
                    Shopping cart
                </ion-label>
            </ion-item-divider>
            <ion-item v-if="!basketCount">
                <p>No Items in basket please return to the products page to add products</p>
            </ion-item>
            <ion-item v-if="userInfo">
                <ion-text>
                    <h4>Delivery Information</h4>
                    <p>Address: {{userInfo.address}}</p>
                    <p>Postcode: {{userInfo.postcode}}</p>
                </ion-text>
            </ion-item>
            <ion-item v-for="(product, index) in productsInBasket" :key="index"> 
                <ion-thumbnail slot="start">
                    <ion-img :src="removeDoubleQuotes(product.img)"></ion-img>
                </ion-thumbnail>
                <ion-text class="thumbnail_container">
                        <h4>{{product.name}}</h4>
                        <p>Chosen size: {{product.chosenSize}}</p>
                        <p>Style: {{product.style}}</p>
                        <p>Price: £{{product.price}}</p>
                </ion-text>
                <ion-button @click="removeBasketItem(index)" color="danger" slot="end"><fa icon="times"></fa></ion-button>
            </ion-item>
            <ion-item-divider class="button_divider">
                <ion-button class="checkout_button" router-link="/register" v-if="basketTotal" @click="addOrder()">Checkout £{{basketTotal}}</ion-button>
            </ion-item-divider>
            <ion-alert
                :is-open="alert"
                class="ionic_alert"
                header="Alert"
                message="Order Confirmed"
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
            this.basketCount = basket.length;
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
                this.updateStockLeft(productIds);
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
        },
        updateStockLeft(productIds) {
            axios.patch(`https://ecommerce-application-joen.herokuapp.com/api/products`, {
                product_ids: productIds
            }).then(() => {

            }).catch((err) => {
                console.log(err)
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
        color: white;
    }
    .ion-page {
        display: block;
    }
    .header_labels {
        background-color: #a00606;
        color: white;
    }
    .button_divider {
        background-color: transparent;
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
    .checkout_button {
        font-size: 0.9rem;
        padding: 0.2rem;
        margin-top: 1rem;
        margin: 0 auto;
        width: 80%;
    }
    .ionic_alert .alert_wrapper {
        --background: white;
    }
</style>