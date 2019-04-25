import Vue from 'vue'
//////////
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbvue/build/css/mdb.css';
import firebase from 'firebase';
//TIENEN QUE ESTAR ANTES DEL APP.VUE!!!!!!!!!!
import App from './App.vue'
import router from './router'
import Notifications from 'vue-notification'


Vue.config.productionTip = false;
Vue.use(Notifications);

// Initialize Firebase
const config = {
    apiKey: "AIzaSyBYMuprswO6DZ4WB9oTRAyrpH-qLDWeVSs",
    authDomain: "fran-daw.firebaseapp.com",
    databaseURL: "https://fran-daw.firebaseio.com",
    projectId: "fran-daw",
    storageBucket: "fran-daw.appspot.com",
    messagingSenderId: "982666750970"
};
firebase.initializeApp(config);

new Vue({
    router,
    render: h => h(App)
}).$mount('#app');
