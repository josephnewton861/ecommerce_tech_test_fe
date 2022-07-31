import { createApp } from 'vue'
import App from './App.vue'
import router from './router';

import { IonicVue } from '@ionic/vue';

/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/vue/css/padding.css';
import '@ionic/vue/css/float-elements.css';
import '@ionic/vue/css/text-alignment.css';
import '@ionic/vue/css/text-transformation.css';
import '@ionic/vue/css/flex-utils.css';
import '@ionic/vue/css/display.css';
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import {fas} from '@fortawesome/free-solid-svg-icons'
library.add(fas);

import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);


import FolderPage from './views/FolderPage'

// import {useCounterStore} from './store/basket'

// const store = useCounterStore();

// const pinia = createPinia(store);

// import useCounterStore from './store/basket'

// const pinia = createPinia(useCounterStore);

// import store from './store/basket'
// removeDoubleQuotes(imgUrl) {
//   return imgUrl.replace(/['"]+/g, '');
// },
// cosnt formatDate = (date) => {
//      let month = date.getMonth() + 1;
//       if (month < 10) {
//           month = `0${month}`
//       }
//       let year = date.getFullYear()
//       let newDate = date.getDate();
//       return `${year}-${month}-${newDate}`
// }

/* Theme variables */
import './theme/variables.css';

const app = createApp(App)
  .use(IonicVue)
  .use(router)
  .use(pinia)
  //.use(store)

  .component('fa', FontAwesomeIcon)

  app.component('folder-page', FolderPage)
router.isReady().then(() => {
  app.mount('#app');
});