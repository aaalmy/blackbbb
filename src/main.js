import Vue from 'vue'
// 导入 App.vue(单文件组件)
import App from './App.vue'

Vue.config.productionTip = false
// 导入element-ui框架
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// 注册到Vue上
Vue.use(ElementUI);
// 设置带上cookie
axios.defaults.withCredentials=true;//让ajax携带cookie
//抽取基础地址
axios.defaults.baseURL = `http://111.230.232.110:8899/`;
//导入iview
import iView from 'iview';
import 'iview/dist/styles/iview.css';
Vue.use(iView)
//导入路由
import VueRouter from 'vue-router';
//如果是在模式化的开发环境下
Vue.use(VueRouter);
//导入全局的样式
import './assets/site/css/style.css';
// 导入 axios
import axios from 'axios'
// 设置到Vue的原型上 那么所有Vue实例化出来的对象 和组件都能够共享这个属性
// 一般来说 设置到原型上的 属性 Vue中 会使用$作为前缀 用来区分普通的属性
Vue.prototype.$axios = axios;
// 导入每一个页面的 组件
import index from "./components/index.vue";
import detail from "./components/02.detail.vue";
import shopCart from "./components/03.shopCart.vue";
import order from "./components/04.order.vue";
import login from "./components/05.login.vue";
import payMoney from "./components/06.payMoney.vue";
import paySuccess from "./components/07.paySuccess.vue";
import vipCenter from "./components/08.vipCenter.vue";
import orderList from "./components/09.orderList.vue";
import orderDetail from "./components/10.orderDetail.vue";
import orderIndex from "./components/11.index.vue";

//导入gittub里查找的放大镜组件
import ProductZoomer from 'vue-product-zoomer'
//导入vuex
import Vuex from 'vuex'
Vue.use(Vuex)
Vue.use(ProductZoomer)
//实例化仓库用来保存数据
const store = new Vuex.Store({
    // 状态
    state: {
        // 购物车数据对象
        //   count: 0
        // cartData: {}
          // 短路运算 || 如果没有数据 左边的值是 false 去获取 || 右边的值
    cartData:JSON.parse(window.localStorage.getItem('hm24'))||{
        90:6,
        84:7
      },
      isLogin:false
    },
     // Vuex的计算属性
  getters:{
    totalCount(state){
      // 通过state 获取 内部的数据
      // 计算并返回
      // return 998;
      let num = 0;
      for (const key in state.cartData) {
        // 循环累加
        num+=state.cartData[key]
      }
      return num;
    }
  },
    // 数据改变的方法
    mutations: {
        //由于购物车添加的是多个商品 所以除了累加数量还要根据是什么商品进行累加
        //所以我们用Vue中的Vuex提交载荷来做 即提交的是一个对象
        //   increment (state) {
        //     state.count++
        add2Cart(state, obj) {
            // console.log(obj);
            // 商品已经存在
            if (state.cartData[obj.goodId] != undefined) {
                // 累加即可 
                state.cartData[obj.goodId] += obj.goodNum;
            } else {
                // 商品不存在
                // 动态增加键值对
                // state.cartData[obj.goodId] = obj.goodNum;
                Vue.set(state.cartData,obj.goodId,obj.goodNum)
            }
               // 打印内容
      console.log(state);
        },
         // 增加一个修改数据的方法
    updateCartData(state, obj){
         // 接收到数据直接赋值 因为 在03.shopCart.vue中 已经把数据处理好了
        state.cartData=obj;
    },
      // 删除某一条数据的方法
    // 已经被 watch中的代码 实现  只是为了 演示 Vue.delete这个方法
    delGoodsById(state, id) {
        // console.log(id);
        // 根据id 删除state中的数据
        // delete state.cartData[id];
        // delete 删除的属性 Vue无法跟踪
        // 参数1 对象 参数2 删除的属性
        // 必须使用Vue.delete才可以同步更新视图
        Vue.delete(state.cartData, id);
      },
    //修改登录状态 这样就能同步检测到用户是否点击了退出
    changeLogin(state,isLogin){
        state.isLogin=isLogin;
    }
    }
})
//写路由规则
let routes = [
    {
        path: "/",
        //重定向到首页/index
        redirect: "/index"
    },
    {
        path: "/index",
        component: index
    },
    // 使用动态路由匹配 传递参数
    {
        path: "/detail/:artID",
        component: detail
    },
     // 购物车的跳转 不需要带数据
  {
    path: "/shopCart",
    component: shopCart
  },
   // 去订单确认页面
   {
    path: "/order/:ids",
    component: order
  },
  //登录页面
  {
    path: "/login",
    component: login
  },
  // 订单详情 付钱页面
  {
    path:"/payMoney/:orderId",
    component: payMoney,
      // meta 是固定
      meta: {
        // 这里的字段可以随意添加
        // isLogin: true,
        // weather: "棒棒哒",
        // wendu: "25℃"
        checkLogin: true
      }
  },
   // 支付成功页
   {
    path: "/paySuccess",
    component: paySuccess,
    // meta 是固定
    meta: {
      // 这里的字段可以随意添加
      checkLogin: true
    }
  },
 // 会员中心
 {
    path: "/vipCenter",
    component: vipCenter,
    // meta 是固定
    meta: {
      // 这里的字段可以随意添加
      checkLogin: true
    },
     // 嵌套路由
     children:[
       {
         //一开始进入的路径指向index
         path:'',
         redirect:'index'
       },
       {
        // /vipCenter/index
        path:'index',
        component:orderIndex,
        meta: { currentName: '中心首页' }
      },
      {
        // /vipCenter/orderList
        path:'orderList',
        component:orderList,
        meta: { currentName: '订单列表' }
      },
      {
        // /vipCenter/orderDetail
        path:'orderDetail/:orderid',
        component:orderDetail,
        meta: { currentName: '订单详情' }
      },
     ]
  }
];
//实例化路由对象
let router = new VueRouter({
    routes,
    // 方法2：
    scrollBehavior (to, from, savedPosition) {
      // return 期望滚动到哪个的位置
       return{ x: 0, y: 0 }
    }
});
// 增加导航守卫 回调函数(每次路由改变的时候 触发)
router.beforeEach((to, from, next) => {
    console.log("守卫啦!!!!");
    // console.log(to);
    // console.log(from);
    if (to.meta.checkLogin == true) {
      // 正要去订单页
      // 必须先判断登录
      // 之前需要用this.axios是因为之前的每个vue页面的组件都在main上所以访问不到 就用this.$axios（this是通过箭头函数改变的指向)
      // 而这里就是main了 所以可以直接访问axios
      axios.get("site/account/islogin").then(result => {
        //   console.log(result);
        if (result.data.code == "nologin") {
          // 提示用户
          // $Message本来就是挂在Vue的原型上的 
          Vue.prototype.$Message.warning("请先登录");
          // 跳转页面(路由)
          router.push("/login");
        }else{
            next();
        }
      });
      //如果不是去登录页面
    } else {
      // next 如果不执行 就不会路由跳转
      next();
    }
  });
  // 方法一：
  // //路由跳转完毕触发
  // router.afterEach((to, from) => {
  //   //页面滚到顶部
  //   window.scrollTo(0,0);
  // })
  
