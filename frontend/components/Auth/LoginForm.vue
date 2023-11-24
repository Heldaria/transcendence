<script setup lang="ts">
const client = useClient()
const auth = useAuth()
const email = ref('')
const password = ref('')


const isValid = computed(() => {
    return email.value !== '' && password.value !== ''
})

const loginGoogle = async () => {
    await client.auth.loginWithGoogle()
}

import '/frontend/public/styles/home.css';

</script>
<template>
   <div class="p-6 relative w-full">
       
        <div class="home-font px-4 py-6 text-4xl mb-6 text-center">Log in to your account</div>
        <form @submit.prevent="client.auth.authenticateUser({
                email: email,
                password: password
            })" class="flex flex-col gap-2 w-full" autocomplete="off">

            <div class="term-box flex flex-col">
                <!-- Email Input -->
                <div class="flex flex-row w-full p-5">
                    <span class="home-font text-2xl">Email:</span>
                    <input type="email" v-model="email" name="email"
                        class="w-full px-3 text-2xl home-font outline-0" style="background-color: transparent; caret-color:rgb(0, 255, 191);"/>
                </div>

                 <!-- Password Input -->
                <div class="flex flex-row w-full px-5">
                    <span class="home-font text-2xl">Password:</span>
                    <input type="password" v-model="password" name="password"
                        class="px-3 text-2xl home-font outline-0" style="background-color: transparent; caret-color:rgb(0, 255, 191);"/>
                </div>

                <div class="px-5 text-red">
                    {{ auth.error }}
                </div>

                <!-- Default Login-->
                <div class="text-center pb-5">
                <button class="home-font home-button layers hero glitch text-4xl " :class="{
                    'transition duration-300': isValid,
                }"  data-text="LOG IN">
                    LOG IN
                </button>
                </div>
            </div>

            <div>
                <div class="home-font px-4 pt-10 text-4xl mb-6 text-center">
                    You do not have an account yet ?
                </div>
            </div>

            <a href="#" class="text-center items-center p-4 home-font home-button layers hero glitch text-2xl cursor-pointer hover:color-white" data-text="Sign up" @click="auth.mode = 'signup'">
                Sign up
            </a>

            <div class="flex flex-row gap-20 w-full justify-center items-center">
                <!-- Google Login-->
                <div class="flex flex-row gap-2">
                    <div>
                        <img src="../../public/google_signin_logo.png" alt="Google Logo" class="py-3 w-8 home-font home-button layers hero glitch" />
                    </div>
                    <button type="button" @click="loginGoogle" class="items-center text-2xl home-font home-button layers hero glitch text-left cursor-pointer hover:color-white py-4"
                        data-text="Sign in with Google">Sign in with Google
                    </button>
                </div>


                 <!-- 42 Login-->
                <div class="flex flex-row gap-2">
                    <div>
                        <img src="../../public/42_Logo.png" alt="42 Logo" class="w-8 home-font home-button layers hero glitch" />
                    </div>
                    <button type="button" @click="login42" class="text-2xl home-font home-button layers hero glitch cursor-pointer hover:color-white" data-text="Sign in with Intra">
                        Sign in with Intra
                    </button>
                </div>

            </div>
        </form>
    </div>
</template> 