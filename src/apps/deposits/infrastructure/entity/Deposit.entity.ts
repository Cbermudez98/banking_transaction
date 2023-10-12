import { AccountEntity } from '../../../accounts/infrastructure/entity/Account.entity';
import { IDeposit } from '../../domain/IDeposit';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";

@Entity("deposit")
export class DepositEntity implements IDeposit {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    amount: number;

    @Column({ default: () => "NOW()" })
    createdDate: Date;

    @ManyToOne(() => AccountEntity, account => account.deposits, { nullable: false })
    account: AccountEntity;
}