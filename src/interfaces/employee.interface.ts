export interface IEmployee {
    id: number,
    create_time: number,
    fio: string,
    companyId: number,
    departmentId: number,
    positionId: number,
    hireDate: number,
    employeeBirthday: number,
    employeePhone: string,
    employeeEmail: string,
    employeeAddress: string,
    passportSerial: string,
    innNumber: string,
    snilsNumber: string,
    empRecordNumber: number,
    employeeSalary: number,

    passportPlace: string,
    someAdditionalField: number
}

export type TEmployeeForEntity = Omit<IEmployee, 'someAdditionalField'>
