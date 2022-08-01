<template>
    <ion-page>
        <folder-page :basket-count="basketCount"></folder-page>
            <ion-item-divider class="main_container">
                <ion-label style="color: white">Product</ion-label>
            </ion-item-divider>   
            <ion-item-group v-if="product">
                <ion-item>
                    <ion-img :src="removeDoubleQuotes(product.img)"></ion-img>
                </ion-item>
                <ion-item class="selected_product_item">
                    <ion-text>
                        <p>{{product.name}}</p>
                        <p>{{formatDate(product.release_date)}}</p>
                        <p>{{product.style}}</p>
                    </ion-text>
                    <ion-text>
                        <p v-if="product.stock_left">Currenly in stock: {{product.stock_left}}</p>
                        <p v-if="!product.stock_left">Currenly out of stock</p>
                        <p>£{{product.price}}</p>
                        <p>{{product.gender}}</p>
                    </ion-text>

                </ion-item>
                 <ion-item>
                    <ion-label>Available sizes:</ion-label>
                    <ion-select v-model="selectedSize" interface="popover" placeholder="Available sizes">
                        <ion-select-option v-for="size in JSON.parse(product.sizes)" :key="size" :value="size">{{size}}</ion-select-option>
                    </ion-select>
                </ion-item>
                <ion-item>
                        <ion-button v-if="selectedSize" @click="addProductToBasket(product)" >Add to basket</ion-button>
                        <ion-text v-if="duplicateMsg">{{duplicateMsg}}</ion-text>
                        <ion-text v-else-if="successMsg">{{successMsg}}</ion-text>
                 </ion-item>
            </ion-item-group>
            <ion-item-divider>
                <ion-label>Similar products you may like</ion-label>
            </ion-item-divider>  
            <ion-item-group class="more_products" v-if="productsByCategory.length">
                <ion-item>
                    <ion-img :src="removeDoubleQuotes(productsByCategory[0].img)"></ion-img>
                    <ion-text>

                    </ion-text>
                </ion-item>
                <ion-item>
                    <ion-text>
                        <h1>{{productsByCategory[0].name}}</h1>
                    </ion-text>
                </ion-item>     
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
    IonSelect
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
    .product_img {
        margin-top: -3rem;
    }
    ion-item-divider {
        background-color: #a00606;
        color: white;
    }
    .ion-page {
        display: block;
    }
    .selected_product_item {
        display: flex;
        justify-content: space-between; 
        grid-template-columns: 1fr 1fr;
        margin-top: -3rem;
    }
    .more_products {
        display: flex; 
        justify-content: space-between;
    }
</style>