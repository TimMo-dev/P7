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