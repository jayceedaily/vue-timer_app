import Vue from 'vue'
import App from './App.vue'

import 'materialize-css';
import 'materialize-css/dist/css/materialize.css';

import moment from 'moment';

window.moment = moment;

Vue.use('moment', moment);

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
