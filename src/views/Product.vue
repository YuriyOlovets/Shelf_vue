<template>
  <main class="tm-main " >
   <!-- //product left -->
          <!-- product right -->
          <div  class="left-ads-display col-lg-8">
            <div class="row">
              <div class="desc1-left col-md-6">
                <img :src="Product.product_image" class="photo" alt="">
              </div>
              <div class="desc1-right col-md-6 pl-lg-4">
                <h3 class="editContent" style="outline: none; cursor: inherit;">

                </h3>
                <h5 class="editContent"></h5>
                <ul>
                  <li style="list-style: none">
                    <span><b>Продукт:</b> <b>{{Product.product_name}}</b> </span></li>
                  <br>
                  <li style="list-style: none">
                    <span><b>Виробник:</b> <b>{{Product.manufacturer}}</b> </span>
                  </li>
                  <br>
                  <li style="list-style: none">
                    <span><b>Калорій на 100г:</b><b>{{Product.kkal}}</b></span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
  </main>

</template>

<script>
import axios from "axios";

export default {
  name: "Product",
  props: ['name'],
  data() {
    return {
      Product: [],
    }
  },
  methods: {
    async LoadProduct() {
      console.log(this.name)
      this.Product = await axios({
        method: 'get',
        url: this.$store.getters.getServerUrl +'/product/' + this.name + '/',
      }).then(response => response.data);

    },
  },
  created() {
    this.LoadProduct()
  }
}
</script>

<style scoped>
.photo{
  position: relative;
  border-radius: 10px; /* Радиус скругления */
  border: 0.5px solid greenyellow;
  width: 280px;
  height: 200px;
}
b{
  color: #0c5460;
}
</style>