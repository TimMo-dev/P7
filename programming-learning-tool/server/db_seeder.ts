import {getConnection} from "typeorm";
import {Programming_Task} from "./models/ProgrammingTask.ts";
import {Test} from "./models/Test.ts";
import {Test_Suite} from "./models/Test_Suite.ts";
import {AppDataSource} from "./data-source.ts";

export function seed_db() {

    //drop all tables before seed
    const task_repo = AppDataSource.getRepository(Programming_Task)
    const test_suite_repo = AppDataSource.getRepository(Test_Suite)
    const test_repo = AppDataSource.getRepository(Test)

    task_repo.clear().catch((error)=>console.log(error));

    const ts1 = new Test_Suite()
    ts1.id = 0

    const t1 = new Test()
    t1.id = 0
    t1.test_input = "test"
    t1.expected_output = "test"
    t1.test_suite = ts1

    const p1 = new Programming_Task()
    p1.description = "Print 'Hello World' in the console"
    p1.title = "print hello world"
    p1.tests = ts1

    const ts2 = new Test_Suite()
    ts2.id = 1

    const t2 = new Test()
    t2.id = 1
    t2.test_input = "test"
    t2.expected_output = "test"
    t2.test_suite = ts2

    const p2 = new Programming_Task()
    p2.description = "Reverse a string";
    p2.title = "reverse string task";
    p2.tests = ts2

    const ts3 = new Test_Suite()
    ts3.id = 2

    const t3 = new Test()
    t3.id = 2
    t3.test_input = "test"
    t3.expected_output = "test"
    t3.test_suite = ts3

    const p3 = new Programming_Task()
    p3.title = "fizzbuzz";
    p3.description = "Write a program that iterates through a sequence of integers and prints a specific output based on the divisibility of each integer.\n" +
        "\n" +
        "Input:\n" +
        "A range of integers from 11 to nn, where nn is a positive integer provided as input."
    p3.tests = ts3

    //save without cascade
    task_repo.save(p1)
    test_suite_repo.save(ts1)
    test_repo.save(t1)

    task_repo.save(p2)
    test_suite_repo.save(ts2)
    test_repo.save(t2)

    task_repo.save(p3)
    test_suite_repo.save(ts3)
    test_repo.save(t3)
}