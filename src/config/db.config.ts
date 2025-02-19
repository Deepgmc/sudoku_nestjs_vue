import {registerAs} from "@nestjs/config";
// import { UsersEntity } from '../users/entities/user.entity';
// import { CompaniesEntity } from '../companies/entities/companies.entity';
// import { EmployeeEntity } from '../companies/entities/employee.entity';

export default registerAs('database', () => {
    return {
        "type": process.env.DB_TYPE,
        "host": process.env.DB_HOST,
        "port": process.env.DB_PORT,
        "username": process.env.DB_USERNAME,
        "password": process.env.DB_PASSWORD,
        "database": process.env.DB_NAME,
        // "entities": [  //включено автоматическое добавление модулей в app.module через autoLoadEntities: true
            // UsersEntity,
            // CompaniesEntity,
            // EmployeeEntity
        // ],
        "autoloadEntities": true,
        "synchronize": true
    }
})
/**
// TypeOrmModule.forRoot({ // app.module.ts в импортах
        //     type: 'mysql',
        //     host: '127.0.0.1',
        //     port: 3306,
        //     username: 'root',
        //     password: 'Qwe12345678qwE-===',
        //     database: 'corp',
        //     entities: [Users, Companies],
        //     synchronize: true,
        // }),

/**
LISTEN_PORT=3050
DB_TYPE=mysql
DB_HOST=localhost
DB_NAME=corp
DB_USERNAME=root
DB_PASSWORD=Qwe12345678qwE-===
}
 */