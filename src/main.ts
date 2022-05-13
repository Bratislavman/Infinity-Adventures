import Vue from 'vue';
import App from './App.vue';
import VueI18n from 'vue-i18n';
import Vuex from 'vuex';
// @ts-ignore
import VueCarousel from 'vue-carousel';
// @ts-ignore
import {messages} from './assets/languages/app';
// @ts-ignore
import {game} from './store/game';
import vuescroll from 'vuescroll';

Vue.config.productionTip = false;

Vue.use(VueI18n);
Vue.use(Vuex);
Vue.use(VueCarousel);
Vue.use(vuescroll, {
    ops: {
        vuescroll: {
            mode: 'slide',
        },
        bar: {
            background: '#ffffff',
        },
    },
    name: 'myScroll'
});

const i18n = new VueI18n({
    locale: 'ru',
    messages
});

const store = new Vuex.Store(game);

export const vue = new Vue({
    render: h => h(App),
    // @ts-ignore
    i18n,
    store,
}).$mount('#app');