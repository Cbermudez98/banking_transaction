export interface IDeposit {
    id: number;
    amount: number;
    createdDate: Date;
}

export interface IDepositCreateDto extends Pick<IDeposit, "amount"> {}
