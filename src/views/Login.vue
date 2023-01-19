<template>
    <div class="login_container">
        <div class="login_box">
            <el-form ref="formRef" :rules="rules" :model="loginForm" class="login_form">
                <el-form-item label="用户名" prop="username">
                    <el-input prefix-icon="el-icon-s-custom" v-model="loginForm.username"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="pwd">
                    <el-input v-model="loginForm.password" type="password" prefix-icon="el-icon-key"></el-input>
                </el-form-item>
                <el-form-item class="btns">
                    <el-button type="primary" @click="loginEvent">登陆</el-button>
                    <el-button type="info" @click="resetEvent">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    import index from '../api/index'
    import {setToken} from '../api/auth'
    export default {
        name: "Login",
        data() {
            return {
                loginForm: {
                    username: '',
                    password: '',
                },
                // 使用验证功能
                rules: {
                    username: [
                        { required: true, message: '请输入用户名', trigger: 'blur' },
                    ],
                    password:[
                        { required: true, message: '请输入密码', trigger: 'blur' }
                    ],
                }
            }
        },
        methods: {
            loginEvent() {
                this.$refs.formRef.validate(async valid=>{
                    if (!valid) return
                    index.Login(this.loginForm).then(res => {
                        if(res.code === 20000) {
                            setToken(res.data.token)
                            this.$message({
                                message: '登陆成功',
                                type: 'success'
                            });
                            this.$router.push('/admin')
                        }
                    }).catch(err => {
                        console.log(err)
                    })
                });
            },
            resetEvent() {
                this.$refs.formRef.resetFields();
            }
        }
    }
</script>

<style scoped>
    .login_container {
        background-color: skyblue;
        height: 100%;
    }
    .login_box {
        width:450px;
        height: 300px;
        background-color: #fff;
        border-radius: 10px;
        position: absolute;
        left:50%;
        top:50%;
        transform: translate(-50%,-50%);
    }
    .btns {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .login_form {
        position:absolute;
        bottom: 0;
        width: 100%;
        padding: 0 20px;
        box-sizing: border-box;
    }
</style>