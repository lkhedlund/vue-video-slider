import '@fancyapps/fancybox';
import '@fancyapps/fancybox/dist/jquery.fancybox.min.css';

// Vue
import Vue from 'vue';
import App from './App.vue';
import store from './store';

/* eslint-disable no-new */
if (document.getElementById("video-app")) {
    new Vue({
        el: '#video-app',
        store,
        render: h => h(App)
    });
}
