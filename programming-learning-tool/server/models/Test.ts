// CREATE TABLE IF NOT EXISTS Tests (
//     test_case_id INTEGER PRIMARY KEY,
//     taskid INTEGER REFERENCES Programming_task
// );

import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class fTest
{
    //wip as we have to figure out how the tests should be in relation to the generic test containers. 
    @PrimaryColumn("integer")
    id: number
    
}
