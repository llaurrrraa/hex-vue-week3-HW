import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.0.9/vue.esm-browser.js';

let productModal = {};
let delProductModal = {};

createApp({
    data(){
        return{
            text:'Hello,world',
            apiUrl:'https://vue3-course-api.hexschool.io/v2',
            apiPath:'llaurrrraa-hexschool',
            products:[],
            isNew: false,
            tempProduct:{
                imagesUrl: [],
            },
        }

    },
    methods:{
        checkAdmin(){
            axios.post(`${this.apiUrl}/api/user/check`)
                .then( res => {
                    // console.log(res);
                    this.getProductsAll();
                })
                .catch( err => {
                    console.dir(err);
                })
        },
        getProductsAll(){
            axios.get(`${this.apiUrl}/api/${this.apiPath}/admin/products/all`)
                .then( res => {
                   this.products = res.data.products;
                })
                .catch( err => {
                    console.dir(err);
                })
        },
        openModal(status,product){
            if ( status === 'isNew' ){
                this.tempProduct = {
                    imagesUrl: [],
                };
                productModal.show();
                this.isNew = true;
                // console.log(this.isNew);
            }else if ( status === 'edit' ){
                this.tempProduct = {...product};
                productModal.show();
                this.isNew = false;
                // console.log(this.isNew);
            }else if( status === 'delete' ){
                this.tempProduct = {...product};
                delProductModal.show();
                console.log('hi');
            }
        },
        addProduct(){
            let url = `${this.apiUrl}/api/${this.apiPath}/admin/product`;
            let method = 'post';

            if(!this.isNew){
                url = `${this.apiUrl}/api/${this.apiPath}/admin/product/${this.tempProduct.id}`;
                method = 'put';
            }
            axios[method](url, { data : this.tempProduct })
                .then((res) => {
                    // console.log(res);
                    this.getProductsAll();
                    productModal.hide();
                })
                .catch((err) => {
                })
        },
        delProduct(){
            let url = `${this.apiUrl}/api/${this.apiPath}/admin/product/${this.tempProduct.id}`
            axios.delete(url)
                .then(res => {
                    console.log(res);
                    delProductModal.hide();
                    this.getProductsAll();
                })
                .catch(err => {
                })
        }
    },
    mounted(){
        // 取出 token 
        const token = document.cookie.replace(/(?:(?:^|.*;\s*)myToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
        // 放在 headers 裡
        axios.defaults.headers.common.Authorization = token;
        this.checkAdmin();
        // 建立 bootstrap 實體，重新賦予變數值
        productModal = new bootstrap.Modal(document.getElementById('productModal'), {
            keyboard: false // 能不能用鍵盤操作
        });
        delProductModal = new bootstrap.Modal(document.getElementById('delProductModal'));
    }

}).mount('#app');