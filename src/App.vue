<template>
  <ion-app>
    <!-- <home-page></home-page> -->
    <!-- <folder-page></folder-page> -->
    <ion-split-pane content-id="main-content">
      <ion-menu content-id="main-content" type="overlay">
        <ion-content>
          <ion-list id="inbox-list">
            <ion-list-header>Golden Shoe</ion-list-header>
            <ion-note>Hi joetest123.com</ion-note>
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
import { IonApp, IonContent, IonIcon, IonItem, IonLabel, IonList, IonListHeader, IonMenu, IonMenuToggle, IonNote, IonRouterOutlet, IonSplitPane } from '@ionic/vue';
import { defineComponent, ref} from 'vue';
//import { useRoute } from 'vue-router';
import { archiveOutline, archiveSharp, bookmarkOutline, bookmarkSharp, heartOutline, heartSharp, mailOutline, mailSharp, paperPlaneOutline, paperPlaneSharp, trashOutline, trashSharp, warningOutline, warningSharp } from 'ionicons/icons';


export default defineComponent({
  name: 'App',
  components: {
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
    IonSplitPane,
  },

  setup() {
    const selectedIndex = ref(0);
    const appPages = [
      {
        title: 'Home',
        url: '/',
        iosIcon: mailOutline,
        mdIcon: mailSharp
      },
      {
        title: 'About',
        url: '/about',
        iosIcon: paperPlaneOutline,
        mdIcon: paperPlaneSharp
      },
      {
        title: 'Orders',
        url: '/orders',
        iosIcon: heartOutline,
        mdIcon: heartSharp
      },
      {
        title: 'Contact',
        url: '/contact',
        iosIcon: archiveOutline,
        mdIcon: archiveSharp
      },
      {
        title: 'Basket',
        url: '/basket',
        iosIcon: archiveOutline,
        mdIcon: archiveSharp
      },
      {
        title: 'Register',
        url: '/register',
        iosIcon: archiveOutline,
        mdIcon: archiveSharp
      },
       {
        title: 'Login',
        url: '/login',
        iosIcon: archiveOutline,
        mdIcon: archiveSharp
      },

    ];
   // const labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
    
    const path = window.location.pathname;
    // console.log(path, 'path')
    if (path !== undefined) {
      selectedIndex.value = appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }
    
    //const route = useRoute();
    
    return { 
      selectedIndex,
      appPages, 
      archiveOutline, 
      archiveSharp, 
      bookmarkOutline, 
      bookmarkSharp, 
      heartOutline, 
      heartSharp, 
      mailOutline, 
      mailSharp, 
      paperPlaneOutline, 
      paperPlaneSharp, 
      trashOutline, 
      trashSharp, 
      warningOutline, 
      warningSharp,
      //isSelected: (url: string) => url === route.path ? 'selected' : ''
    }
  },
});
</script>
<style scoped>
  ion-page {
    display: block; 
  }
  ion-button {
    background-color: '#a00606' 
  }
  ion-item {
    background-color: '#a00606' 
  }
/* :host {
  background-color: transparent;
  color: black;
  --padding-start: 10px;
  --inner-padding-end: 10px;
} */
</style> 



