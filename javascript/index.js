import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.0.9/vue.esm-browser.js';

createApp({
    data(){
        return{
            text: 'Login',
            apiUrl:'https://vue3-course-api.hexschool.io/v2',
            user:{
                username:'',
                password:''
            }
        }
    },
    methods:{
        getAdmin(){
            axios.post(`${this.apiUrl}/admin/signin`, this.user)
                .then(res => {
                    const { token, expired } = res.data;
                    // 取出 token, expired 
                    // 放在 cookie 
                    document.cookie = `myToken=${token};expires=${new Date(expired)}; path=/`;
                    window.location='products.html';
                })
                .catch(err => {
                    alert('err')
                })
        }
    }
}).mount('#app');