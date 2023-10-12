import { DepositEntity } from '../../../deposits/infrastructure/entity/Deposit.entity';
import { IAccount } from './../../domain/IAccount';
import { PrimaryGeneratedColumn ,Column, Entity, OneToOne, OneToMany } from "typeorm";

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

    @OneToMany(() => DepositEntity, deposit => deposit.account)
    deposits: DepositEntity[];
}