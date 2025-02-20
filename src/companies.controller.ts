import { Body, Controller, Get, NotFoundException, Param, ParseIntPipe, Post } from '@nestjs/common';

@Controller('companies')
export class CompaniesController {
    constructor(

    ) { }





    /**
    * Конструктор для создания книги
    * @constructor
    * @param {number} id - искомый айдишник
    * @returns {ICompanies} - объект компании
    */
    @Get(':id')
    findOne(
        @Param('id', ParseIntPipe) id: number
    ) {
        //async findOne(@Param('id') id: number) {
        const company = {a: 456546};
        if (!company) {
            //throw new BadRequestException('Validation failed');
            throw new NotFoundException('Такая компания не была найдена');
        }
        return company;
    }

    /**
    * Создание компании
    *
    * @remarks
    * This method is part of the bla bla.
    *
    * @param x - The first input number
    * @returns Is created success
    *
    * @beta
    */
    @Post()
    create() {
        const result = true
        console.log('Результат сохранения:', result);
        return result
    }
}
