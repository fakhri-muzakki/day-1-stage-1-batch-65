import { pool } from '../config/database';

const get = async () => {
  const result = await pool.query('select * from technologies');
  return result.rows;
};

const technologyService = { get };
export default technologyService;
