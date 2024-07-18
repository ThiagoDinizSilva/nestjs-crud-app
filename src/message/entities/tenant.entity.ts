import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'tenants' })
export class Tenant {
    @PrimaryGeneratedColumn({ primaryKeyConstraintName: 'PK_tenants.id' })
        id: number;

    @Column({ nullable: false })
        name: string;

    @Column('text', { nullable: true })
        description: string;
}
