<template>
    <ion-page>
        <folder-page :basket-count="basketCount"></folder-page>
            <ion-item-divider class="main_container">
                <ion-label class="header_label">Product</ion-label>
            </ion-item-divider>   
            <ion-item-group v-if="product">
                <ion-item>
                    <ion-img :src="removeDoubleQuotes(product.img)"></ion-img>
                </ion-item>
                <ion-item class="selected_product_item">
                    <ion-text class="right_side_product">
                        <p>{{product.name}}</p>
                        <p>Release_date: {{formatDate(product.release_date)}}</p>
                        <p>Style: {{product.style}}</p>
                    </ion-text>
                    <ion-text class="left_side_product">
                        <p class="align_products_left" v-if="product.stock_left">Stock left: {{product.stock_left}}</p>
                        <p class="align_products_left" v-if="!product.stock_left">Currenly out of stock</p>
                        <p class="align_products_left">Price: £{{product.price}}</p>
                        <p class="align_products_left">Gender: {{product.gender}}</p>
                    </ion-text>
                </ion-item>
                 <ion-item>
                    <ion-label>Available sizes:</ion-label>
                    <ion-select v-model="selectedSize" interface="popover" placeholder="Available sizes">
                        <ion-select-option v-for="size in JSON.parse(product.sizes)" :key="size" :value="size">{{size}}</ion-select-option>
                    </ion-select>
                </ion-item>
                <ion-item>
                        <ion-button :class="{disable_button: !product.stock_left, active_button: product.stock_left}" v-if="selectedSize" @click="product.stock_left ? addProductToBasket(product) : null">Add to basket</ion-button>
                 </ion-item>
                 <ion-item v-if="successMsg || duplicateMsg">
                        <ion-text class="warning_msg" v-if="duplicateMsg">{{duplicateMsg}}</ion-text>
                        <ion-text class="success_msg" v-else-if="successMsg">{{successMsg}}</ion-text>
                 </ion-item>
            </ion-item-group>
            <ion-item-divider v-if="productsByCategory.length > 0">
                <ion-label class="header_label">Similar products you may like</ion-label>
            </ion-item-divider>
            <ion-item-group v-if="productsByCategory.length > 0">
                <ion-item-group v-for="(product, index) in productsByCategory" :key="index">
                    <ion-item>
                        <ion-img :src="removeDoubleQuotes(product.img)"></ion-img>
                    </ion-item>
                    <ion-item>
                        <ion-text>
                            <p>{{productsByCategory[0].name}}</p>
                            <p>Price: £{{product.price}}</p>
                        </ion-text>
                        <ion-button @click="reloadPage(product)" class="left_side_product">See more details</ion-button>
                    </ion-item>
                </ion-item-group>  
            </ion-item-group>
    </ion-page>
</template>

<script>
import { 
    IonPage, 
    IonImg, 
    IonItemGroup, 
    IonItem, 
    IonItemDivider, 
    IonText,
    IonSelect,
    } from '@ionic/vue';
import axios from 'axios'

export default {
  name: 'SingleProduct',
  components: {
    IonPage,
    IonItemGroup,
    IonItemDivider,
    IonImg,
    IonText,
    IonItem,
    IonSelect,
  },
  mounted() {
    this.selectedCategory = this.$route.params.category
    this.selectedSlug = this.$route.params.slug

    if (this.selectedCategory && this.selectedSlug) {
          axios.get(`https://ecommerce-application-joen.herokuapp.com/api/products/${this.selectedCategory}/${this.selectedSlug}`, {
          })
          .then(({data}) => {
            this.product = data[0];
            this.getSimilarProducts();
          }).catch((err) => {
            console.log(err)
        })
    }
  },
  data() {
    return {
      products: null,
      selectedCategory: null,
      selectedSlug: null,
      product: null,
      test: null,
      selectedSize: null,
      productsByCategory: [],
      duplicateMsg: '',
      successMsg: '',
      basketCount: 0,
    }
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
    reloadPage(product) {
        const path = window.location.origin;
        return window.location.href = `${path}/product/${product.category}/${product.slug}`
    },
   
    getSimilarProducts() {
        axios.get(`https://ecommerce-application-joen.herokuapp.com/api/products/${this.product.category}`, {
          })
          .then(({data}) => {
            let slicedData = data.filter((product) => {
                return product.slug !== this.selectedSlug
            }).slice(0, 2)
            this.productsByCategory = slicedData;
          }).catch((err) => {
            console.log(err)
        })
    },
    addProductToBasket(product) {
        this.duplicateMsg = '';
        this.successMsg = '';
        let duplicate = false;
        let basket = [];

        product.chosenSize = this.selectedSize;

        basket = JSON.parse(localStorage.getItem('basket')) || [];

        basket.forEach((item) => {
            if (JSON.stringify(product) === JSON.stringify(item)) {
                duplicate = true;
                this.duplicateMsg = 'Duplicate item cannot be added to your basket'
                setTimeout(() => {
                    this.duplicateMsg = ''
                }, 5000)
            }
        })
        if(!duplicate) {
            basket.push(product);
            localStorage.setItem('basket', JSON.stringify(basket));
            this.successMsg = 'Successfuly added';
            setTimeout(() => {
                this.successMsg = ''
            }, 5000)
            this.basketCount = basket.length;
        }
    }
  },

};

</script>


<style scoped>
    .main_container {
        margin-top: 5rem;
        color: black;
    }
    .content {
        padding: 2rem;
    }
    .header_label {
        color: white;
        text-transform: uppercase;
    }
    .product_img {
        margin-top: -3rem;
    }
    ion-item-divider {
        background-color: #a00606;
        color: white;
    }
    .header_label {
        text-transform: uppercase;
    }
    .ion-page {
        display: block;
        overflow-y: scroll;
    }
    .left_side_product {
        margin-left: auto;
    }
    .align_products_left {
        text-align: right;
    }
    .disable_button {
        opacity: 0.8;
        cursor: none;
    }
    .success_msg {
        color: green;
        font-size: 0.9rem
    }
    .warning_msg  {
        color: red;
        font-size: 0.9rem;
    }
    .active_button {
        margin: 0 auto;
        width: 100%;

    }
    .right_side_product {
        width: 70%;
    }
</style>