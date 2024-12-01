import {Programming_Task} from "./models/ProgrammingTask.ts";
import {Test} from "./models/Test.ts";
import {Test_Suite} from "./models/Test_Suite.ts";
import {AppDataSource} from "./data-source.ts";

export function seed_db()
{
    const task_list = []
    const test_suite_list = []
    const test_list = []

    const task_repo = AppDataSource.getRepository(Programming_Task)
    const test_suite_repo = AppDataSource.getRepository(Test_Suite)
    const test_repo = AppDataSource.getRepository(Test)

    const ts1 = new Test_Suite()
    ts1.id = 0
    test_suite_list.push(ts1)

    const t1 = new Test()
    t1.id = 0
    t1.test_input = "test"
    t1.expected_output = "test"
    t1.test_suite = ts1

    const p1 = new Programming_Task()
    p1.description = "Print 'Hello World' in the console"
    p1.title = "print hello world"
    p1.tests = ts1
    task_list.push(p1);

    const ts2 = new Test_Suite()
    ts2.id = 1
    test_suite_list.push(ts2)


    const p2 = new Programming_Task()
    p2.description = "Reverse a string";
    p2.title = "reverse string task";
    p2.tests = ts2
    task_list.push(p2);

    const ts3 = new Test_Suite()
    ts3.id = 2
    test_suite_list.push(ts3)

    const p3 = new Programming_Task()
    p3.title = "fizzbuzz";
    p3.description = "Write a program that iterates through a sequence of integers and prints a specific output based on the divisibility of each integer.\n" +
        "\n" +
        "Input:\n" +
        "A range of integers from 11 to nn, where nn is a positive integer provided as input."
    p3.tests = ts3
    task_list.push(p3);


    for(let i = 0; i < task_list.length; ++i) {
        task_repo.save(task_list[i]);
    }

    for(let i = 0;i < test_suite_list.length; ++i)
    {
        test_suite_repo.save(test_suite_list[i]);
    }
    for(let i = 0; i < test_list.length; ++i)
    {
        test_repo.save(test_suite_list[i]);
    }

}
