import { BadRequestException, Body, Controller, Get, Logger, NotFoundException, Param, ParseIntPipe, Post, Put } from '@nestjs/common';


import { CompaniesService } from './companies.service';
import { EmployeeService } from './employee/employee.service'
import { ICompanies, ICompaniesUpdateDTO, ICompaniesCreateDTO } from '../interfaces/companies.interface';
import { CreateCompanyDto } from './dto/create-company.dto';

@Controller('companies')
export class CompaniesController {

    private readonly logger = new Logger('COM CONTROLLER')

    /**
     * Constructor
     * @param companiesService
     * @param employeeService
     */
    constructor(
        private readonly companiesService: CompaniesService,
        private readonly employeeService: EmployeeService
    ) { }

    //!static render via handlebars, в main.ts еще
    // @Get('static_test')
    // @Render('index')
    // root() {
    //     return { message: 'Hello world!' };
    // }

    // @Get('static_test2')
    // static_test(@Res() res: Response) {
    //     return res.render(
    //         'index',
    //         { message: 'Hello world!22' },
    //     );
    // }

    // принятие-валидация входящего массива
    // @Body(new ParseArrayPipe({ items: CreateUserDto }))
    // createUserDtos: CreateUserDto[],

    @Get()
    async findAll(): Promise<ICompanies[]> {
        const company = await this.companiesService.findAll();
        this.logger.debug(company)
        return company
    }

    @Get('/employee')
    async getAllEmployee() {
        const employee = await this.employeeService.findAll();
        this.logger.debug(employee)
        return employee
    }

    /**
    * Конструктор для создания книги
    * @constructor
    * @param {number} id - искомый айдишник
    * @returns {ICompanies} - объект компании
    */
    @Get(':id')
    async findOne(
        @Param('id', ParseIntPipe) id: number
    ): Promise<any> {
        const company = await this.companiesService.findOne(id);
        if (!company) {
            //throw new BadRequestException('Validation failed');
            throw new NotFoundException('Такая компания не была найдена');
        }
        this.logger.debug(company)
        return company;
    }

    /**
    * Создание компании
    *
    * @decorator Nestjs Body
      @postParam Принимает объект CreateCompanyDto из поста
    * @returns Is created success
    *
    */
    @Post('new')
    async create(
        @Body() createCompanyDto: CreateCompanyDto
    ): Promise<any> {
        this.logger.debug(`Получен объект для сохранения`)
        this.logger.debug(createCompanyDto)
        return await this.companiesService.create(createCompanyDto)
    }

    /**
    * Обновление данных компании
    *
    * @postParam Принимает некоторые поля updateCompanyDto из поста
    * @returns Is updated success
    *
    */
    @Put(':id')
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateCompanyDto: ICompaniesUpdateDTO,
    ) {
        this.logger.debug(`Получен объект для обновления`)
        this.logger.debug(updateCompanyDto)
        try {
            return this.companiesService.update(id, updateCompanyDto);
        } catch (e) {
            throw new BadRequestException('Error', e.message as string)
        }
    }
}
