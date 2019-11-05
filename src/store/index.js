import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
import Customer from './Customer'
import Address from './Address'
import Category from './Category'
import Comment from './Comment'
import Order from './Order'
import Product from './Product'
import Waiter from './Waiter'

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    Customer,
    Address,
    Category,
    Comment,
    Order,
    Product,
    Waiter
  }
})
