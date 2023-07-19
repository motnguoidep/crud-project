<template>
  <div class="py-3 col-12 p-0 flex border-top-1 surface-border">
    <Button
      icon="pi pi-plus"
      class="mr-2 add-btn"
      label="Add"
      :style="{ background: 'pink', color: 'black', border: 'none' }"
      @click="handleClickAdd()"
      >Add</Button
    >
    <Button
      label="Delete"
      class="del-btn"
      :style="{ color: 'black', border: 'none' }"
      @click="delProduct()"
      :disabled="!selected || !selected.length"
    ></Button>
  </div>

  <DataTable
    ref="dt"
    :value="products"
    v-model:selection="selected"
    v-model:expandedRows="expandedRows"
    @rowExpand="onRowExpand($event)"
    dataKey="id"
  >
    <!--  -->
    <div
      class="flex flex-wrap gap-2 align-items-center justify-content-between"
    >
      <h4 class="m-0" style="color: black; font-weight: 600;">Manage Products</h4>
      <!-- <span class="p-input-icon-left">
        <i class="pi pi-search" />
        <InputText v-model="searchQuery" placeholder="Search..." />
      </span> -->
    </div>
    <Column expander style="width: 5rem" />
    <Column
      selectionMode="multiple"
      frozen
      v-model="selected"
      style="width: 3rem"
    >
    </Column>
    <Column field="id" header="id" sortable style="min-width: 12rem"></Column>
    <Column
      field="name"
      header="Name"
      sortable
      style="min-width: 16rem"
    ></Column>

    <Column header="Image">
      <template #body="one">
        <img
          :src="one.data.image"
          class="shadow-2 border-round"
          style="width: 64px"
        />
      </template>
    </Column>
    <Column field="price" header="Price" sortable style="min-width: 8rem">
      <template #body="one"> {{ one.data.price }}$ </template>
    </Column>
    <Column
      field="category"
      header="Category"
      sortable
      style="min-width: 10rem"
    ></Column>
    <Column
      frozen
      alignFrozen="right"
      :exportable="false"
      style="min-width: 5rem"
    >
      <template #body="one">
        <Button
          icon="pi pi-pencil"
          outlined
          rounded
          class="mr-2"
          @click="handleClickEdit(one.data)"
        />
        <!-- <Button
          icon="pi pi-trash"
          outlined
          rounded
          severity="danger"
        /> -->
      </template>
    </Column>
    <template #expansion="one">
      <section>
        <div>
          <img class="imag" :src="one.data.image" />
        </div>
        <div class="titleImag">
          <div class="sub-titleImag"> 
            <p>{{ one.data.name }}</p>
            <span>${{ one.data.price }}</span>
          </div>

          <ol class="list-none p-0 m-0 surface-100 text-center text-900">
            <li class="line-height-3 p-3 font-bold border-bottom-1 border-300">
              Category:{{ one.data.category }}
            </li>
            <li class="line-height-3 p-3 border-bottom-1 border-300">
              Description:{{ one.data.description }}
            </li>
            <li class="line-height-3 p-3 border-bottom-1 border-300">
              Reviews: {{ one.data.review }}
            </li>
          </ol>
        </div>
      </section>
    </template>
  </DataTable>

  <ProductDialog />
</template>
<!-- <div v-for="one in filteredResources" class="col-12">
    
    <div
      class="p-2 my-4 flex flex-column lg:flex-row justify-content-between align-items-center"
    >
      <div
        class="flex flex-column lg:flex-row justify-content-center align-items-center px-2"
      >
        <td>
          <checkbox
            v-model="selected"

            :value="one.id"
            @click="selectRow(one)"
          />
        </td>

        <img
          :src="one.image"
          alt="one"
          class="w-8rem h-8rem mr-3 flex-shrink-0"
        />
        <div class="flex flex-column my-auto text-center md:text-left">
          <span class="text-900 font-medium mb-3 mt-3 lg:mt-0">{{
            one.name
          }}</span>
          <span class="text-600 text-sm mb-3">{{ one.description }}</span>
          <a
            v-ripple
            tabindex="0"
            class="p-2 cursor-pointer w-9rem mx-auto lg:mx-0 border-round font-medium text-center border-1 border-primary text-primary transition-duration-150 p-ripple"
            >Buy Again <span class="font-light">{{ one.price }}$</span></a
          >
        </div>
      </div>
      <div class="flex align-items-center">
        <Button
          style="
            margin: 0 5px;
            border-radius: 2.5rem;
            background-color: rgb(79, 18, 192);
          "
          label="Edit"
          @click="handleClickEdit(one)"
        />
        
      </div>
    </div>
    <Divider class="w-full block lg:hidden surface-border"></Divider>
  </div -->

