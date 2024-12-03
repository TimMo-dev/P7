import pg from 'pg';

const pool = new pg.Pool({
  user: 'user',
  host: 'localhost',
  database: 'database',
  password: 'password',
  port: 5431,
});

export async function getTasks(req, res) {
  try {
    console.log('Fetching tasks from the database...');
    const result = await pool.query('SELECT * FROM Programming_task');
    console.log('Tasks fetched successfully:', result.rows);
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching tasks:', err);
    res.status(500).send('Server error');
  }
}

export async function getTaskById(req, res) {
  const { id } = req.params;
  try {
    console.log(`Fetching task with ID ${id} from the database...`);
    const result = await pool.query('SELECT * FROM Programming_task WHERE id = $1', [id]);
    if (result.rows.length > 0) {
      console.log('Task fetched successfully:', result.rows[0]);
      res.json(result.rows[0]);
    } else {
      res.status(404).send('Task not found');
    }
  } catch (err) {
    console.error('Error fetching task:', err);
    res.status(500).send('Server error');
  }
}