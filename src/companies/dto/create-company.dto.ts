import { ICompaniesCreateDTO } from '../../interfaces/companies.interface'
import { IsString, IsNotEmpty, Equals } from 'class-validator';

export class CreateCompanyDto implements ICompaniesCreateDTO {


    //used by app.useGlobalPipes(new ValidationPipe({
    // validators:
    // https://github.com/typestack/class-validator?tab=readme-ov-file#validation-messages
    /**
    @IsOptional()
    @IsPositive()
    @Max(1000)
    @IsInt()
    @IsEmail()
    @IsNumberString()
    @IsNotEmpty()
    @IsString()
    */

    @IsNotEmpty()
    @IsString()
    //@Equals('New Created Via POST')
    name: string
    @IsNotEmpty()
    @IsString()
    address: string
}

