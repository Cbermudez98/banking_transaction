export interface IAccountCreateDto {
    ownerName: string;
    openingBalance: number;
    accountNumber: number;
}

export interface IAccount extends IAccountCreateDto {
    id: number;
}