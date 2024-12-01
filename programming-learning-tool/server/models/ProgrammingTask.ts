import {PrimaryGeneratedColumn, Column, Entity, OneToOne, JoinColumn} from "typeorm";
import {Test_Suite} from "./Test_Suite.ts";

@Entity()
export class Programming_Task
{
    @PrimaryGeneratedColumn() 
    id: number

    @Column("text")
    description: string

    @Column("text")
    title: string

    @OneToOne(()=>Test_Suite)
    @JoinColumn()
    tests: Test_Suite;
}