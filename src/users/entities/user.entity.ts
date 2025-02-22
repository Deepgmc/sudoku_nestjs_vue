import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { TUserWithoutPassword, IUser } from '../../interfaces/user.interface'


@Entity('users')
export class UsersEntity implements IUser {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    age: number;

    @Column()
    password: string;
}