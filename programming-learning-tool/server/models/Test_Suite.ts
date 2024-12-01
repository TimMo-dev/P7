import {PrimaryColumn, Entity, OneToMany, } from "typeorm";
import {Test} from "./Test.ts";

@Entity()
export class Test_Suite {

    @PrimaryColumn("int")
    id: number;

    @OneToMany(()=>Test, (test)=>test.test_suite)
    tests: Test[];
}