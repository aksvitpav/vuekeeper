import '@fortawesome/fontawesome-free/css/all.min.css'
import 'bootstrap-css-only/css/bootstrap.min.css'
import 'mdbvue/lib/css/mdb.min.css'
import Vue from 'vue'
import App from './App.vue'
//Register VueFire
import { firestorePlugin } from 'vuefire'
Vue.use(firestorePlugin)
//Register MDBootstrap Components
import * as mdbvue from 'mdbvue'
for (const component in mdbvue) {
  Vue.component(component, mdbvue[component])
}

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
