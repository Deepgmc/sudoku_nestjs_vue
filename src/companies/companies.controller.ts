import { Controller, Get, NotFoundException, Param, ParseIntPipe } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { EmployeeService } from './employee/employee.service'

@Controller('companies')
export class CompaniesController {
    constructor(
        private readonly companiesService: CompaniesService,
        private readonly employeeService: EmployeeService,
    ) { }

    @Get()
    async findAll() {
        return await this.companiesService.findAll();
    }

    @Get('/employee')
    async getAllEmployee() {
        return await this.employeeService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number) {
        const company = await this.companiesService.findOne(id);
        if(!company){
            throw new NotFoundException('Такая компания не была найдена');
        }
        return company;
    }
}
