import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { TUserWithoutPassword } from '../../interfaces/user.interface'


@Entity('users')
export class UsersEntity implements TUserWithoutPassword {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    age: number;
}