<template>
    <Header/>
    <Product/>
    <Footer/>
</template>
<script >
import Product from "@/components/product/index.vue"
import { defineComponent } from "vue";
import Header from "@/views/Header.vue"
import Footer from "@/views/Footer.vue";
export default defineComponent({
    components: { Product,Footer, Header}
})
</script>