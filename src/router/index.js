import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Customer from '../pages/Customer.vue'
import Address from '../pages/Address.vue'
import Category from '../pages/Category.vue'
import Comment from '../pages/Comment.vue'
import Order from '../pages/Order.vue'
import Product from '../pages/Product.vue'
import Waiter from '../pages/Waiter.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path:'/address',
    name:'address',
    component:Address
  },
  {
    path:'/category',
    name:'category',
    component:Category
  },
  {
    path:'/customer',
    name:'customer',
    component:Customer
  },
  {
    path:'/comment',
    name:'comment',
    component:Comment
  },
  {
    path:'/order',
    name:'order',
    component:Order
  },
  {
    path:'/product',
    name:'product',
    component:Product
  },
  {
    path:'/waiter',
    name:'waiter',
    component:Waiter
  }
]

const router = new VueRouter({
  routes
})

export default router
