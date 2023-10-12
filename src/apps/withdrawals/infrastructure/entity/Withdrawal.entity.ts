import { AccountEntity } from '../../../accounts/infrastructure/entity/Account.entity';
import { IWithdrawal } from './../../domain/IWithdrawal';
import { Entity ,PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from "typeorm";

@Entity("withdrawal")
export class WithdrawalEntity implements IWithdrawal {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    amount: number;

    @CreateDateColumn({ default: () => "NOW()" })
    createdDate: Date;

    @ManyToOne(() => AccountEntity, account => account.withdrawals)
    account: AccountEntity;
}