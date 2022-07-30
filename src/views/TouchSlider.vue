<template>
  <ion-page>
    <folder-page></folder-page>
    <ion-content v-if="formatProductsByCategory">
      <div v-for="(category) in Object.keys(formatProductsByCategory)" :key="category">
        <h1 class="category_header">{{category.toUpperCase()}}</h1>
        <swiper>
          <swiper-slide v-for="(product, index) in formatProductsByCategory[category].slice(0, 3)" :key="index">
            
            <section class="product_card">
              <ion-img class="product_img" :src="removeDoubleQuotes(product.img)"></ion-img>
              <div style="display: grid; grid-template-columns: 1fr 1fr; ">
                <div>
                  <p>{{formatDate(product.release_date)}}</p>
                  <h3>{{product.name}}</h3>
                  <p>{{product.style}}</p>
                </div>
                <div style="display: grid; grid-template-columns: 1fr 1fr; ">
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
  import { IonContent, IonPage, IonButton } from '@ionic/vue';
  //import { useRouter } from 'vue-router';

  import 'swiper/css';
  import '@ionic/vue/css/ionic-swiper.css';

  export default defineComponent({
    components: {
      Swiper,
      SwiperSlide,
      IonContent,
      IonPage,
      IonButton
    },
    props: ['formatProductsByCategory'],
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
      }
    },
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