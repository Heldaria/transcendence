<script setup lang="ts">
const client = useClient();

</script>

<template>
    <!-- div principale -->
    <div class="w-100 bg-zinc-700 px-2 py-6 rounded-lg relative flex-col">
        <!-- div user/bouton -->
        <div class="flex justify-between">
            <!-- div bouton pour fermer -->
            <div @click="client.chat.showUserProfile = false"
                class="text-2xl py+6 hover:bg-white-500 cursor-pointer hover:text-white rounded m-1 text-black absolute right-0 top-0">
                <div class="i-mdi:close"></div>
            </div>
            <!-- div avatar user -->
            <div class="flex flex-col justify-center p-2 ">
                <img :src="client.chat.chatState.receiver.avatarPath" class="w-14 h-14 rounded-full" />
            </div>
            <!-- div bouton -->
            <div class=" p-2 ">
                <button class="bg-zinc-600 hover:bg-zinc-500 rounded-lg text-zinc-200 text-sm px-4 py-2 mt-2">
                    <div class="flex">
                        <div class="i-mdi:account-multiple-plus"></div>
                        <p class=" text-md text-zinc-200 pl-3" >Add friend</p>
                    </div>
                </button>
            </div>
        </div>

        <!-- div rectangle noir -->
        <div class="top-4 bg-zinc-800 px-3 py-4 rounded-lg relative flex-col">
            <!-- div pseudo -->
            <div class="flex flex-col justify-center ">
                <p class=" text-lg text-zinc-200" >{{ client.chat.chatState.receiver.username }}</p>
                <!-- <p class=" text-xs text-zinc-400" >ELO : {{ client.chat.chatState.receiver.ladderPoint}}</p> -->
            </div>
            <!-- div boutons -->
            <div class="flex border-b border-zinc-600">
                <button class="border-b border-zinc-800 hover:border-zinc-200 text-zinc-200 mt-2 mr-5 py-3">
                        <p class=" text-sm text-zinc-200" >Informations</p>
                </button>
                <button class="border-b border-zinc-800 hover:border-zinc-200  text-zinc-200 mt-2 mr-5 py-3">
                        <p class=" text-sm text-zinc-200" >Common channels</p>
                </button>
                <button class=" border-b border-zinc-800 hover:border-zinc-200 text-zinc-200 mt-2 mr-5 py-3">
                        <p class=" text-sm text-zinc-200" >Game history</p>
                </button>
            </div>
            <!-- div info selon bouton -->
            <div class="flex flex-col justify-center">
                <p class=" text-sm text-zinc-200 py-6" >Info selon bouton</p>
            </div>
        </div>
    </div>
</template>