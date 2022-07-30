<template>
    <ion-page>
        <folder-page></folder-page>
        <h1>Here</h1>
        <ion-content class="content" v-if="product">
            <!-- <ion-buttons style="margin-top: 7rem">
                <ion-back-button></ion-back-button>
            </ion-buttons> -->
            <!-- <ion-img>Here</ion-img> -->
            <ion-img :src="removeDoubleQuotes(product.img)"></ion-img>
            <ion-item-divider style="display: grid; grid-template-columns: 1fr; 1fr; color: black;">
                <ion-text>
                    <p>{{product.name}}</p>
                    <p>{{formatDate(product.release_date)}}</p>
                    <p>{{product.style}}</p>
                </ion-text>
                <ion-item-divider>
                    <ion-label>Available sizes</ion-label>
                    <ion-item> 
                        <ion-select v-model="selectedSize">
                        <ion-select-option v-for="size in JSON.parse(product.sizes)" :key="size" :value="size">{{size}}</ion-select-option>
                        </ion-select>
                    </ion-item>
                    <ion-text>
                        <p>{{`£${product.price}`}}</p>
                        <p v-if="product.stock_left">Currenly in stock: {{product.stock_left}}</p>
                        <p v-if="!product.stock_left">Currenly out of stock</p>
                    </ion-text>
                </ion-item-divider> 
                <ion-button v-if="selectedSize" @click="addProductToBasket(product)" >Add to basket</ion-button>
            </ion-item-divider>

             <ion-header>
                Similar products you may like:
             </ion-header>

            <ion-item-divider v-if="productsByCategory" style="display: flex; justify-content: space-between">
                <ion-item-divider style="display: grid; grid-template-columns: 1fr;" v-for="(product, index) in productsByCategory" :key="index">
                    <ion-img :src="removeDoubleQuotes(product.img)"></ion-img>
                    <ion-text>
                        <p>{{product.name}}</p>
                        <p>{{formatDate(product.release_date)}}</p>
                        <p>{{product.style}}</p>
                        <ion-button :router-link="`/product/${product.category}/${product.slug}`">See more</ion-button>
                    </ion-text>
                </ion-item-divider>
                <!-- </ion-item-divider>
                    <ion-img :src="removeDoubleQuotes(productsByCategory[1].img)"></ion-img>
                    <ion-text>
                        <p>{{productsByCategory[1].name}}</p>
                        <p>{{formatDate(productsByCategory[1].release_date)}}</p>
                        <p>{{productsByCategory[1].style}}</p>
                    </ion-text>
                <ion-item-divider> -->
            </ion-item-divider>
            
            <!-- <ion-content class="content" v-if="product"> -->


            <ion-item-group style="display: grid; grid-template-columns: 1fr; 1fr;">
                <ion-item></ion-item>
            </ion-item-group>


        </ion-content>
    </ion-page>
</template>

<script>
import { 
    IonPage, 
    IonContent, 
    IonImg, 
    IonItemGroup, 
    IonItem, 
    IonItemDivider, 
    IonText,
    IonSelect,
    IonHeader
    } from '@ionic/vue';
import axios from 'axios'

export default {
  name: 'SingleProduct',
  components: {
    IonPage,
    IonContent,
    IonItemGroup,
    IonItemDivider,
    IonHeader,
    IonImg,
    IonText,
    IonItem,
    IonSelect
    // IonBackButton,
    // IonButtons
    // FolderPage,
  },
  mounted() {
    this.selectedCategory = this.$route.params.category
    this.selectedSlug = this.$route.params.slug

    //console.log(this.$store.state.basket, 'basket')

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
      selectedSize: null,
      productsByCategory: null,
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
        this.$store._mutations['addProductToStoreBasket'][0]({product: product, size: this.selectedSize})
        //.addProductToStoreBasket(product, size)
        //this.$state.store.addProductToStoreBasket(product, size);
    }
  },

};

</script>


<style scoped>
    .content {
        padding: 2rem;
    }
    .product_img {
        margin-top: -3rem;
    }
</style>