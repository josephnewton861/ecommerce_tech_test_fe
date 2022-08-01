<template>
    <ion-page>
        <ion-header>
            
        </ion-header>
        <h1>Here</h1>
    </ion-page>
</template>

<script>
import { IonPage, IonHeader } from '@ionic/vue';
import axios from 'axios'

export default {
  name: 'SingleProduct',
  components: {
    IonPage,
    IonHeader
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

};
