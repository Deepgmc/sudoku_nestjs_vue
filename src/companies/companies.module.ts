import { Module } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CompaniesController } from './companies.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompaniesEntity } from './entities/companies.entity';
import { EmployeeService } from './employee/employee.service';
import { EmployeeEntity } from './entities/employee.entity';

@Module({
    controllers: [CompaniesController],
    providers: [
        CompaniesService,
        EmployeeService
    ],
    imports: [
        TypeOrmModule.forFeature([CompaniesEntity, EmployeeEntity]),
    ],
})
export class CompaniesModule { }
