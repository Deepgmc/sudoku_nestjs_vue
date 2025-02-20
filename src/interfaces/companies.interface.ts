
export interface ICompanies {
    id: number,
    name: string,
    address: string,
}

export type TCompaniesCreateDTO = Omit<ICompanies, 'id'>