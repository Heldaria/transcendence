import { defineStore } from 'pinia'
import { useFetch } from '#app'
import { io } from 'socket.io-client'
import { useAuth } from './auth'

//remove later
interface AppChannel {

    getAllChannels: () => any // get all channels
}

export const useChannel = defineStore('channel', () => {
    const channel: AppChannel = {} as AppChannel
    const authStore = useAuth()

    channel.getAllChannels = async () => {

        const { data, error } = await useRequest('/socket/getallchannels', {
            method: 'GET',
        })

        if (error.value?.statusCode) {
            authStore.error = error.value?.statusMessage as string
            return null
        }

        return data.value
    }

    return channel
})
