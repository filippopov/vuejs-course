import Vue from 'vue'
import App from './App.vue'
import VueResource from 'vue-resource'

Vue.config.productionTip = false;
Vue.use(VueResource);
Vue.http.options.root = 'https://jsonplaceholder.typicode.com';

Vue.http.interceptors.push((req, next) => {
  if (req.method === 'POST') {
    console.log(req);
  }

  next(res => console.log(res));
});

new Vue({
  render: h => h(App),
}).$mount('#app');
