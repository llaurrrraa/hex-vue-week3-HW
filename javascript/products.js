import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.0.9/vue.esm-browser.js';

createApp({
    data(){
        return{
            text:'Hello,world',
            apiUrl:'https://vue3-course-api.hexschool.io/v2',
            apiPath:'llaurrrraa-hexschool',
        }

    },
    methods:{
        checkAdmin(){
            
        }

    },
    mounted(){
        // 取出 token 
        const token = document.cookie.replace(/(?:(?:^|.*;\s*)myToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
        // 放在 headers 裡
        axios.defaults.headers.common.Authorization = token;
    }

}).mount('#app');