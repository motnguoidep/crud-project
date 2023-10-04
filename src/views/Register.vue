<template>
    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login form</title>
    <link rel="stylesheet" href="https://www.unpkg.com/boxicons@2.1.4/css/boxicons.min.css">
</head>
<body>
    <div class="wrapper">
            <h1>Create an Account</h1>
            <div class="input-box">
                <input type="text" placeholder="Email" v-model="email"/>
                <i class="bx bxs-user"></i>
            </div>
            <div class="input-box">
                <input type="password" placeholder="Password" v-model="password"/>
                <i class="bx bxs-lock-alt"></i>
            </div>
            <p v-if ="errMsg">{{ errMsg }}</p>
            
                <button class="btn" @click="register">Submit</button>
            <div class="register-link">
                <button class="btn" @click="signInWithGoogle">Sign In With Google</button>
            </div>
    </div>
</body>
</template>

<script setup>
import {ref} from "vue";
// import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getAuth, createUserWithEmailAndPassword,GoogleAuthProvider, signInWithPopup} from "firebase/auth";
import { useRouter } from "vue-router";
const email = ref("");
const password = ref("");
const router = useRouter();


const register = () =>{
    createUserWithEmailAndPassword(getAuth(), email.value, password.value)
    .then((data) =>{
        console.log("Successful")
        router.push('/product')
    })
    .catch((error) =>{
        console.log(error.code)
    });
}

const signInWithGoogle = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(getAuth(),provider)
        .then((result) =>{
            console.log(result.user);
            router.push('/product')
        })
        .catch((error) =>{
        console.log(error.code)
    });
    }
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@100&display=swap" );
*{
    margin:  0;
    padding: 0;
    box-sizing: border-box;
    font-family: "Poppins", sans-serif;
}
body {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background-size: cover ;
    background-position: center;
    background: url(https://scontent.fhan20-1.fna.fbcdn.net/v/t1.6435-9/135523774_453184712515526_2434962383091556590_n.jpg?stp=dst-jpg_p960x960&_nc_cat=102&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=SqlE8e75TxkAX-YuHP0&_nc_ht=scontent.fhan20-1.fna&_nc_e2o=s&oh=00_AfBqOBT2-9TBqO4Hot9R3IJRiEAWgQgxkskLDRIHMyTNvg&oe=6544A10E);
}
.wrapper {
    width: 420px;
    background: transparent;
    border: 2px solid rgb(red, green, blue,0.2);
    backdrop-filter: blur(20px);
    box-shadow: 0 0 10px rgbz(0,0,0,0.2);
    color: #fff;
    border-radius:10px;
    padding: 30px 40px;

}
.wrapper h1{
    font-size: 36px;
    text-align:  center;
}
.wrapper .input-box{
    position: relative;
    width: 100%;
    height: 100%;
    margin: 30px 0;
}
.input-box input{
    height: 100%;
    width: 100%;
    background: transparent;
    border: none;
    outline: none;
    border: 2px solid rgb(red, green, blue, 0.2);
    border-radius: 40px;
    font-size: 16px;
    color: #fff;
    padding: 20px 45px 20px 30px;
}
.input-box input::placeholder{
    color: #fff;
}
.input-box i{
    position: absolute;
    right: 20px;
    top:50%;
    transform: translateY(-50%);
    font-size: 20px;
}
.wrapper .remember-forgot{
    display: flex;
    justify-content: space-between;
    font-size: 14.5px;
    margin: -15px 0 15px;
}
.remember-forgot label input{
    accent-color: #fff;
    margin-right: 3px;
}
.remember-forgot a{
color: #fff;
text-decoration: none;
}
.remember-forgot a:hover{
    text-decoration: underline;
}
.wrapper .btn{
    width: 100%;
    height: 45px;
    background: #fff;
    border:  none;
    outline: none;
    border-radius: 40px;
    box-shadow:  0 0 10px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    font-size: 16px;
    color: #333;
    font-weight: 600;
}

.wrapper .register-link{
    font-size: 14.5px;
    text-align: center;
    margin: 20px 0 15px;
}
.register-link p a{
    color: #fff;
    text-decoration:  none;
    font-weight: 600;
}

.register-link p a:hover{
    text-decoration: underline;
}
</style>
