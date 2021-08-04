<template>
  <header class="tm-header" v-bind:class="{ show:slide}" id="tm-header">
    <div class="tm-header-wrapper" >
      <button @click="slider"  class="navbar-toggler" type="button" aria-label="Toggle navigation" >
        <i class="fas fa-bars" ></i>
      </button>
      <div class="tm-site-header">
        <h1 class="text-center" style="color: #008c8c; font-weight: bold;">Smart Shelf</h1>
      </div>
      <nav class="tm-nav"  id="tm-nav">
        <ul>
          <li class="tm-nav-item active" ><a @click="goMain" href="#" class="tm-nav-link" style="color: #008c8c">
            <i class="fas fa-home" ></i>
            Мои полки
          </a></li>

          <li v-if="is_auth" class="tm-nav-item"><a @click="goMenu" href="#" class="tm-nav-link">
            <i class="fas fa-users"></i>
            Мое меню
          </a></li>
          <li class="tm-nav-item" v-if="is_auth"><a @click="goDelivery" href="#" class="tm-nav-link" >
            <i  class="fas fa-pen"></i>
            Заказ</a>
          </li>


          <li class="tm-nav-item" v-if="!is_auth"><a @click="goLogin" href="#" class="tm-nav-link" >
            <i></i>
            Войти</a>
          </li>
          <li class="tm-nav-item" v-if="is_auth"><a @click="goLogout" href="#" class="tm-nav-link" >
            <i ></i>
            Выйти</a>
          </li>


        </ul>
      </nav>

      <p class="tm-mb-80 pr-5 text-white">
      </p>
    </div>
  </header>
</template>

<script>
export default {
  name: "Nav",
  data(){
    return{
      slide:false,
    }
  },
  computed: {

    is_auth() {
      if (localStorage.getItem("auth_token")) {
        return true
      }
    }
  },
  methods: {
    goLogin() {
      this.$router.push({name: "login"});
      this.slide = false
    },
    goLogout() {
      localStorage.removeItem("auth_token")
      this.slide = false
      window.location = '/'
    },
    goMain() {
      this.$router.push({name: "Home"})
      this.slide = false
    },
    goMenu() {
      this.$router.push({name: "category"})
      this.slide = false
    },
    goDelivery() {
      this.$router.push({name: "delivery"})
      this.slide = false
    },
    slider(){
      if (this.slide === true){
        this.slide = false
      }
      else{
        this.slide = true
      }
    }
  }
}

</script>



