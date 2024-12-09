// CREATE TABLE IF NOT EXISTS Tests (
//     test_case_id INTEGER PRIMARY KEY,
//     taskid INTEGER REFERENCES Programming_task
// );

import {Column, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn} from "typeorm";
import {Test_Suite} from "./Test_Suite.ts";

@Entity()
export class Test {
    //wip as we have to figure out how the tests should be in relation to the generic test containers. 
    @PrimaryColumn("int")
    id: number;

    // Use simple-json for flexible mixed-type lists - postgresql has native support for json
    @Column("simple-json")
    test_input: (string | number | boolean | object)[];

    @Column("simple-json")
    expected_output: (string | number | boolean | object)[];

    @ManyToOne(() => Test_Suite, (Test_Suite) => Test_Suite.tests)
    test_suite: Test_Suite;
}
