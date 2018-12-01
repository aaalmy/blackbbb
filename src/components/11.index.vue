<template>
            <div class="right-auto">
              <div class="bg-wrap" style="min-height: 765px;">
                <div class="sub-tit">
                  <ul>
                    <li class="selected">
                      <a href="javascript:;">个人中心</a>
                    </li>
                  </ul>
                </div>
                <div class="center-head clearfix">
                  <div class="img-box">
                    <!-- <i class="iconfont icon-user-full"></i> -->
                    <img src="../assets/02.jpg" alt="">
                  </div>
                  <div class="list-box">
                    <h3>欢迎您~ ivanyb</h3>
                    <ul>
                      <li>组别：注册会员</li>
                      <li>手机：13987654321</li>
                      <li>Email:ivanyb1@qq.com</li>
                    </ul>
                  </div>
                </div>
                <div class="center-info clearfix"></div>
                <div class="center-tit">
                  <span>
                    <a href="/user/order-list.html">更多..</a>
                  </span>
                  <h3>
                    <i class="iconfont icon-order"></i>我的订单
                  </h3>
                </div>
                <div class="center-info clearfix">
                  <ul>
                    <li>已完成订单：0个</li>
                    <li>待完成订单：2个</li>
                  </ul>
                </div>
              </div>
            </div>
</template>
<script>
export default {
  name: "vipCenter",
  methods:{
    //退出
    logout(){
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // this.$message({
          //   type: 'success',
          //   message: '删除成功!'
          // });
          this.$axios.get('site/account/logout').then(result=>{
             if (result.data.status === 0) {
              this.$Message.success(result.data.message);
              // 编程式导航 去首页
              this.$router.push("/index");
              // 修改Vuex中的 登录字段 为false
              this.$store.commit("changeLogin", false);
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    }
  }
};
</script>
<style >
.sub-tit{
    padding-top: 0;
}
.avatar-box{
    height: auto;
}
</style>
