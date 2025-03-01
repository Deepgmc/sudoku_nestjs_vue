import { IUsersCreateDTO } from "../../interfaces/user.interface";

export class CreateUserDto implements IUsersCreateDTO {

    username       : string
    age            : number
    password       : string
    passwordConfirm: string
    email          : string

    constructor(newUser: CreateUserDto){
        // if(this.validateIncomingUser(newUser)){
        //     this.username = newUser.username
        //     this.password = newUser.password
        //     this.passwordConfirm = newUser.passwordConfirm
        //     this.age = newUser.age
        //     this.email = newUser.email
        // } else {
        //     throw new TypeError('User DTO is incorrect')
        // }

    }

    /**
     *
     * @param newUser Check is income user is correct
     * @returns
     */
    validateIncomingUser(newUser: IUsersCreateDTO){
        let isValid = false
        isValid = this.validateName(newUser.username)
        isValid = this.validateAge(newUser.age)
        isValid = this.validateEmail(newUser.email)
        isValid = this.validatePassword(newUser.password, newUser.password)
        return isValid
    }

    validateName(username: string): boolean{
        return username.length >= 2 && username.length <= 15
    }
    validateAge(age: number): boolean{
        return Number.isInteger(age) && age > 5 && age < 150
    }
    validateEmail(email: string): boolean{
        return /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/g.test(email)
    }
    validatePassword(password: string, passwordConfirm: string): boolean{
        return password.length >= 2 && password.length <= 25 &&
        passwordConfirm.length >= 2 && passwordConfirm.length <= 25 &&
        password === passwordConfirm
    }

}
