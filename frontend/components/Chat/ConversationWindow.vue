<script setup lang="ts">
const client = useClient();
const auth = useAuth();

</script>

<template>
  <div class="flex flex-col w-2/3 p-2 m-2">
        <!-- Messages -->
        <ChatMessageWindowDM/>

        <!-- Channel -->
        <ChatMessageWindowChannel/>
      
        <!-- Input -->
        <ChatMessageWindowInputField/>
      </div>
</template>