<template>
    <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/goods.html">购物商城</a> &gt;
                <a href="/goods/42/1.html">商品详情</a>
            </div>
        </div>
        <div class="section">
            <div class="wrapper clearfix">
                <div class="wrap-box">
                    <div class="left-925">
                        <div class="goods-box clearfix">
                            <div class="pic-box">
                                <ProductZoomer v-if="images.normal_size.length!=0"
                                :base-images="images" 
                                :base-zoomer-options="zoomerOptions" />
                            </div>
                            <div class="goods-spec">
                                <h1>{{goodsinfo.title}}</h1>
                                <p class="subtitle">{{goodsinfo.sub_title}}</p>
                                <div class="spec-box">
                                    <dl>
                                        <dt>货号</dt>
                                        <dd id="commodityGoodsNo">{{goodsinfo.goods_no}}</dd>
                                    </dl>
                                    <dl>
                                        <dt>市场价</dt>
                                        <dd>
                                            <s id="commodityMarketPrice">¥{{goodsinfo.market_price}}</s>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dt>销售价</dt>
                                        <dd>side-img-list
                                            <em id="commoditySellPrice" class="price">¥{{goodsinfo.sell_price}}</em>
                                        </dd>
                                    </dl>
                                </div>
                                <div class="spec-box">
                                    <dl>
                                        <dt>购买数量</dt>
                                        <dd>
                                            <div class="stock-box">
                                                <el-input-number v-model="buyCount" :min="1" :max="goodsinfo.stock_quantity" label="描述文字"></el-input-number>
                                            </div>
                                            <span class="stock-txt">
                                                库存
                                                <em id="commodityStockNum">{{goodsinfo.stock_quantity}}</em>件
                                            </span>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dd>
                                            <div id="buyButton" class="btn-buy">
                                                <button onclick="cartAdd(this,'/',1,'/shopping.html');" class="buy">立即购买</button>
                                                <!-- <button @click="$store.commit('increment')" class="add">加入购物车</button> -->
                                                <!-- 这里直接用点击调用函数的方法来写是因为这里提交数据比较麻烦所以单独提取到一个函数中去做 -->
                                                    <button @click="add2Cart" class="add">加入购物车</button>
                                            </div>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                        <div id="goodsTabs" class="goods-tab bg-wrap">
                            <!-- iview中的图钉 也就是吸顶效果 -->
                            <Affix>
                                <div id="tabHead" class="tab-head" style="position: static; top: 517px; width: 925px;">
                                    <ul>
                                        <li>
                                            <a href="javascript:;" @click="tabIndex=0" :class="{selected:tabIndex==0}">商品介绍</a>
                                        </li>
                                        <li>
                                            <a href="javascript:;" @click="tabIndex=1" :class="{selected:tabIndex==1}">商品评论</a>
                                        </li>
                                    </ul>
                                </div>
                            </Affix>

                            <!-- 这里显示商品介绍 -->

                            <div class="tab-content entry" v-html="goodsinfo.content" v-show="tabIndex==0">

                            </div>
                            <div class="tab-content" v-show="tabIndex==1">
                                <div class="comment-box">
                                    <div id="commentForm" name="commentForm" class="form-box">
                                        <div class="avatar-box">
                                            <i class="iconfont icon-user-full"></i>
                                        </div>
                                        <div class="conn-box">
                                            <div class="editor">
                                                <textarea id="txtContent" v-model.trim="comment" name="txtContent" sucmsg=" " datatype="*10-1000" nullmsg="请填写评论内容！"></textarea>
                                                <span class="Validform_checktip"></span>
                                            </div>
                                            <div class="subcon">
                                                <input id="btnSubmit" @click="submitcomment" name="submit" type="submit" value="提交评论" class="submit">
                                                <span class="Validform_checktip"></span>
                                            </div>
                                        </div>
                                    </div>
                                    <ul id="commentList" class="list-box">
                                        <p v-show="totalcount==0" style="margin: 5px 0px 15px 69px; line-height: 42px; text-align: center; border: 1px solid rgb(247, 247, 247);">暂无评论，快来抢沙发吧！</p>
                                        <li v-for="(item, index) in comments" :key="item.id">
                                            <div class="avatar-box">
                                                <i class="iconfont icon-user-full"></i>
                                            </div>
                                            <div class="inner-box">
                                                <div class="info">
                                                    <span>{{item.user_name}}</span>
                                                    <span>{{item.add_time | shortTimePlus}}</span>
                                                </div>
                                                <p>{{item.content}}</p>
                                            </div>
                                        </li>

                                    </ul>
                                    <div class="page-box" style="margin: 5px 0px 0px 62px;">
                                        <!-- iview中的分页功能 -->
                                        <Page :total="totalcount" @on-change="packChange" placement="top" :page-size-opts="[6,8,12]" :page-size="pageSize" @on-page-size-change="pagesizeChange" show-sizer show-elevator/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="left-220">
                        <div class="bg-wrap nobg">
                            <div class="sidebar-box">
                                <h4>推荐商品</h4>
                                <ul class="side-img-list">
                                    <li v-for="(item, index) in hotgoodslist" :key="item.id">
                                        <div class="img-box">
                                            <!-- <a href="#/site/goodsinfo/90" class=""> -->
                                            <router-link :to="'/detail/'+item.id">
                                                <img :src="item.img_url">
                                            </router-link>
                                            <!-- </a> -->

                                        </div>
                                        <div class="txt-box">
                                            <router-link :to="'/detail/'+item.id">
                                                {{item.title}}
                                            </router-link>
                                            <span>{{item.add_time | shortTime}}</span>
                                        </div>
                                    </li>

                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- iview中的返回顶部 -->
        <BackTop></BackTop>
    </div>
