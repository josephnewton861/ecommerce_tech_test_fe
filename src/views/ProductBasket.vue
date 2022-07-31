<template>
    <ion-page>
        <folder-page :basket-count="basketCount"></folder-page>
            <ion-item-divider class="main_container">
                <ion-text v-if="!productsInBasket.length">
                    <p>No Items in basket</p>
                </ion-text>
            </ion-item-divider>
            <ion-item-divider>
                <ion-label>
                    Shooping cart:
                </ion-label>
            </ion-item-divider>
            <ion-item v-for="(product, index) in productsInBasket" :key="index"> 
                <ion-thumbnail slot="start">
                    <ion-img :src="removeDoubleQuotes(product.img)"></ion-img>
                </ion-thumbnail>
                <ion-text style="display: flex; justify-content: space-between;">
                        <h3>{{product.name}}</h3>
                        <p>{{product.name}}</p>
                </ion-text>
                <ion-button @click="removeBasketItem(index)" color="danger" slot="end"><fa icon="times"></fa></ion-button>
            </ion-item>
            <ion-button router-link="/register" v-if="basketTotal">Checkout £{{basketTotal}}</ion-button>
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

export default {
    name: 'ProductBasket',
    components: {
        IonPage,
        IonItemDivider,
        IonText,
        IonItem,
        IonThumbnail,
        IonImg,
    },

    data() {
        return {
            productsInBasket: [],
            basketCount: null,
            user: false,
        }
    },
    mounted() {
        let basket = JSON.parse(localStorage.getItem('basket'));
        this.productsInBasket = basket
        // this.productsInBasket = basket;
        this.basketCount = basket.length;
        // this.productsInBasket = this.$store.state.basket;
    //    this.productsInBasket = this.$store._getters['getBasket'][0];
    },
    methods: {
        removeDoubleQuotes(imgUrl) {
            return imgUrl.replace(/['"]+/g, '');
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
            console.log(index);
            let basket = JSON.parse(localStorage.getItem('basket'));
            basket.splice(index, 1)
            this.productsInBasket = basket;
            localStorage.setItem('basket', JSON.stringify(basket));


            // console.log(product, 'hereeeeee')
            // let index = productsInBasket.findIndex((obj) => {
            //     if
            // }
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
</style>