/* eslint-disable @typescript-eslint/no-explicit-any */
import { Controller, Get, Post, Param, Put, Delete, Body, Req, UseGuards } from '@nestjs/common';
import { Message } from './entities/message.entity';
import { JwtAuthGuard } from '../authentication/jwt-auth.guard';
import { MessageService } from './message.service';

@Controller('Messages')
export class MessageController {
    constructor(private readonly messageService: MessageService) {}

    @Get()
    @UseGuards(JwtAuthGuard)
    findAll(@Req() req: any): Promise<Message[]> {
        const token = req.headers.authorization.split(' ')[1];
        return this.messageService.findAll(token);
    }

    @Get(':subject')
    @UseGuards(JwtAuthGuard)
    findOne(@Req() req: any, @Param('subject') subject: string): Promise<Message> {
        const token = req.headers.authorization.split(' ')[1];
        return this.messageService.findOne(token, subject);
    }

    @Post(':subject')
    @UseGuards(JwtAuthGuard)
    create(
        @Req() req: any,
        @Param('subject') subject: string,
        @Body() messageData: Partial<Message>
    ): Promise<Message> {
        const token = req.headers.authorization.split(' ')[1];
        return this.messageService.create(token, subject, messageData);
    }

    @Put(':subject')
    @UseGuards(JwtAuthGuard)
    update(@Req() req: any, @Param('subject') subject: string, @Body() updateData: Partial<Message>): Promise<Message> {
        const token = req.headers.authorization.split(' ')[1];
        return this.messageService.update(token, subject, updateData);
    }

    @Delete(':subject')
    @UseGuards(JwtAuthGuard)
    remove(@Req() req: any, @Param('subject') subject: string): Promise<void> {
        const token = req.headers.authorization.split(' ')[1];
        return this.messageService.remove(token, subject);
    }
}
