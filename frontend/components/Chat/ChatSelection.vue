<script setup lang="ts">
  const auth = useAuth();
  const client = useClient();
  const socket = useSocket();
  const channel = useChannel();

  const toggleChat = () => {
    client.chat.chatVisible = !client.chat.chatVisible;
    if (client.chat.chatVisible === false)
      handleAFK(true);
    else
      handleAFK(false);
  };
  const handleAFK = (status:boolean) => {
    if (status === true)
      socket.emit('afk', {
        sender: auth.session.username,
        text: 'OFFLINE',
      });
    else
      socket.emit('afk', {
        sender: auth.session.username,
        text: 'ONLINE',
      });
  };  

  const refreshUsers = async () => {
    client.chat.usersArray = await client.chat.getAllUsers();
    client.chat.channelArray = await channel.getAllChannels();
  };

const chatWithUser = async (userToMessage : any) => {
    if (client.chat.chatState.receiver.id != userToMessage.id || client.chat.chatState.select != 'DM')
      client.chat.clearChat();
    client.chat.chatState.select = 'DM';
    client.chat.chatState.receiver.id = userToMessage.id;
    client.chat.chatState.receiver.username = userToMessage.username;
    client.chat.chatState.receiver.avatarPath = userToMessage.avatarPath;
    client.chat.chatState.receiver.victories = userToMessage.victories;
    client.chat.chatState.receiver.defeats = userToMessage.defeats;
    client.chat.chatState.receiver.ladderPoint = userToMessage.ladderPoint;
  };
  const chatWithChannel = async (channelToMessage : any) => {
    if (client.chat.chatState.receiver.id != channelToMessage.id || client.chat.chatState.select != 'CHANNEL')
      client.chat.clearChat();
    client.chat.chatState.select = 'CHANNEL';
    client.chat.chatState.receiver.id = channelToMessage.id;
    client.chat.chatState.receiver.name = channelToMessage.name;
    socket.emit('joinChannel', {
      sender: auth.session.username,
      receiver: client.chat.chatState.receiver.name,
    });
  };
</script>

<template>
     <div class="w-1/3 overflow-y-auto scrollbar-w-2 h-[70vh] bg-zinc-800 rounded-lg px-2 py-2 flex flex-col">
        <button @click="toggleChat" class="px-2 py-2 text-left text-zinc-200 hover:text-zinc-400">
          Close
        </button>
        <!-- MP -->
        <button @click="refreshUsers" class="text-sm mb-2 mt-2 text-left text-zinc-200 hover:text-zinc-400 font-semi-bold px-2 py-2">
          Messages privés
        </button>
        <div v-for="user in client.chat.usersArray" @click="chatWithUser(user)" class="mb-1 flex w-full hover:bg-zinc-700 cursor-pointer rounded">
          <div v-if="user.username !== auth.session.username" :class="{ 'bg-zinc-700 w-full rounded flex': (client.chat.chatState.receiver.id === user.id && client.chat.chatState.select === 'DM'),
                                                                        'flex': (client.chat.chatState.receiver.id !== user.id || client.chat.chatState.select !== 'DM') }" >
              <div class="flex flex-col justify-center relative w-8 ">
                  <img :src="user.avatarPath" class="ml-1 w-6 h-6 mr-auto rounded-full" />
                  <img v-if="user.status==='ONLINE'" src="Location_dot_green.svg" class="absolute bottom-1 right-0 w-3 h-3 border-3 border-zinc-800 rounded-full" />
                  <img v-else="user.status==='OFFLINE'" src="Location_dot_grey.svg" class="absolute bottom-1 right-0 w-3 h-3 border-3 border-zinc-800 rounded-full" />
              </div>
              <div class="flex-col justify-center">
                  <div :class="{'px-2 py-2 ml-1 text-sm text-left text-zinc-300':user.status === 'ONLINE', 
                                'px-2 py-2 ml-1 text-sm text-left text-zinc-500':user.status === 'OFFLINE'}">
                    {{ user.username }}
                  </div>
              </div>
          </div>
        </div>
        <!-- Channel -->
        <button class="text-sm mb-2 mt-2 text-left text-zinc-200 hover:text-zinc-400 font-semi-bold px-2 py-2">
          Channels
        </button>
        <div v-for="channelList in client.chat.channelArray" :class="{ 'bg-zinc-700 text-zinc-200 cursor-pointer rounded flex': (client.chat.chatState.receiver.id === channelList.id && client.chat.chatState.select === 'CHANNEL'),
                                                                        'bg-zinc-800 cursor-pointer hover:bg-zinc-700 rounded flex': (client.chat.chatState.receiver.id !== channelList.id || client.chat.chatState.select !== 'CHANNEL') }" >
          <div class="{'bg-zinc-700 text-zinc-200 cursor-pointer rounded-lg': client.chat.receiver === user.username,
                        'bg-zinc-800 cursor-pointer hover:bg-zinc-700 rounded-lg flex': client.chat.receiver !== user.username}" >
            <button @click="chatWithChannel(channelList)" class="px-2 py-2 w-full text-sm text-left text-zinc-300 cursor-pointer':user.status">
              #{{ channelList.name }}
            </button>
          </div>
        </div>
      </div>
</template>