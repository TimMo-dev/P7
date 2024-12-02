// CREATE TABLE IF NOT EXISTS Tests (
//     test_case_id INTEGER PRIMARY KEY,
//     taskid INTEGER REFERENCES Programming_task
// );

import {Column, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn} from "typeorm";
import {Test_Suite} from "./Test_Suite.ts";

@Entity()
export class fTest
{
    //wip as we have to figure out how the tests should be in relation to the generic test containers. 
    @PrimaryColumn("int")
    id: number

    @Column("text")
    test_input: string;

    @Column("text")
    expected_output: string;

    @ManyToOne(()=>Test_Suite, (Test_Suite)=>Test_Suite.tests)
    test_suite: Test_Suite


}
