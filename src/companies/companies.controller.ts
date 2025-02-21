import { BadRequestException, Body, Controller, Get, NotFoundException, Param, ParseIntPipe, Post, Put } from '@nestjs/common';


import { CompaniesService } from './companies.service';
import { EmployeeService } from './employee/employee.service'
import { ICompanies, ICompaniesUpdateDTO, ICompaniesCreateDTO } from '../interfaces/companies.interface';

@Controller('companies')
export class CompaniesController {
    constructor(
        private readonly companiesService: CompaniesService,
        private readonly employeeService: EmployeeService,
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
        return await this.companiesService.findAll();
    }

    @Get('/employee')
    async getAllEmployee() {
        return await this.employeeService.findAll();
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
        return company;
    }

    /**
    * Создание компании
    *
    * @decorator Nestjs Body
      @postParam Принимает объект createCompanyDto из поста
    * @returns Is created success
    *
    */
    @Post('new')
    async create(
        @Body() createCompanyDto: ICompaniesCreateDTO
    ): Promise<any> {
        console.log('Получен объект для сохранения:', createCompanyDto);
        return await this.companiesService.create(createCompanyDto)
    }

    /**
    * Обновление данных компании
    *
    * @postParam Принимает некоторые поля createCompanyDto из поста
    * @returns Is created success
    *
    */
    @Put(':id')
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateCompanyDto: ICompaniesUpdateDTO,
    ) {
        console.log('Got id', id);
        try {
            return this.companiesService.update(id, updateCompanyDto);
        } catch (e) {
            throw new BadRequestException('Error', e.message as string)
        }
    }
}