// 注册全局过滤器 方便使用
// 导入 moment
import moment from 'moment';
Vue.filter("shortTime", value => {
    //   console.log(value);
    // 处理时间数据
    // 返回处理之后的数据
    // 要显示什么 就返回什么
    console.log(moment(value).format("YYYY😘MM😘DD👍"));
    //   return '😁😁😁😁😁😁';
    return moment(value).format("YYYY🚲MM🚲DD🚲");
});
Vue.filter("shortTimePlus", value => {
    //   return '😁😁😁😁😁😁';
    return moment(value).format("YYYY/MM/DD HH:mm:ss");
});
// 增加笑脸的过滤器
Vue.filter("addSmlie", (value,smileType) => {
  //   return '😁😁😁😁😁😁';
  // 使用传递进来的笑脸
  return value+smileType;
});
// 浏览器关闭保存数据
window.onbeforeunload = function () {
    window.localStorage.setItem('hm24',JSON.stringify(store.state.cartData))
    }
new Vue({
    render: h => h(App),
    //   render: function(createElement) {
    //     return createElement(App);
    //   },
    router,
     // 需要把store传递给 Vue实例 这样在子组件中才可以使用$store
    store,
     // 生命周期函数
     created(){
           // console.log('最顶级的被创建了');
    // 调用登录判断接口
    // 根据结果判断是否登录
    axios.get("site/account/islogin").then(result => {
        console.log(result);
        if (result.data.code == "nologin") {
          // 提示用户
          Vue.prototype.$Message.warning("请先登录");
          // 跳转页面(路由) 登录页面 编程式导航
          router.push("/login");
        } else {
          // 修改仓库中的状态
          store.state.isLogin = true;
          // 如果登录成功啦
          // next();
        }
      });
     }

}).$mount('#app')
