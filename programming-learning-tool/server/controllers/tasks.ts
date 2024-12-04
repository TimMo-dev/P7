import {AppDataSource} from "../data-source.ts";
import {Programming_Task} from "../models/ProgrammingTask.ts";

const task = AppDataSource.getRepository(Programming_Task)

export async function getTasks(req, res) {
  try {
    console.log('Fetching tasks from the database...');
    const result = await task.find()
    res.json(result);
  } catch (err) {
    console.error('Error fetching tasks:', err);
    res.status(500).send('Server error');
  }
}

export async function getTaskById(req, res) {
  const { id } =  req.params;
  try {
    console.log(`Fetching task with ID ${id} from the database...`);
    const result = await task.findOne({ where: { id: Number(id) } })
    res.json(result)
    }
    catch (err) {
    console.error(`Error fetching task ID: ${id}`, err);
    }
}