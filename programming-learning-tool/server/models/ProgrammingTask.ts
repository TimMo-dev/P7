import { PrimaryGeneratedColumn, Column, Entity } from "typeorm";

@Entity()
export class fProgrammingTask
{
    @PrimaryGeneratedColumn() 
    id: number

    @Column("text")
    description: string

    @Column("text")
    title: string

} 