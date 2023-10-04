<template>
  <div>
   
    <RouterView></RouterView>
  </div>

  
</template>

<script>
import { defineComponent } from "vue";
import { productStore } from "@/stores/product";
import { mapActions, mapState, mapWritableState } from "pinia";
import { RouterLink, RouterView } from "vue-router";
export default defineComponent({
  data() {
    return {
      products: [], // Danh sách sản phẩm
      visible3: false, // Hiển thị dialog
      selectedProduct: {}, // Sản phẩm được chọn trong dialog
      visible2: false,
      searchQuery: [],
    };
  },
  computed: {
    ...mapState(productStore, ["products"]),
    ...mapWritableState(productStore, ["one"]),
        
  },

  // tap hop cac phuong thuc
  methods: {
    ...mapActions(productStore, ["fetchData", "delete", "update", "create"]),
  },
});
</script>

<!-- <style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}

/* Edit */
.flex {
  display: flex;
}

.flex-wrap {
  flex-wrap: wrap;
}

.border-top-1 {
  border-top: 1px solid;
}

.surface-border {
  border-color: #ccc;
}

.pt-4 {
  padding-top: 1rem;
}

.bg-blue-50 {
  background-color: #eef2ff;
}

.items-center {
  align-items: center;
}

.justify-center {
  justify-content: center;
}

.py-3 {
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
}

.px-0 {
  padding-left: 0;
  padding-right: 0;
}

.w-full {
  width: 100%;
}

.md\:w-4 {
  width: 1rem;
}

.rounded {
  border-radius: 0.25rem;
}

.text-700 {
  font-weight: 700;
}

.line-height-3 {
  line-height: 1.5;
}

.m-0 {
  margin: 0;
}

.p-5 {
  padding: 1.25rem;
}

.input-field {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
  margin-bottom: 1rem;
}

.input-field:focus {
  outline: none;
  border-color: blue;
}
</style> -->
