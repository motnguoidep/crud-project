<script setup >
import index from "@/components/product/index.vue"
import { RouterLink, RouterView } from 'vue-router'
import Header from "./Header.vue";
import Footer from "./Footer.vue";
</script>
  
<template>
  <Header/>
  <main>
    <RouterView></RouterView>
    <RouterLink to="/product" style="text-decoration: none"> <Button class="mr-2 mt-4 mb-2 md:mb-0 css-btn" style="background: pink; border: none; " >Product</Button></RouterLink>
  </main>
  <Footer/>
</template>
<style scope>
.css-btn{
  list-style: none;

color: #000;
font-weight: 700;}
</style>
