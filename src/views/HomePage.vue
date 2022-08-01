<template>
  <ion-page>
    <folder-page></folder-page>
      <touch-slider class="page_container" :format-products-by-category="formatProductsByCategory"></touch-slider>
  </ion-page>
</template>

<script>
import { IonPage } from '@ionic/vue';
import TouchSlider from './products/TouchSlider';
import axios from "axios";

export default {
  name: 'HomePage',
  components: {
    IonPage,
    TouchSlider,    
  },
  data() {
    return {
      products: null,
    }
  },
  mounted() {
      axios.get("https://ecommerce-application-joen.herokuapp.com/api/products/", {
      })
      .then(({data}) => {
        this.products = data;
      }).catch((err) => {
        console.log(err)
      })
  },
  computed: {
    formatProductsByCategory() {
      let categories = {};

      if (this.products) {
        this.products.forEach((product) => {
          if (Object.keys(categories) !== product.category) {
            categories[product.category] = [];
          }
        })
        this.products.forEach((item) => {
          categories[item.category].push(item)
        })
        return categories;
      }
      return null;
    }
  }
};
</script>

<style scoped>
#container {
  text-align: center;
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}
.ion-page {
  z-index: auto;
}

#container strong {
  font-size: 20px;
  line-height: 26px;
}

#container p {
  font-size: 16px;
  line-height: 22px;
  color: #8c8c8c;
  margin: 0;
}

#container a {
  text-decoration: none;
}
.page_container {
  margin-top: 5rem;
  padding: 0.5rem;
}
</style>
