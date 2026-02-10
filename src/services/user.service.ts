import { pool } from '@/config/database';
import { randomUUID } from 'crypto';

const getByEmail = async (email: string) => {
  const result = await pool.query('select * from users where email = $1', [
    email,
  ]);
  return result.rows[0];
};

interface CreateUser {
  username: string;
  email: string;
  password: string;
  role: 'admin' | 'user';
}

const createUser = async ({ username, email, password, role }: CreateUser) => {
  const userId = randomUUID();

  return await pool.query(
    `
        INSERT INTO users (id, username, email, password, role)
        VALUES ($1, $2, $3, $4, $5)
        `,
    [userId, username, email, password, role]
  );
};

const userService = { getByEmail, createUser };
export default userService;
