
export interface ICompanies {
    id: number,
    name: string,
    address: string,
}

export interface ICompaniesCreateDTO extends Omit<ICompanies, 'id'> {}
export interface ICompaniesUpdateDTO extends Partial<ICompanies> {}