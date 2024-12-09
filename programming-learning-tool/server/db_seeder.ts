import {Programming_Task} from "./models/ProgrammingTask.ts";
import {Test} from "./models/Test.ts";
import {Test_Suite} from "./models/Test_Suite.ts";
import {AppDataSource} from "./data-source.ts";

export function seed_db() {

    //drop all tables before seed
    const task_repo = AppDataSource.getRepository(Programming_Task)

    task_repo.clear().catch((error) => console.log(error));

    const ts1 = new Test_Suite()
    ts1.id = 0

    const t1 = new Test()
    t1.id = 0
    t1.test_input = ["test"]
    t1.expected_output = ["test"]
    t1.test_suite = ts1
    ts1.tests = [t1]

    const p1 = new Programming_Task()
    p1.description = "Print 'Hello World' in the console"
    p1.title = "print hello world"
    p1.tests = ts1

    const ts2 = new Test_Suite()
    ts2.id = 1

    const t2_1 = new Test()
    t2_1.id = 1
    t2_1.test_input = [2, 2]
    t2_1.expected_output = [4]
    t2_1.test_suite = ts2

    const t2_2 = new Test()
    t2_2.id = 2
    t2_2.test_input = [3, 3]
    t2_2.expected_output = [6]
    t2_2.test_suite = ts2

    const t2_3 = new Test()
    t2_3.id = 3
    t2_3.test_input = [4, 7]
    t2_3.expected_output = [11]
    t2_3.test_suite = ts2

    ts2.tests = [t2_1, t2_2, t2_3]

    const p2 = new Programming_Task()
    p2.description = "Write a program that takes two predefined variables, helper_value_0 and helper_value_1, and prints their sum in the console";
    p2.title = "Print the sum of two numbers in the console";
    p2.tests = ts2

    const ts3 = new Test_Suite()
    ts3.id = 2

    const t3 = new Test()
    t3.id = 4
    t3.test_input = ["test"]
    t3.expected_output = ["test"]
    t3.test_suite = ts3
    ts3.tests = [t3]

    const p3 = new Programming_Task()
    p3.title = "fizzbuzz";
    p3.description = "Write a program that iterates through a sequence of integers and prints a specific output based on the divisibility of each integer.\n" +
        "\n" +
        "Input:\n" +
        "A range of integers from 1 to n, where n is a positive integer provided as input."
    p3.tests = ts3

    //save without cascade
    task_repo.save(p1)
    task_repo.save(p2)
    task_repo.save(p3)
}