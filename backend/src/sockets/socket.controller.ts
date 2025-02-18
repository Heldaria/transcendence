import { Controller, Get } from '@nestjs/common';
import { UsersService } from '../users/users.service';
//import { ChannelService } from '../channel/channel.service';

@Controller('socket')
export class SocketController {
    constructor(
        private readonly userService: UsersService,
       // private channelService: ChannelService,
    ) {}

    @Get('getonlineusers')
    async GetOnlineUsers() {
        const onlineUsersArray = await this.userService.findAllOnlineUsers();
        return onlineUsersArray;
    }

    @Get('getallusers')
    async GetAllUsers() {
        const allUsersArray = await this.userService.findAllUsers();
        return allUsersArray;
    }

    @Get('getofflineusers')
    async GetOfflineUsers() {
        const offlineUsersArray = await this.userService.findAllOfflineUsers();
        return offlineUsersArray;
    }

    @Get('getallchannels')
    async GetOnlineChannels() {
        //console.log(
        //    '------------------------enter in channel.controller !------------------------------',
        //);
        //const channelsList = await this.channelService.findAllChannels();
        const channelsList = await this.userService.findAllChannels();
        //console.log('channel List = ', channelsList);
        return channelsList;
    }
}
