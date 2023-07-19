<template>
  <Dialog
    v-model:visible="visible"
    appendTo="body"
    :modal="true"
    :breakpoints="{ '960px': '75vw', '640px': '100vw' }"
    :style="{ width: '40vw' }"
    :header="title"
  >
    <div class="flex flex-wrap border-top-1 surface-border pt-4">
      <div class="bg-blue-50 flex items-center justify-center py-3 px-0 w-full md:w-4 rounded">
        <img
          :src="one.image"
          alt="Image"
          class="w-9"
          onerror="this.src='https://file.vfo.vn/hinh/2014/4/hoi-cham-60.jpg'"
        />
      </div>
      <div class="text-700 line-height-3 m-0 p-5 w-full md:w-8">
        <InputText
          type="text"
          v-model="one.name"
          placeholder="Name"
          :class="v$.one.name.$error === true ? 'p-invalid' : 'input-field'"
          aria-describedby="text-error"
          style="width: 100%"
        />
        <small
          type="text"
          v-for="error of v$.one.name.$errors"
          :key="error.$uid"
        >
          {{ error.$message }}
        </small>
        <input
          type="text"
          v-model="one.image"
          placeholder="Image URL"
          class="input-field"
        />

        <input
          type="number"
          v-model="one.price"
          placeholder="Price"
          class="input-field"
        />
        <input
          type="text"
          v-model="one.category"
          placeholder="Category"
          class="input-field"
        />
        <input
          type="text"
          v-model="one.review"
          placeholder="Review"
          class="input-field"
        />
        <input
          type="text"
          v-model="one.status"
          placeholder="Status"
          class="input-field"
        />
        <input
          type="text"
          v-model="one.description"
          placeholder="Description"
          class="input-field"
        />
      </div>
    </div>
    <template #footer>
      <div class="border-top-1 surface-border pt-3">
        <Button
          @click="visible = false"
          label="Cancel"
          :style="{ color: 'black', fontSize: '16px' }"
          class="cancel-btn"
        ></Button>
        <!-- <Button
            icon="pi pi-check"
            v-if = "!one.id"
            @click="addData()"
            label="Submit"
          ></Button>
          <Button
            icon="pi pi-check"
            v-else = "one.id"
            @click="updateProduct()"
            label="Save"
          ></Button> -->
        <!-- <Button
          @click="submit()"
          :label="buttonLabel"
          :style="classButton, (color: black)"
          class="enter-btn"
        ></Button> -->
        <Button
          @click="submit()"
          :label="buttonLabel"
          :style="{ ...classButton, color: 'black', fontSize: '16px' }"
          class="enter-btn"
        ></Button>
      </div>
    </template>
  </Dialog>
</template>
<script>
import { defineComponent } from "vue";
import { productStore } from "@/stores/product";
import { mapActions, mapState, mapWritableState } from "pinia";
import useVuelidate from "@vuelidate/core";
import { required, url, numeric } from "@vuelidate/validators";
export default defineComponent({
  data() {
    return {
      v$: useVuelidate(),
    };
  },
  validations() {
    return {
      one: {
        name: { required },
        // image: { url },
        // price: { required, numeric },
        // category: { required },
        // review: { required },
        // status: { required },
        // description: { required },
      },
    };
  },
  computed: {
    ...mapState(productStore, ["products"]),
    ...mapWritableState(productStore, ["one", "visible"]),
    title() {
      return this.one.id ? "Edit" : "Create";
    },
    buttonLabel() {
      return this.one.id ? "Enter" : "Create";
    },
    classButton() {
      return {
        color: "blue",
        fontSize: "24px",
      };
    },
  },
  methods: {
    ...mapActions(productStore, ["fetchData", "update", "create"]),
    async submit() {
      this.v$.$touch();
      console.log(this.v$);
      if (this.v$.$error) return;

      await (!this.one.id
        ? this.create({ ...this.one })
        : this.update({ ...this.one }));
      this.visible = false;
      await this.fetchData();
    },
    async updateProduct() {
      await this.update({ ...this.one });
      this.visible = false;
      await this.fetchData();
    },
    async addData() {
      if (!{ ...this.one }) return;
      else {
        await this.create({ ...this.one });
        this.visible = false;
        await this.fetchData();
      }
    },
  },
});
</script>
<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}
.cancel-btn {
  height: 50px;
  border: none;
  background: rgb(240, 71, 71);
}
.cancel-btn:hover {
  background: red;
}
.enter-btn {
  height: 50px;
  border: none;
  background: pink;
}
.enter-btn:hover {
  background: rgb(250, 148, 165);
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

.p-invalid:focus {
  outline: none;
  border-color: red;
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
