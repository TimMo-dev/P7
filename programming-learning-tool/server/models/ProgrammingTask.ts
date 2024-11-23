import { PrimaryGeneratedColumn, Column, Entity } from "typeorm";

@Entity()
export class ProgrammingTask
{
    @PrimaryGeneratedColumn() 
    id: number

    @Column("text")
    description: string

    @Column("text")
    title: string

} 