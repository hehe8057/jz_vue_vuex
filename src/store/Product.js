import {get,post,post_array} from '../http/axios'
import axios from "axios"
import qs from "qs";
axios.defaults.baseURL = "http://xiaomiao.club:6677";
axios.defaults.headers.common["Content-Type"] = "application/x-www-form-urlencoded";
axios.defaults.transformRequest = [(date) => {
    return qs.stringify(date);
}]

export default{
    namespaced:true,
    state:{
        visible:false,
        products:[],
        categories:[],
        title:"添加顾客信息"
    },
    getters:{

    },
    mutations:{
        refreshProducts(state,products){
            state.products = products
        },
        refreshCategories(state,categories){
            state.categories = categories
        },
        refreshCascadeCategory(state,products){
            state.products = products
        },
        showModal(state){
            state.visible = true
        },
        closeModal(state){
            state.visible = false
        },
        setTitle(state,title){
            state.title = title
        }
    },
    actions:{
        async findALlProducts({commit},params){
            let response = await axios.post("/product/query",params);
            commit("refreshProducts",response.data)
        },
        // 初始化栏目信息
        async findAllCategories({commit},params){
            let response = await get("/category/findAll")
            commit("refreshCategories",response.data)
        },
        // 修改或保存
        async saveOrUpdateProduct({commit},products){
            let response = await axios.post("/product/saveOrUpdate",products)
            commit("closeModal")
            return response
        },
        // 删除
        async DeleteProduct(context,id){
            let response = await get("/product/deleteById?id="+id)
            return response
        },
        // 批量删除
        async batchDeleteProducts(context,ids){
            let response = await axios.post("/product/batchDelete?ids="+ids)
            return response
        },
        // 
        async ProductCascadeCategory(context,params){
            let reponse = await axios.post("/product/queryProductCascadeCategory",params)
            context.commit("refreshCascadeCategory",reponse.data)
        }
    }
}