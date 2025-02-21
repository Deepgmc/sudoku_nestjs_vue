import { ICompaniesCreateDTO } from '../../interfaces/companies.interface'
import { IsString, IsNotEmpty, Equals } from 'class-validator';

export class CreateCompanyDto implements ICompaniesCreateDTO {


    //ЭТИ ДЕКОРАТОРЫ ВАЛИДАЦИИ ЮЗАЮТСЯ ГЛОБАЛЬНЫМ app.useGlobalPipes(new ValidationPipe({ ВАЛИДАТОРОМ
    /**
    @IsOptional()
    @IsPositive()
    @Max(1000)
    @IsInt()
    @IsEmail()
    @IsNumberString()
    */

    @IsNotEmpty()
    @IsString()
    //@Equals('New Created Via POST')
    name: string
    @IsNotEmpty()
    @IsString()
    address: string
}

