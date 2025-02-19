import { Injectable } from '@nestjs/common';

import { ICompanies } from '../interfaces/companies.interface';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CompaniesEntity } from './entities/companies.entity';

@Injectable()
export class CompaniesService {
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

    async findOne(id: number): Promise<ICompanies | null> {
        return await this.companiesRepository.findOneBy({id})
    }

}
