<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar class="toolbar">
          <ion-item-divider>
            <ion-buttons slot="start">
              <ion-menu-button color="dark"></ion-menu-button>
            </ion-buttons>
            <ion-header class="company_name">GOLDEN SHOE
              <fa class="prints" icon="shoe-prints"></fa>
            </ion-header>
            <fa :router-link="`/basket`" class="basket" icon="basket-shopping"></fa>
            <ion-text>
              <p>{{basketLength}}</p>
            </ion-text>
            <fa class="user" icon="user"></fa>
          </ion-item-divider>
      </ion-toolbar>
    </ion-header>
    
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">{{ $route.params.id }}</ion-title>
        </ion-toolbar>
      </ion-header>
    </ion-content>
  </ion-page>
</template>

<script>
import { defineComponent } from 'vue';
import { IonButtons, IonContent, IonText, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonItemDivider } from '@ionic/vue';

export default defineComponent({
  name: 'FolderPage',
  props: ['basketCount'],
  components: {
    IonButtons,
    IonContent,
    IonHeader,
    IonMenuButton,
    IonPage,
    IonItemDivider,
    IonTitle,
    IonToolbar,
    IonText
  }, 
  computed: {
    basketLength() {
      if (!this.basketCount) {
        let basket = [];
        basket = JSON.parse(localStorage.getItem('basket')) || [];
        return basket.length;
      }
      return this.basketCount;
    }
  }
});
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

:host(.ion-color) .button-native {
  color: black;
  font-size: 3rem;
}
.button-inner {
  font-size: 2rem;
  color: black
}
.toolbar {
  background-color: #a00606;
  display: flex;
  justify-content: space-between;
  
}
.company_name {
  opacity: 1;
  color: goldenrod;
  font-family: ui-monospace;
}
.basket {
  font-size: 1.5rem;
  margin-right: 0.2rem;
  cursor: pointer;
}
.user {
  font-size: 1.5rem;
  margin-left: 0.5rem;
}
.prints {
  color: gold
}
ion-item-divider {
  background-color: transparent; 
}
</style>
