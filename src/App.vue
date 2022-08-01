<template>
  <ion-app>
    <ion-split-pane content-id="main-content">
      <ion-menu content-id="main-content" type="overlay">
        <ion-content>
          <ion-list id="inbox-list">
            <ion-list-header>Golden Shoe</ion-list-header>
            <ion-note class="signed_in_note">Hi joetest123.com</ion-note>
            <ion-menu-toggle auto-hide="false" v-for="(p, i) in appPages" :key="i">
              <ion-item @click="selectedIndex = i" router-direction="root" :router-link="p.url" lines="none" detail="false" class="hydrated" :class="{ selected: selectedIndex === i }">
                <ion-icon slot="start" :ios="p.iosIcon" :md="p.mdIcon"></ion-icon>
                <ion-label>{{ p.title }}</ion-label>
              </ion-item>
            </ion-menu-toggle>
          </ion-list>
        </ion-content>
      </ion-menu>
      <ion-router-outlet id="main-content"></ion-router-outlet>
    </ion-split-pane>
  </ion-app>
</template>

<script>
import { 
  IonApp, 
  IonContent, 
  IonIcon, 
  IonItem, 
  IonLabel, 
  IonList, 
  IonListHeader, 
  IonMenu, 
  IonMenuToggle, 
  IonNote, 
  IonRouterOutlet,
  IonSplitPane 
} from '@ionic/vue';
import { defineComponent, ref} from 'vue';
import { 
  warningOutline, 
  warningSharp ,
  home,
  informationCircle,
  cube,
  call,
  basket,
  logIn,
  people
  } from 'ionicons/icons';


export default defineComponent({
  name: 'App',
  components: {
    IonApp, 
    IonContent, 
    IonIcon, 
    IonItem, 
    IonLabel, 
    IonList, 
    IonMenu, 
    IonMenuToggle, 
    IonNote, 
    IonRouterOutlet, 
    IonSplitPane,
    IonListHeader
  },

  setup() {
    const selectedIndex = ref(0);
    const appPages = [
      {
        title: 'Home',
        url: '/',
        iosIcon: home,
        mdIcon: home
      },
      {
        title: 'Orders',
        url: '/orders',
        iosIcon: cube,
        mdIcon: cube
      },
      {
        title: 'Basket',
        url: '/basket',
        iosIcon: basket,
        mdIcon: basket
      },
      {
        title: 'Contact',
        url: '/contact',
        iosIcon: call,
        mdIcon: call
      },
      {
        title: 'About',
        url: '/about',
        iosIcon: informationCircle,
        mdIcon: informationCircle
      },
      {
        title: 'Register',
        url: '/register',
        iosIcon: people,
        mdIcon: people
      },
       {
        title: 'Login',
        url: '/login',
        iosIcon: logIn,
        mdIcon: logIn
      },

    ];
    
    const path = window.location.pathname;
    if (path !== undefined) {
      selectedIndex.value = appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }
      
    return { 
      selectedIndex,
      appPages, 
      warningOutline, 
      warningSharp ,
      home,
      informationCircle,
      cube,
      call,
      basket,
      logIn,
      people
    }
  },
});
</script>
<style>
  ion-page {
    display: block; 
  }
  ion-button {
    background-color: '#a00606' 
  }
  ion-item {
    background-color: '#a00606' 
  }
  ion-label {
    color: white;
  }
  ion-list-header {
    text-transform: uppercase;
    color: black
  }
  .signed_in_note {
    margin-left: 1.2rem;
  }
</style> 



