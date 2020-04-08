<template>
 <div class="login">
   <el-form
     class="loginForm"
     status-icon
     label-width="70px"
     ref="loginForm"
     :model="loginForm"
     :rules="loginRules"
   >
     <div class="logo"><img src="../assets/logo.png"></div>

     <el-form-item class="formItem" label="用户名" prop="username">
       <el-input v-model="loginForm.username" placeholder="请输入登录用户名" auto-complete="off"></el-input>
     </el-form-item>
     <el-form-item class="formItem" label="密码" prop="password">
       <el-input
         type="password"
         v-model="loginForm.password"
         placeholder="请输入登录密码"
         auto-complete="off"
       ></el-input>
     </el-form-item>
     <el-form-item label-width="0" class="loginBtns">
       <el-button @click="goRegister()">注册</el-button>
       <el-button type="primary" @click="handleLogin()">登录</el-button>
       <el-button @click="goModifyPwd()">忘记密码</el-button>
     </el-form-item>
   </el-form>
 </div>
</template>

<script>

 import {Encrypt} from '../utils/AESutils'


 export default {

  name: 'login',
    data(){
    return {
      loginForm: {
        username: "",
        password: ""
      },
      loginRules: {
        username :[
          {
            required:true,message:"用户名不能为空",trigger:"blur"
          },
          {
            min:3,
            max:10,
            message:"用户名长度在3到10个字符",
            trigger: "blur"
          }
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          {
            min: 6,
            max: 32,
            message: "密码长度在 6 到 32 个字符",
            trigger: "blur"
          }
        ]
      }
    }
    },
    comments:{},
    mounted () {

    },
    methods: {
      handleLogin() {
       const password = Encrypt(this.loginForm.password);
       const  username = this.loginForm.username;
       console.log(password);
       const that = this;
        this.$refs.loginForm.validate(valid => {
          if (valid) {
            this.$http.post("http://localhost:8181/Login/verifyLogin",{
              password,username
            }).then(
              function (response) {
            if(response.data === 200){
              that.$router.push("/home");
            }else {
              that.$message({
                showClose: true,
                message: '登录失败，用户名或密码错误！',
                type: 'error'
              });

            }
              }
            )
            .catch(
              function (error) {
            console.log(error)
              }
            )
          } else {
            return false;
          }
        });
      },
      goRegister() {

      },
      goModifyPwd() {

      }
    }
  }

</script>

<style scoped lang="less">

  .login{
    //position: relative;
    width: 100%;
    height: 100%;
    background-size: 100% 100% ;
    .loginForm {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 500px;
    height: 400px;
    margin-top: -200px;
    margin-left: -250px;
     .logo {
    font-size: 36px;
    color: #ccc;
    text-align: center;
    margin-bottom: 100px;
  }
  .formItem {
    margin-bottom: 30px;
  }
  .loginBtns {
    text-align: center;
  }
  }
  }

</style>

