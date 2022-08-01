<template>
  <ion-page>
    <ion-content v-if="formatProductsByCategory">
      <ion-tem-divider class="category_buttons">
        <ion-button :class="{active_button: category === selectedCategory, unactive_button: category !== selectedCategory}" @click="getProductsByCategory(category)" v-for="(category) in getCategories" :key="category">{{category.toUpperCase()}}</ion-button>
      </ion-tem-divider>
      <ion-list class="list_item">
        <ion-item>
            <ion-label>Sort By:</ion-label>
            <ion-select interface="popover" placeholder="Select fruit">
              <IonSelectOption value="release_date">Release date</IonSelectOption>
              <IonSelectOption value="price">Price</IonSelectOption>
            </ion-select>
          </ion-item>
        <ion-item>
            <ion-label>Gender:</ion-label>
            <ion-select interface="popover" placeholder="Select fruit">
              <IonSelectOption value="women">Women</IonSelectOption>
              <IonSelectOption value="men">Men</IonSelectOption>
            </ion-select>
          </ion-item>
      </ion-list>
      <div v-if="selectedCategory === 'All'">
        <div v-for="(category) in Object.keys(formatProductsByCategory)" :key="category">
          <ion-item-divider>
            <ion-label>{{category.toUpperCase()}}</ion-label>
          </ion-item-divider>
          <swiper>
            <swiper-slide v-for="(product, index) in formatProductsByCategory[category]" :key="index">
              <section class="product_card">
                <ion-img class="product_img" :src="removeDoubleQuotes(product.img)"></ion-img>
                <div class="swiper_container">
                  <div>
                    <p>{{formatDate(product.release_date)}}</p>
                    <h3>{{product.name}}</h3>
                    <p>{{product.style}}</p>
                  </div>
                  <div style="display: grid; grid-template-columns: 1fr 1fr;">
                    <div>
                      <h3>Retail</h3>
                      <p>{{`£${product.price}`}}</p>
                    </div>
                    <div>
                      <ion-button :router-link="`/product/${product.category}/${product.slug}`">See more</ion-button>
                    </div>
                  </div>
                </div>
              </section>
            </swiper-slide>
            <swiper-slide  v-for="(product, index) in formatProductsByCategory[category]" :key="index">{{product.name}}</swiper-slide>
          </swiper>
        </div>
      </div>
      <div v-else>
        <ion-item-divider>
            <ion-label>{{selectedCategory.toUpperCase()}}</ion-label>
        </ion-item-divider>
        <div v-for="product in individualCategoryData" :key="product">
          <section class="product_card">
                <ion-img class="product_img" :src="removeDoubleQuotes(product.img)"></ion-img>
                <div style="display: grid; grid-template-columns: 1fr 1fr; ">
                  <div>
                    <p>{{formatDate(product.release_date)}}</p>
                    <h3>{{product.name}}</h3>
                    <p>{{product.style}}</p>
                  </div>
                  <div style="display: grid; grid-template-columns: 1fr 1fr;">
                    <div>
                      <h3>Retail</h3>
                      <p>{{`£${product.price}`}}</p>
                    </div>
                    <div>
                      <ion-button :router-link="`/product/${product.category}/${product.slug}`">See more</ion-button>
                    </div>
                  </div>
                </div>
              </section>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
  import { defineComponent } from 'vue';
  import { Swiper, SwiperSlide } from 'swiper/vue';
  import { IonContent, 
  IonPage, 
  IonButton,  
  IonImg,
  IonLabel,
  IonItem,
  IonList,
  IonSelectOption
  } from '@ionic/vue';
  import axios from 'axios'
  import 'swiper/css';
  import '@ionic/vue/css/ionic-swiper.css';

  export default defineComponent({
    components: {
      Swiper,
      SwiperSlide,
      IonContent,
      IonPage,
      IonButton,
      IonLabel,
      IonImg,
      IonItem,
      IonList,
      IonSelectOption
    },
    data() {
      return {
        individualCategoryData: null,
        selectedCategory: 'All',
        categories: [],
      }
    },
    props: ['formatProductsByCategory'],
    methods: {
      getProductsByCategory(category) {
        if (category !== 'All') {
          axios.get(`https://ecommerce-application-joen.herokuapp.com/api/products/${category}`, {
            })
            .then(({data}) => {
              this.individualCategoryData = data;
            }).catch((err) => {
              console.log(err)
          })
          this.selectedCategory = category;

        } 
        this.selectedCategory = category;
        return null
      },
    },
    computed: {
      getCategories() {
          if (this.formatProductsByCategory) {
            let categories = Object.keys(this.formatProductsByCategory)
            categories.unshift('All')
            return categories;
          }
          return null;
      }
    }
  });
</script>

<style scoped>
  .category_header {
    padding-left: 0.5rem;
    padding-top: 1rem;
    margin-top: 1rem;
  }
  ion-item-divider {
    background-color: #a00606;
  }
  ion-page {
    display: block;
  }
  .product_card {
    
  }
  .category_buttons {
    display: flex;
    overflow-x: scroll;
    font-size: 1rem;
    margin-bottom: 1rem;

  }
  .product_img {
    height: 80%;
    width: 80%;
    margin: 0 auto;
  }
  ion-button {
    font-size: 0.8rem;
    transition: all 0.3s ease-in-out;

  }
  .active_button {
    transform: scale(1.2);
  }
  .unactive_button {
    opacity: 0.8;
  }
  .list_item {
    display: flex; 
    margin-bottom: 1rem;
  }
  .swipper_container {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
</style>