import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { ICompanies } from '../../interfaces/companies.interface'

import { EmployeeEntity } from './employee.entity';


@Entity('company')
export class CompaniesEntity implements ICompanies {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    address: string;

    @OneToMany(() => EmployeeEntity, (employee) => employee.company)
    employees: EmployeeEntity[]
}