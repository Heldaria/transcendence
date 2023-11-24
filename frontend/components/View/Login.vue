<script setup lang="ts">
const auth = useAuth()
const route = useRoute()
//const check2FA = route.query.require2FA !== undefined
//const show2FA = ref(false)
//if(check2FA === true) {
//    if (route.query.require2FA === 'true') {
//        show2FA.value = true
//    } else {
//        await auth.refreshSession()
//    }
//}

 import '/frontend/public/styles/home.css';

</script>

<template>
    <!-- Logged Out View -->
        <!-- <div class="h-full w-full" > -->
            <!-- Homepage -->
            <div class="h-full w-full video-container">
              <video class="top-0 bottom-0 left-0 right-0" autoplay loop muted preload="auto">
                <source src="/videos/grid.mp4" type="video/mp4">
              </video>
            </div >

            <div class="relative z-100 flex items-center flex-col gap-5 justify-start w-full h-full py-20 px-5">
              <div class="flex w-full max-w-1900px items-center h-100px">
                <button class="transition-all w-full big-title layers hero glitch neon-text text-3.5rem md:text-5rem lg:text-7rem" data-text="WELCOME TO PONG">WELCOME TO PONG</button>
              </div>
              <div class="grid sm:grid-cols-2 gap-5 max-w-1900px w-full">
                <div class="term-box flex flex-col">
                  <div class="home-font px-6 pt-10 text-5xl mb-6 text-center"> READY TO FIGHT ?</div>
                  <div class="px-5 py-5 flex items-center ">
                    <img class="h-full" src="/videos/green-pong.gif">
                  </div>
                </div>
                <div class="term-box flex" >
                    <Auth2FAForm v-if="auth.need2FA" />
                    <AuthLoginForm v-else-if="auth.mode === 'login'" />
                    <AuthSignUpForm v-else-if="auth.mode === 'signup'" />
                </div>
              </div>
            </div>
            
  </template>