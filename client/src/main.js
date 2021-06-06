import Vue from 'vue';
import App from './App.vue';
import store from './store';
import { BootstrapVue } from 'bootstrap-vue';
import VueSocketIo from 'vue-socket.io-extended';
import io from 'socket.io-client';
import { ObserveVisibility } from 'vue-observe-visibility';

import './vee-validate';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/styles/template.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

const socket = io({
  autoConnect: false,
});

Vue.config.productionTip = false;

export const eventBus = new Vue();

Vue.use(BootstrapVue);
Vue.use(VueSocketIo, socket, { store });
Vue.directive('observe-visibility', ObserveVisibility);

new Vue({
  store,
  render: (h) => h(App),
}).$mount('#app');
