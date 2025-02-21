import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn } from 'typeorm';
import { ICompanies } from '../../interfaces/companies.interface'

import { EmployeeEntity } from './employee.entity';


@Entity('company')
export class CompaniesEntity implements ICompanies {
    @PrimaryGeneratedColumn()
    id: number;

    // всякое полезное тут: https://docs.nestjs.com/recipes/sql-typeorm
    // интересно про создание дата-провайдера для фото, в середине статьи - не через InjectRepository а через обычный @Inject в конструктор сервиса. Может быть полезно
    // @Column({ length: 500 })
    // name: string;
    // @Column('text')
    // description: string;
    // @Column('int')

    @Column()
    name: string;

    @Column()
    address: string;

    @OneToMany(() => EmployeeEntity, (employee) => employee.company)
    employees: EmployeeEntity[]

    /**
    @ManyToOne(type => Connector, connector => connector.CON_Id_A)
    @JoinColumn({ name: "CON_Id_A" })
    CON_A: Connector;

    @ManyToOne(type => Connector, connector => connector.CON_Id_B)
    @JoinColumn({ name: "CON_Id_B" })
    CON_B: Connector;

    @ManyToOne(type => Category, category => category.CAB_CAT_Id)
    @JoinColumn({ name: "CAT_Id" })
    CAT: Category;
    */
}