import axios from "axios";
import { defineStore } from "pinia";

export interface Product {
  id?: number;
  name: string;
  image: string;
  price: number;
  category: string;
  review: string;
  status: string;
  description: string;
}

interface ProductStore {
  products: Array<Product>;
  one: Product;
  visible: boolean;
  checked: boolean;
  selected: Array<Product>;
  searchQuery: Array<Product>;
}

function initState(): ProductStore {
  return {
    products: [],
    one: {
      name: "",
      image: "",
      price: 0,
      category: "",
      review: "",
      status: "",
      description: "",
    },
    visible: false,
    checked: false,
    selected: [],
    searchQuery: [],
  };
}
export const productStore = defineStore("productStore", {
  state: () => {
    return initState();
  },
  actions: {
    async fetchData() {
      await axios
        .get(`https://64953103b08e17c91791b68d.mockapi.io/crud`)
        .then((response) => {
          this.products = response.data;
        });
    },
    async fetchOne(id:number){
      return await axios
      .get(`https://64953103b08e17c91791b68d.mockapi.io/crud/${id}`)
      .then(response => response.data)
      
    },
    async create(one: Product) {
      console.log(one);
      await axios
        .post(`https://64953103b08e17c91791b68d.mockapi.io/crud`, one)
        .then((response) => console.log(response))
        .catch(function (error) {
          console.log(error);
        });
    },

    async delete(id: number) {
      const r = await axios
        .delete(`https://64953103b08e17c91791b68d.mockapi.io/crud/${id}`)
        .catch((error) => console.log(error));
        console.log(r);
    },
    async update(one: Product) {
      await axios
        .put(`https://64953103b08e17c91791b68d.mockapi.io/crud/${one.id}`, one)
        .catch((error) => console.log(error));
    },

    async resultQuery() {
      if (this.searchQuery) {
        return this.products.filter((one) => {
          return this.searchQuery
            .toString()
            .toLowerCase()
            .split(" ")
            .every((v) => one.name.toLowerCase().includes(v));
        });
      } else {
        return this.products;
      }
    },
  },
});
