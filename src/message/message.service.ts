import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from './entities/message.entity';
import { AuthService } from '../authentication/auth.service';

@Injectable()
export class MessageService {
    constructor(
        @InjectRepository(Message)
        private readonly messageRepository: Repository<Message>,
        private readonly authService: AuthService
    ) {}

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async findAll(_token: string): Promise<Message[]> {
        return await this.messageRepository.find();
    }

    async findOne(token: string, subject: string): Promise<Message> {
        const tenantId = await this.getTenantIdFromToken(token);
        const message = await this.messageRepository.findOne({
            where: { tenantId, subject },
        });

        if (!message) {
            throw new NotFoundException(`Message with tenantId ${tenantId} and subject ${subject} not found`);
        }

        return message;
    }

    async create(token: string, subject: string, messageData: Partial<Message>): Promise<Message> {
        const decodedToken = await this.authService.decode(token);
        const message = this.messageRepository.create({
            authorId: decodedToken.sub,
            body: messageData.body,
            subject,
            tenantId: decodedToken.iss,
            status: messageData.status,
        });
        return await this.messageRepository.save(message);
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async update(token: string, subject: string, updateData: Partial<Message>): Promise<Message> {
        const tenantId = await this.getTenantIdFromToken(token);
        const existingMessage = await this.findOne(token, subject);
        if (!existingMessage) {
            throw new NotFoundException(`Message with tenantId ${tenantId} and subject ${subject} not found`);
        }

        const updatedMessage = await this.messageRepository.save({
            ...existingMessage,
            ...{
                authorId: updateData.authorId,
                body: updateData.body,
                subject: updateData.subject,
                status: updateData.status,
            },
        });

        return updatedMessage;
    }

    async remove(token: string, subject: string): Promise<void> {
        const tenantId = await this.getTenantIdFromToken(token);
        const existingMessage = await this.findOne(token, subject);
        if (!existingMessage) {
            throw new NotFoundException(`Message with tenantId ${tenantId} and subject ${subject} not found`);
        }

        await this.messageRepository.delete(existingMessage.id);
    }

    private async getTenantIdFromToken(token: string): Promise<number> {
        const decoded = await this.authService.decode(token);
        return decoded.iss;
    }
}