</template>
<script>
// import axios from "axios";
export default {
  name: "detail",
  data: function() {
    return {
      // 商品id
      artID: "",
      // 商品详情
      goodsinfo: {},
      //   热卖商品
      hotgoodslist: [],
      //   图片列表
      imglist: [],
      buyCount: 1,
      // 记录点击的tab栏索引
      tabIndex: 0,
      //页码
      pageIndex: 1,
      //页容量
      pageSize: 6,
      //评论内容
      comments: [],
      //总评论数
      totalcount: 0,
      //评论的内容
      comment: "",
      images: {                                                                                                        
      normal_size:  // required                           
      [                                             
        // {'id':'unique id', 'url': 'image url'},      
        // {'id':'unique id', 'url': 'image url'}        
      ]                                               
    },
    zoomerOptions:{
  zoomFactor: 4,
  pane: 'container',
  hoverDelay: 300,
  namespace: 'container-zoomer',
  move_by_click:true,
  scroll_items: 4,
  choosed_thumb_border_color: "#ff3d00"
},
};
},
  methods: {
    initData() {
      // 保存数据
      this.artID = this.$route.params.artID;
      // 调用接口 获取 详情数据 axios
      this.$axios
        .get(
          `http://111.230.232.110:8899/site/goods/getgoodsinfo/${this.artID}`
        )
        .then(result => {
          //  console.log(result);
          // 商品详情
          this.goodsinfo = result.data.message.goodsinfo;
          //   热卖商品
          this.hotgoodslist = result.data.message.hotgoodslist;
          //   图片列表
          this.imglist = result.data.message.imglist;
          // 设置给 放大镜的数据即可
          this.images.normal_size=[];
            // 循环添加数据
          this.imglist.forEach(v => {
              this.images.normal_size.push({
                   id:v.id, 
                  url:v.original_path
              })
          });

        });
      this.getComments();
    },
    getComments() {
      //获取评论
      this.$axios
        .get(
          `http://111.230.232.110:8899/site/comment/getbypage/goods/${
            this.artID
          }?pageIndex=${this.pageIndex}&pageSize=${this.pageSize}`
        )
        .then(result => {
          console.log(result);
          this.comments = result.data.message;
          this.totalcount = result.data.totalcount;
        });
    },
    packChange(pageIndex) {
      console.log(pageIndex);
      this.pageIndex = pageIndex;
      this.getComments();
    },
    pagesizeChange(pageSize) {
      this.pageSize = pageSize;
      this.getComments();
    },
    submitcomment() {
      if (this.comments == "") {
        this.$Message.warning("请输入评论内容！");
      } else {
        this.$axios
          .post(`site/validate/comment/post/goods/${this.artID}`, {
            commenttxt: this.comment
          })
          .then(result => {
            if (result.data.status == 0) {
              this.$Message.success("评论成功");
              this.comment = "";
              this.getComments();
            } else if (result.data.status == 1) {
              this.$Message.error("评论失败");
            }
          });
      }
    },
    // 加入购物车
    add2Cart(){
        // console.log(111111);
        
          // 获取商品id
        // 获取购买数量

        // 提交载荷
        //这里和第一次只提交一个数据的写法 都是通过$store.commit(函数名))只是这里比第一次
        //多提交了一个对象的数据
        this.$store.commit('add2Cart',{
            goodId:this.artID,
            goodNum:this.buyCount
        })
    }
  },

  // 生命周期函数
  created() {
    this.initData();
    //      // 保存数据
    // this.artID = this.$route.params.artID;
    //  // 调用接口 获取 详情数据 axios
    //  this.$axios
    //  .get(`http://111.230.232.110:8899/site/goods/getgoodsinfo/${this.artID}`)
    //  .then(result=>{
    //     //  console.log(result);
    //     // 商品详情
    //     this.goodsinfo = result.data.message.goodsinfo;
    //     //   热卖商品
    //     this.hotgoodslist = result.data.message.hotgoodslist;
    //     //   图片列表
    //     this.imglist = result.data.message.imglist;
    //  })
  },
  // 侦听器
  watch: {
    //  看数据有没有变就看$route有没有变了
    $route(newVal, oldVal) {
      //   console.log('数据变了');
         // 设置 图片数组为空 让放大镜组件 重新生成
      this.images.normal_size = [];
      // 要重新获取数据 所以直接把数据封装成一个函数
      this.initData();
    }
  }
};
</script>
<style>
.tab-content img {
  display: block;
  max-width: 100%;
}
.ivu-back-top span {
  font-size: 100px;
  display: block;
  transform: rotateZ(-45deg);
}
.inline-zoomer-zoomer-box{
    width: 395px;
    /* height: 320px; */
}
.thumb-list img{
    width: 100px;
    height: 100px;
}
.responsive-image{
       width: 395px;
}
.pic-box{
     width: 395px;
}
.container-zoomer-pane-container{
      width: 395px;
      height: 395px;
}
</style>

