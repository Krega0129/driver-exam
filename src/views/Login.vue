<template>
  <v-container fluid class="login-bg">
    <v-card width="300" class="card">
      <v-card-title> {{ title }} </v-card-title>
      <v-card-text>
        <v-window v-model="step">
          <v-window-item :value="0">
            <v-form v-model="form.valid.loginValid">
              <v-text-field
                v-model="user.userName"
                :rules="form.rules.userNameRules"
                dense
                outlined
                label="账号"
                maxLength="10"
                width="500"
                class="mt-3"
                required
              ></v-text-field>
              <v-text-field
                v-model="user.password"
                :rules="form.rules.passwordRules"
                dense
                outlined
                maxLength="16"
                label="密码"
                width="500"
                :type="form.eyes.loginEye ? 'text' : 'password'"
                :append-icon="form.eyes.loginEye ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="form.eyes.loginEye = !form.eyes.loginEye"
                @keydown.enter="handleLoginAndRegister"
                required
              ></v-text-field>
            </v-form>
          </v-window-item>
          <v-window-item :value="1">
            <v-form v-model="form.valid.createValid">
              <v-text-field
                v-model="newUser.userName"
                :rules="form.rules.userNameRules"
                dense
                outlined
                label="账号"
                width="500"
                class="mt-3"
                required
              ></v-text-field>
              <v-text-field
                v-model="newUser.password"
                :rules="form.rules.passwordRules"
                dense
                outlined
                label="密码"
                width="500"
                :type="form.eyes.registerEye ? 'text' : 'password'"
                :append-icon="form.eyes.registerEye ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="form.eyes.registerEye = !form.eyes.registerEye"
                required
              ></v-text-field>
              <v-text-field
                v-model="newUser.confirmPassword"
                :rules="form.rules.passwordRules"
                label="确认密码"
                dense
                outlined
                width="500"
                :type="form.eyes.registerConfirmEye ? 'text' : 'password'"
                :append-icon="form.eyes.registerConfirmEye ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="form.eyes.registerConfirmEye = !form.eyes.registerConfirmEye"
                @keydown.enter="handleLoginAndRegister"
                required
              ></v-text-field>
            </v-form>
          </v-window-item>
        </v-window>
        <v-btn
          block 
          class="teal darken-2 white--text mt-3"
          :disabled="!valid"
          :loading="form.pending"
          @click="handleLoginAndRegister"
        >
          {{ title }}
        </v-btn>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn small color="teal darken-2 white--text" v-show="step" @click="step--"> <v-icon>mdi-arrow-left-bold</v-icon> 返回登录 </v-btn>
        <v-spacer></v-spacer>
        <v-btn small color="teal darken-2 white--text" v-show="!step" @click="step++"> 去注册 <v-icon>mdi-arrow-right-bold</v-icon> </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      user: {
        userName: "",
        password: ""
      },
      newUser: {
        userName: "",
        password: "",
        confirmPassword: ""
      },
      form: {
        rules: {
          userNameRules: [
            (v) => !!v || "不能为空",
            (v) => /[a-zA-Z0-9]{3,10}/.test(v) || "只允许3位以上的字母数字",
          ],
          passwordRules: [
            (v) => !!v || "密码不能为空",
            v => v && v.length >= 6 || '密码不能少于6个字符',
            v => /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/.test(v) || '密码必须包含大、小写字母、数字和字符'
          ],
        },
        valid: {
          loginValid: false,
          createValid: false,
        },
        eyes: {
          loginEye: false,
          registerEye: false,
          registerConfirmEye: false
        },
        pending: false
      },
      step: 0,
    };
  },
  computed: {
    title() {
      return this.step ? "注册并登录" : "登录";
    },
    valid() {
      const { createValid, loginValid } = this.form.valid
      return this.step ? createValid : loginValid
    }
  },
  methods: {
    handleLoginAndRegister() {
      let user;
      if(this.step) {
        user = this.newUser
        // 注册
        if(user.password !== user.confirmPassword) {
          this.$update.showSnackbar({
            type: 'error',
            text: '两次输入的密码不一致'
          })
          return;
        }
        this.form.pending = true
        setTimeout(() => {
          this.$update.showSnackbar({
            type: 'success',
            text: '注册成功'
          })
          this.form.pending = false
        }, 1000)
      } else {
        user = this.user
        this.form.pending = true
        setTimeout(() => {
          if(user.userName === 'user' && user.password === 'password') {
            sessionStorage.setItem('token', 1);
            this.$update.showSnackbar({
              type: 'success',
              text: '登录成功'
            })
            this.$router.replace('/user/home')
          } else {
            this.$update.showSnackbar({
              type: 'error',
              text: '登录失败'
            })
          }
          this.form.pending = false
        }, 1000)
      }
    }
  },
  created() {
    
  },
  watch: {},
};
</script>

<style scoped>
.login-bg {
  height: 100%;
  background: url("../assets/images/login-bg.jpg");
  background-attachment: fixed;
  background-size: 100% 100%;
}

.card {
  margin: 0 auto;
  top: 50%;
  transform: translateY(-50%);
}
</style>