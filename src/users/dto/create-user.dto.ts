import { IsString, IsNotEmpty, IsPositive, Max, Min, Length, IsEmail, IsOptional } from 'class-validator'

import { IUsersCreateDTO } from '../../interfaces/user.interface'
import { dtoValidationMessageHandler } from '../../validation/dtoMsgHandler'
import defaultUserSettings from '../../config/defaultUserSettings'

const dtoMsg = new dtoValidationMessageHandler('User')

/**
 * Game users DTO. Used during registration
 */
export class CreateUserDto implements IUsersCreateDTO {

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
    @Length(10, 20)
    @IsDate()
     */

    @IsNotEmpty({message: dtoMsg.getMessage('notempty')})
    @IsString({message: dtoMsg.getMessage('string')})
    @Length(2, 20, {message: dtoMsg.getMessage('length')})
    username: string

    @IsString()
    @IsEmail({ignore_max_length: true}, {message: dtoMsg.getMessage('email')})
    email: string

    @IsPositive({message: dtoMsg.getMessage('positive')})
    @Max(150, {message: dtoMsg.getMessage('max')})
    @Min(5, {message: dtoMsg.getMessage('min')})
    age: number

    @IsString({message: dtoMsg.getMessage('string')})
    @Length(3, 25, {message: dtoMsg.getMessage('length')})
    password: string

    @IsString({message: ''})
    passwordConfirm: string

    @IsOptional()
    reg_date: Date

    @IsOptional()
    game_settings: string = JSON.stringify(defaultUserSettings)

    constructor() {}

}
