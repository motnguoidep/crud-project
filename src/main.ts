import './assets/main.css'
import PrimeVue from 'primevue/config';
import "primeflex/primeflex.css";
//theme
import "primevue/resources/themes/lara-light-indigo/theme.css";     

//core
import 'primeicons/primeicons.css';
import "primevue/resources/primevue.min.css";
import Button from 'primevue/button'
import Dialog from 'primevue/dialog';
import Divider from 'primevue/divider';
import InputText from 'primevue/inputtext';
import Checkbox from 'primevue/checkbox';
import Textarea from 'primevue/textarea';
import InlineMessage from 'primevue/inlinemessage';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import ColumnGroup from 'primevue/columngroup';   // optional
import Row from 'primevue/row';

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import Paginator from 'primevue/paginator';
import Chips from 'primevue/chips';
import App from './App.vue'
import router from './router'

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCJSe6NRHJXxmqrvJ0TAGsd9pSAWx77aYk",
  authDomain: "crud-84221.firebaseapp.com",
  projectId: "crud-84221",
  storageBucket: "crud-84221.appspot.com",
  messagingSenderId: "602005505921",
  appId: "1:602005505921:web:275ee91704b98434a64a80",
  measurementId: "G-J3T3YRJFDV"
};

// Initialize Firebase
initializeApp(firebaseConfig);

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(PrimeVue)
app.component('Dialog',Dialog)
app.component('Divider',Divider)
app.component('InputText',InputText)
app.component('Button', Button)
app.component('InlineMessage',InlineMessage)
app.component('Checkbox', Checkbox)
app.component('Paginator', Paginator)
app.component('Chips',Chips)
app.component('TextArea', Textarea)
app.component('DataTable',DataTable)
app.component('Column',Column)
app.component('ColumnGroup',ColumnGroup)
app.component('Row',Row)
app.mount('#app')
