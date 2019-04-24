import Vue from 'vue'
//////////
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbvue/build/css/mdb.css';
//TIENEN QUE ESTAR ANTES DEL APP.VUE!!!!!!!!!!
import App from './App.vue'
import router from './router'
import firebase from 'firebase';

Vue.config.productionTip = false;

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
    render: div => div(App)
}).$mount('#app');
