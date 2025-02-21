import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { ICompanies, ICompaniesUpdateDTO, ICompaniesCreateDTO } from '../interfaces/companies.interface';
import { CompaniesEntity } from './entities/companies.entity';

@Injectable()
export class CompaniesService {

    private readonly logger = new Logger('COM SERVICE')
    /**
     * Constructor
     * @param companiesRepository
     */
    constructor(
        @InjectRepository(CompaniesEntity)
        private companiesRepository: Repository<CompaniesEntity>,
    ){}

    async findAll(): Promise<ICompanies[]>{
        return await this.companiesRepository.find({
            relations: {
                employees: true
            }
        })
    }

    async findOne(id: number): Promise<ICompanies> {
        const company = await this.companiesRepository.findOneBy({id})

        if(!company) throw new NotFoundException('Company was not found')
        return company
    }

    async create(createCompanyDto: ICompaniesCreateDTO): Promise<ICompaniesCreateDTO>{
        return await this.companiesRepository.save(createCompanyDto)
    }

    async update(
        id: number,
        updateCompanyDto: ICompaniesUpdateDTO
    ): Promise<ICompaniesUpdateDTO>{
        const company = await this.findOne(id)
        if(!company) throw new BadRequestException(`Невозможно обновить компанию ${id}`)
        return await this.companiesRepository.save(Object.assign(company, updateCompanyDto))
    }

}
