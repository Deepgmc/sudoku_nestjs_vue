import { Body, Controller, Get, NotFoundException, Param, ParseIntPipe, Post } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { EmployeeService } from './employee/employee.service'
import { CreateCompanyDto } from './dto/create-company.dto';

@Controller('companies')
export class CompaniesController {
    constructor(
        private readonly companiesService: CompaniesService,
        private readonly employeeService: EmployeeService,
    ) { }

    @Get()
    async findAll(): Promise<CreateCompanyDto[]> {
        return await this.companiesService.findAll();
    }

    @Get('/employee')
    async getAllEmployee() {
        return await this.employeeService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number) {
    //async findOne(@Param('id') id: number) {
        const company = await this.companiesService.findOne(id);
        if (!company) {
            //throw new BadRequestException('Validation failed');
            throw new NotFoundException('Такая компания не была найдена');
        }
        return company;
    }

    @Post()
    async create(@Body() createCompanyDto: CreateCompanyDto) {
        console.log('Получен обхект:', createCompanyDto);
        const result = await this.companiesService.insertNewCompany(createCompanyDto)
        console.log('Результат сохранения:', result);
        return 'This action adds a new company';
    }
}
