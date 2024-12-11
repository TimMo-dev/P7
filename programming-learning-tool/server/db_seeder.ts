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
    t1.test_input = [""]
    t1.expected_output = "Hello World"
    t1.test_suite = ts1
    ts1.tests = [t1]

    const p1 = new Programming_Task()
    p1.description = "Print 'Hello World' in the console"
    p1.title = "Print Hello World"
    p1.tests = ts1

    const ts2 = new Test_Suite()
    ts2.id = 1

    const t2_1 = new Test()
    t2_1.id = 1
    t2_1.test_input = [2, 2]
    t2_1.expected_output = 4
    t2_1.test_suite = ts2

    const t2_2 = new Test()
    t2_2.id = 2
    t2_2.test_input = [3, 3]
    t2_2.expected_output = 6
    t2_2.test_suite = ts2

    const t2_3 = new Test()
    t2_3.id = 3
    t2_3.test_input = [4, 7]
    t2_3.expected_output = 11
    t2_3.test_suite = ts2

    ts2.tests = [t2_1, t2_2, t2_3]

    const p2 = new Programming_Task()
    p2.description = "Write a program that takes two predefined variables and prints their sum in the console.\n" +
        "Use the predefined variables: helper_value_0 and helper_value_1.";
    p2.title = "Print the sum of two numbers in the console";
    p2.tests = ts2

    const ts3 = new Test_Suite()
    ts3.id = 2

    const t3_1 = new Test();
    t3_1.id = 4;
    t3_1.test_input = [15];
    t3_1.expected_output = [1, 2, "Fizz", 4, "Buzz", "Fizz", 7, 8, "Fizz", "Buzz", 11, "Fizz", 13, 14, "FizzBuzz"];
    t3_1.test_suite = ts3;
    
    const t3_2 = new Test();
    t3_2.id = 5;
    t3_2.test_input = [5];
    t3_2.expected_output = [1, 2, "Fizz", 4, "Buzz"];
    t3_2.test_suite = ts3;
    
    const t3_3 = new Test();
    t3_3.id = 6;
    t3_3.test_input = [3];
    t3_3.expected_output = [1, 2, "Fizz"];
    t3_3.test_suite = ts3;
    
    
    ts3.tests = [t3_1, t3_2, t3_3];

    const p3 = new Programming_Task()
    p3.title = "FizzBuzz Implementation";
    p3.description = 'Write a program that takes an integer n and prints the numbers from 1 to n.\n' +
    'However, for multiples of 3, print "Fizz" instead of the number, and for the multiples of 5, print "Buzz".\n' +
    'For numbers which are multiples of both 3 and 5, print "FizzBuzz".\n\n The output should be a list where each element corresponds to the result for numbers from 1 to n.\n\n' +
    'Use helper_value_0 as the input for n.';
    p3.tests = ts3

    //save without cascade
    task_repo.save(p1)
    task_repo.save(p2)
    task_repo.save(p3)
}