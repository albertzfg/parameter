import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import OmronAxisControl from '@/components/OmronAxisControl'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/omron-axis',
      name: 'OmronAxisControl',
      component: OmronAxisControl
    }
  ]
})
