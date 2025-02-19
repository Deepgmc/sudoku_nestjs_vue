import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TEmployeeForEntity } from '../../interfaces/employee.interface';
import { EmployeeEntity } from '../entities/employee.entity'

@Injectable()
export class EmployeeService {
    constructor(
        @InjectRepository(EmployeeEntity)
        private employeeRepository: Repository<EmployeeEntity>,
    ) { }

    async findAll(): Promise<TEmployeeForEntity[]> {
        const employee = await this.employeeRepository.find({
            relations: {
                company: true
            }
        })
        return employee
    }

    async findOne(id: number): Promise<TEmployeeForEntity | null> {
        return await this.employeeRepository.findOneBy({ id })
    }
}
