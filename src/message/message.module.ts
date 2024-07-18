import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from './entities/message.entity';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';
import { AuthService } from '../authentication/auth.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports: [TypeOrmModule.forFeature([Message]), JwtModule],
    controllers: [MessageController],
    providers: [MessageService, AuthService],
})
export class MessageModule {}