<script lang="ts">
import { defineComponent } from "vue";
import { productStore, type Product } from "@/stores/product";
import { mapActions, mapState, mapWritableState } from "pinia";
import ProductDialog from "@/components/product/Dialog.vue";

export default defineComponent({
  components: { ProductDialog },
  data() {
    return {
      searchQuery: "",
      expandedRows: [] as Array<Product>,
    };
  },
  computed: {
    ...mapState(productStore, ["products"]),
    ...mapWritableState(productStore, [
      "one",
      "visible",
      "checked",
      "selected",
    ]),

    filteredResources() {
      if (this.searchQuery) {
        return this.products.filter((one) => {
          return one.name.startsWith(this.searchQuery);
        });
      } else {
        return this.products;
      }
    },
  },
  created() {
    this.fetchData();
  },
  methods: {
    ...mapActions(productStore, [
      "fetchData",
      "fetchOne",
      "delete",
      "update",
      "create",
    ]),

    // selectRow() {
    //   if (!one.id) return;
    //   const index = this.selected.indexOf(one.id);

    //   if (index > -1) {
    //     this.selected.splice(index, 1);
    //   } else {
    //     this.selected.push(one.id);
    //   }
    //   console.log(this.selected);
    // },

    handleClickEdit(abc: Product) {
      this.visible = true;
      this.one = abc; // khi bấm nút edit abc có tất cả giá trị của one
    },

    async delProduct() {
      let ids = this.selected.map((one) => Number(one.id)); // lấy các phần tử có trong yêu cầu
      console.log(this.selected);
      if (!ids) return; // nếu ko có thì return
      for (let id of ids) {
        await this.delete(id);
      }
      // this.selected.forEach( (one:Product) => {
      //   //lấy phần tử trong mảng selected
      //   await this.delete(Number(one.id));
      // });
      await this.fetchData();
    },

    // func handle click button edit
    handleClickAdd() {
      this.visible = true;
      this.one = {
        name: "",
        image: "",
        price: 0,
        category: "",
        review: "",
        status: "",
        description: "",
      };
    },
    async onRowExpand(e: any) {
      const res: Product = await this.fetchOne(e.data.id);
      if (res) this.expandedRows = [res];
    },
  },
});
</script>

<style scoped>
.del-btn{
  background: rgb(240, 71, 71);
}
.del-btn:hover {
  background: red;
}
.mr-2{
  font-weight: 600;
}
.add-btn:hover {
  background: rgb(245, 139, 156);
}
section {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 400px; /* Điều chỉnh chiều rộng tối đa của section */
  margin: 0 auto; /* Đưa section vào giữa màn hình */
  padding: 1rem;
  background-color: #f2f5f8; /* Màu nền */
  border: 1px solid #d9e2ec; /* Màu viền */
  border-radius: 0.25rem;
}

.imag {
  max-width: 100%;
  height: auto;
  max-height: 200px; /* Điều chỉnh chiều cao tối đa của ảnh */
  box-shadow: 10px 10px 5px #ccc;
}

.titleImag {
  margin-top: 1rem;
}

.sub-titleImag {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.sub-titleImag p {
  font-size: 1.25rem;
  font-weight: bold; /* Định dạng in đậm */
  color: #333; /* Màu sắc */
}

.sub-titleImag span {
  font-size: 1.875rem;
  font-weight: bold; /* Định dạng in đậm */
  color: #333; /* Màu sắc */
}

.list-none {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.p-3 {
  padding: 0.75rem;
}

.font-bold {
  font-weight: bold;
}

.border-bottom-1 {
  border-bottom-width: 1px;
  border-bottom-style: solid;
}

.border-300 {
  border-color: #d9e2ec; /* Màu viền */
}
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
</style>
