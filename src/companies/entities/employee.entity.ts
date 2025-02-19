import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { TEmployeeForEntity } from '../../interfaces/employee.interface'
import { CompaniesEntity } from './companies.entity';

@Entity('employee')
export class EmployeeEntity implements TEmployeeForEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    fio: string;
    @Column()
    companyId: number;
    @Column()
    create_time: number
    @Column()
    departmentId: number
    @Column()
    positionId: number
    @Column()
    hireDate: number
    @Column()
    employeeBirthday: number
    @Column()
    employeePhone: string
    @Column()
    employeeEmail: string
    @Column()
    employeeAddress: string
    @Column()
    passportSerial: string
    @Column()
    innNumber: string
    @Column()
    snilsNumber: string
    @Column()
    empRecordNumber: number
    @Column()
    employeeSalary: number
    @Column()
    passportPlace: string

    @ManyToOne(() => CompaniesEntity, (company) => company.employees)
    company: CompaniesEntity
}