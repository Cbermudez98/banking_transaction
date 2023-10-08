import { IAccount } from './../../domain/IAccount';
import { PrimaryGeneratedColumn ,Column, Entity } from "typeorm";

@Entity("account")
export class AccountEntity implements IAccount {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    ownerName: string;

    @Column()
    openingBalance: number;

    @Column({ unique: true, type: "varchar" })
    accountNumber: number;
}