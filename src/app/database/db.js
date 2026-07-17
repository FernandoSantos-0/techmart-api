
import 'dotenv/config';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.connect()
  .then(() => {
    console.log('Conectado ao PostgreSQL!');
  })
  .catch((err) => {
    console.error('Erro ao conectar ao PostgreSQL:', err.message);
  });

export default pool;
