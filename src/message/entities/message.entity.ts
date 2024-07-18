import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, Index, JoinColumn } from 'typeorm';
import { Users } from './user.entity';
import { Tenant } from './tenant.entity';

@Entity({ name: 'messages' })
@Index(['tenantId', 'subject'], { unique: true })
export class Message {
    @PrimaryGeneratedColumn({ primaryKeyConstraintName: 'PK_messages.id' })
        id: number;

    @ManyToOne(() => Tenant, (tenant) => tenant.id)
    @JoinColumn({ name: 'tenant_id', foreignKeyConstraintName: 'FK_tenant_id.TO.tenants.id' })
        tenantId: number;

    @ManyToOne(() => Users, (users) => users.id)
    @JoinColumn({ name: 'author_id', foreignKeyConstraintName: 'FK_author_id.TO.users.id' })
        authorId: number;

    @Column({ nullable: false })
        subject: string;

    @Column({ nullable: false, type: 'text' })
        body: string;

    @Column({ default: true })
        status: boolean;

    @CreateDateColumn({ name: 'created_at' })
        createdAt: Date;
}
