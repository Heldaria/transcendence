import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { ChannelService } from '../channel/channel.service';
import { find } from 'rxjs';
import { Access } from '@prisma/client';
import { channel } from 'diagnostics_channel';
//import { ChannelService } from '../channel/channel.service';

@Controller('socket')
export class SocketController {
    constructor(
        private readonly userService: UsersService,
        private channelService: ChannelService,
    ) { }

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

    @Post('getallchannels')
    async GetOnlineChannels(@Body() body: any) {
        const channelsList = await this.channelService.findAllChannels();
        let temp = -1;
        for (let i = 0; i < channelsList.length; i++) {
            if (channelsList[i].access === 'PRIVATE') {
                for (let j = 0; j < channelsList[i].userInvited.length; j++) {
                    if (channelsList[i].userInvited[j].id === body.userId) {
                        temp = channelsList[i].id;
                    }
                }
                channelsList[i].id = temp;
                temp = -1;
            }
            delete channelsList[i].userInvited;
        }
        //console.log('channelsList = ', channelsList);
        return channelsList;
    }

    @Post('getchannels')
    async GetChannels(@Body() body: any) {
        const channelsList = await this.channelService.findChannels(
            body.userId,
        );
        return channelsList;
    }

    @Post('gethistory')
    async GetHistory(@Body() body: any) {
        const history = await this.userService.findHistory(body);
        return history;
    }

    @Post('getchannelhistory')
    async GetChannelHistory(@Body() body: any) {
        const history = await this.channelService.findChannelHistory(body);
        return history;
    }

    //todo Anaïs
    //gérer le fait de rejoindre des channels privés
    //gérer le fait de rejoindre des channels protégés
    @Post('createchannel')
    async CreateChannel(
        @Body() body: { name: string; access: Access; password: string },
    ) {
        //console.log('in socket controller, create channel : BODY = ', body);
        const channel = await this.channelService.createChannel(
            body.name,
            body.access,
            body.password,
        );

        // console.log(
        //     'in socket controller, create channel : CHANNEL = ',
        //     channel,
        // );
        return channel;
    }

    @Post('leavechannel')
    async LeaveChannel(
        @Body()
        body: {
            channelName: string;
            channelId: number;
            userId: number;
            userName: string;
        },
    ) {
        const channelUser = await this.channelService.leaveChannel(
            body.channelId,
            body.userId,
        );
        return channelUser.count;
    }

    @Post('addusertochannel')
    async AddUserToChannel(
        @Body() body: { channelName: string; username: string },
    ) {
        const channelUser = await this.channelService.addUserToChannel(
            body.channelName,
            body.username,
        );
        return channelUser;
    }

    @Post('deleteuserfromchannel')
    async DeleteUserFromChannel(
        @Body() body: { channelName: string; username: string },
    ) {
        const channelUser = await this.channelService.deleteUserFromChannel(
            body.channelName,
            body.username,
        );
        return channelUser;
    }
}
