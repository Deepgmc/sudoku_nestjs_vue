import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { IUser } from '../../interfaces/user.interface'


@Entity('users')
export class UsersEntity implements IUser {
    @PrimaryGeneratedColumn()
    userId: number;

    @Column()
    username: string;

    @Column()
    age: number;

    @Column()
    password: string;

    @Column()
    email: string;
}