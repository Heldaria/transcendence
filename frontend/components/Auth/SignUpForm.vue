<script setup lang="ts">
const client = useClient()
const auth = useAuth()
const username = ref('')
const email = ref('')
const password = ref('')
const isValid = computed(() => {
    return username.value !== '' && email.value !== '' && password.value !== ''
})

import '/frontend/public/styles/home.css';

</script>
<template>
    <div class="p-6 relative w-full">
        <h1 class="home-font px-4 pt-2 text-4xl text-center">First time ? </h1>
        <h1 class="home-font px-4 pb-6 text-4xl mb-6 text-center">Let's create your account !</h1>
        
        <form @submit.prevent="client.auth.signup({ username, email, password })" class="flex flex-col gap-2 w-full" autocomplete="off" autocorrect="off">
            <div class="term-box flex flex-col">
                <!-- Username input -->
                <div class="flex flex-row w-full p-5">
                    <span class="home-font text-2xl">Username:</span>
                    <input type="username" v-model="username" name="username"
                        class="w-full px-3 text-2xl home-font outline-0" style="background-color: transparent; caret-color:rgb(0, 255, 191);" />
                </div>
                <!-- Email input -->
                <div class="flex flex-row w-full px-5 pb-5">
                    <span class="home-font text-2xl">Email:</span>
                    <input type="email" v-model="email" name="email"
                        class="w-full px-3 text-2xl home-font outline-0" style="background-color: transparent; caret-color:rgb(0, 255, 191);" />
                </div>
                <!-- Password input -->
                <div class="flex flex-row w-full px-5">
                    <span class="home-font text-2xl">Password:</span>
                    <input type="password" v-model="password" name="password"
                        class="w-full px-3 text-2xl home-font outline-0" style="background-color: transparent; caret-color:rgb(0, 255, 191);" />
                </div>

                <div class="px-5 text-red">
                    {{ auth.error }}
                </div>

                <!-- Signup -->
                <div class="text-center pb-5">
                    <button type="submit" class="home-font home-button layers hero glitch text-4xl " :class="{
                        'transition duration-300': isValid,
                    }"  data-text="LOG IN">
                        SIGN UP
                    </button>
                </div>
            </div>

            <div>
                <div class="home-font px-4 pt-20 text-4xl mb-6 text-center">
                    Remembered you already have an account ?
                </div>
            </div>

            <a href="#" class="text-center items-center p-4 home-font home-button layers hero glitch text-3xl cursor-pointer hover:color-white" data-text="Log in" @click="auth.mode = 'login'">
                Log in
            </a>
        </form>
    </div>
</template>