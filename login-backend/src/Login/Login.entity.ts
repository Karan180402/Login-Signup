import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('login')
export class Login {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column()
    username: string;
}
