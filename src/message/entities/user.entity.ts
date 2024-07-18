import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { Tenant } from './tenant.entity';

@Entity({ name: 'users' })
export class Users {
    @PrimaryGeneratedColumn({ primaryKeyConstraintName: 'PK_users.id' })
        id: number;

    @ManyToOne(() => Tenant, (tenant) => tenant.id)
    @JoinColumn({ name: 'tenant_id', foreignKeyConstraintName: 'FK_tenant_id.TO.tenants.id' })
        tenantId: number;

    @Column({ nullable: false })
        username: string;

    @Column({ nullable: false })
        password: string;

    @Column({ nullable: false })
        email: string;

    @CreateDateColumn({ name: 'created_at' })
        createdAy: Date;
    @CreateDateColumn({ name: 'updated_at' })
        updatedAt: Date;
}
