<template>
  <ion-page>
    <ion-content v-if="formatProductsByCategory">
      <div v-for="(category) in Object.keys(formatProductsByCategory)" :key="category">
        <h1 class="category_header">{{category.toUpperCase()}}</h1>
        <swiper>
          <swiper-slide v-for="(product, index) in formatProductsByCategory[category].slice(0, 3)" :key="index">
            
            <section class="product_card">
              <ion-img class="product_img" :src="removeDoubleQuotes(product.img)"></ion-img>
              <div style="display: grid; grid-template-columns: 1fr 1fr; ">
                <div>
                  <h3>{{product.name}}</h3>
                </div>
                <div>
                  <p>{{product.release_date}}</p>
                </div>
              </div>
              <!-- <h1>{{product.name}}</h1> -->
            </section>
            
          </swiper-slide>
          <swiper-slide  v-for="(product, index) in formatProductsByCategory[category].slice(3, 6)" :key="index">{{product.name}}</swiper-slide>
          <!-- <swiper-slide>{{category}}</swiper-slide>  -->
        </swiper>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
  import { defineComponent } from 'vue';
  import { Swiper, SwiperSlide } from 'swiper/vue';
  import { IonContent, IonPage } from '@ionic/vue';

  import 'swiper/css';
  import '@ionic/vue/css/ionic-swiper.css';

  export default defineComponent({
    components: {
      Swiper,
      SwiperSlide,
      IonContent,
      IonPage,
    },
    props: ['formatProductsByCategory'],
    methods: {
      removeDoubleQuotes(imgUrl) {
        return imgUrl.replace(/['"]+/g, '');
      }
    }
  });
</script>

<style scoped>
  .category_header {
    padding: 2rem;
  }
  .product_card {
    
  }
  .product_img {
    height: 80%;
    width: 80%;
    margin: 0 auto;
  }
</style>