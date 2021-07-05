<template>
  <div class="container-fluid">
    <main  class="tm-main">
      <div class="container d-flex justify-content-center mt-50 mb-50">
        <div class="row">
          <div class="col-md-10">
            <div v-for="dishes in Menu" :key="dishes.id" class="card card-body">
              <div class="media align-items-center align-items-lg-start text-center text-lg-left flex-column flex-lg-row">
                <div class="mr-2 mb-3 mb-lg-0"> <img :src="dishes.image" width="250" height="200" alt=""> </div>
                <div class="media-body">
                  <h6 class="media-title font-weight-semibold"> <a href="#" data-abc="true">{{dishes.dish_name}}</a> </h6>
                  <ul class="list-inline list-inline-dotted mb-3 mb-lg-2">
                    <li class="list-inline-item"><a href="#" class="text-muted" data-abc="true">{{dishes.category}}</a></li>
                  </ul>
                  <p class="mb-3">{{dishes.describe}}</p>
                </div>
                <div class="mt-3 mt-lg-0 ml-lg-3 text-center">
                  <a :href="dishes.recipe">
                  <button type="button" class="btn btn-warning mt-4 text-white"><i class="icon-cart-add mr-2"></i> Рецепт</button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Menu",
  props: ['category'],
  data(){
    return{
      Menu:[],
      Category_menu:[],

    }
  },
  methods:{
    async LoadMenu(){
      this.Menu = await axios({
        method: 'get',
        url: 'https://smart-shelf-fe863.ondigitalocean.app/api/v1/menu/'+ this.category+ '/',
        headers: {
          Authorization: 'Token ' + localStorage.getItem("auth_token")
        }
      }).then(response => response.data);



    },
  },
  created() {
   this.LoadMenu();
   console.log(this.category)

  }
  }

</script>

<style scoped>
body {
  margin: 0;
  font-family: Roboto, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  font-size: .8125rem;
  font-weight: 400;
  line-height: 1.5385;
  color: #333;
  text-align: left;
  background-color: #f5f5f5
}



.bg-teal-400 {
  background-color: #26a69a
}

a {
  text-decoration: none !important
}

.fa {
  color: red
}
</style>