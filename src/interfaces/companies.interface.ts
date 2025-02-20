
export interface ICompanies {
    id: number,
    name: string,
    address: string,
}
export type ICompaniesDTO = Omit<ICompanies, 'id'>