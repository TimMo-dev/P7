import {Programming_Task} from "../models/ProgrammingTask.ts";
import {AppDataSource} from "../data-source.ts";


export async function getTestInputOutput(taskId: number) {
    const taskRepository = AppDataSource.getRepository(Programming_Task);

    const taskWithTests = await taskRepository
        .createQueryBuilder("task")
        .leftJoinAndSelect("task.tests", "testSuite")
        .leftJoinAndSelect("testSuite.tests", "test")
        .where("task.id = :taskId", {taskId})
        .getOne();

    if (taskWithTests && taskWithTests.tests && taskWithTests.tests.tests) {
        const helperValues = taskWithTests.tests.tests.map(test => test.test_input);
        const expectedOutput = taskWithTests.tests.tests.map(test => test.expected_output);

        return {helperValues, expectedOutput};
    } else {
        // Return empty arrays if no tests are found
        return {helperValues: [], expectedOutput: []};
    }
}