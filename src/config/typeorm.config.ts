import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import * as path from 'path';

function getEnvVariable(configService: ConfigService, key: string): string {
    const value = configService.get<string>(key);
    if (!value) {
        throw new Error(`Missing environment variable: ${key}`);
    }
    return value;
}

export const typeOrmConfig = (configService: ConfigService): TypeOrmModuleOptions => ({
    type: 'postgres',
    host: getEnvVariable(configService, 'DB_HOST'),
    port: parseInt(getEnvVariable(configService, 'DB_PORT'), 10),
    username: getEnvVariable(configService, 'DB_USERNAME'),
    password: getEnvVariable(configService, 'DB_PASSWORD'),
    database: getEnvVariable(configService, 'DB_DATABASE'),
    entities: [path.join(__dirname, '/../**/*.entity{.ts,.js}')],
    synchronize: true,
});
