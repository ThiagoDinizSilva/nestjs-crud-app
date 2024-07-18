import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { MessageModule } from './message/message.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './authentication/auth.service';
import { AuthStrategy } from './authentication/auth.strategy';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: `./enviroment/${process.env.NODE_ENV ?? 'DEV'}/.env`,
            isGlobal: true,
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => typeOrmConfig(configService),
        }),
        JwtModule.register({
            secret: process.env.JWT_PRIVATE_KEY,
            signOptions: { expiresIn: '30m' },
        }),
        MessageModule,
    ],
    providers: [AuthService, AuthStrategy],
})
export class AppModule {}
