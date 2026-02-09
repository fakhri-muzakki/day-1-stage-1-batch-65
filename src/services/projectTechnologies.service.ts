import { pool } from '../config/database';

const getByProjectId = async (projectId: string) => {
  const result = await pool.query(
    ' SELECT ARRAY_AGG(technology_id) AS technologies FROM project_technologies WHERE project_id = $1',
    [projectId]
  );

  return result.rows[0].technologies;
};

const deleteTechnology = async (projectId: string, technologyId: string) => {
  await pool.query(
    `
    DELETE FROM project_technologies WHERE (project_id = $1 AND technology_id = $2);
    `,
    [projectId, technologyId]
  );
};

const createTechnology = async (projectId: string, technologyId: string) => {
  await pool.query(
    `
        INSERT INTO project_technologies (project_id, technology_id)
        VALUES ($1, $2)
        `,
    [projectId, technologyId]
  );
};

const projectTechnologiesService = {
  getByProjectId,
  deleteTechnology,
  createTechnology,
};
export default projectTechnologiesService;
