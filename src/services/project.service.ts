import { pool } from '@/config/database';
import { randomUUID } from 'crypto';
import type { Project } from '@/types/project';

const getAllByUserId = async (userId: string) => {
  const result = await pool.query(
    `
    SELECT
      p.id,
      p.name,
      p.start_date,
      p.end_date,
      p.image,
      p.created_at,
      p.updated_at,
      COALESCE(
        ARRAY_AGG(t.name) FILTER (WHERE t.name IS NOT NULL),
        '{}'
      ) AS technologies
    FROM projects p
    LEFT JOIN project_technologies pt
      ON pt.project_id = p.id
    LEFT JOIN technologies t
      ON t.id = pt.technology_id
    WHERE p.user_id = $1
    GROUP BY p.id
    ORDER BY p.created_at DESC
    `,
    [userId]
  );

  return result.rows;
};

const getById = async (projectId: string) => {
  const result = await pool.query(
    `SELECT
  p.id,
  p.name,
   TO_CHAR(p.start_date, 'YYYY-MM-DD') AS start_date,
  TO_CHAR(p.end_date, 'YYYY-MM-DD') AS end_date,
  p.image,
  p.description,
  p.created_at,
  p.updated_at,
  p.user_id,

  COALESCE(
    ARRAY_AGG(t.name) FILTER (WHERE t.name IS NOT NULL),
    '{}'
  ) AS technologies

FROM projects p
LEFT JOIN project_technologies pt
  ON pt.project_id = p.id
LEFT JOIN technologies t
  ON t.id = pt.technology_id

WHERE p.id = $1

GROUP BY p.id;
`,
    [projectId]
  );

  return result.rows[0];
};

type CreateProjectInput = {
  name: string;
  description: string;
  start_date: string;
  end_date?: string;
  image?: string;
  user_id: string;
  technologyIds: string[];
};

const create = async (data: CreateProjectInput) => {
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    // 1️⃣ Insert ke projects
    const projectId = randomUUID();

    await client.query(
      `
      INSERT INTO projects (
        id,
        name,
        description,
        start_date,
        end_date,
        image,
        user_id
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      `,
      [
        projectId,
        data.name,
        data.description,
        data.start_date,
        data.end_date ?? null,
        data.image ?? null,
        data.user_id,
      ]
    );

    // 2️⃣ Insert ke project_technologies
    for (const techId of data.technologyIds) {
      await client.query(
        `
        INSERT INTO project_technologies (project_id, technology_id)
        VALUES ($1, $2)
        `,
        [projectId, techId]
      );
    }

    await client.query('COMMIT');

    return { id: projectId };
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
};

const deleteById = async (id: string) => {
  return await pool.query('DELETE FROM projects WHERE id = $1', [id]);
};

type UpdateProjectInput = Omit<CreateProjectInput, 'technologyIds'>;

const updateById = async (project: UpdateProjectInput, projectId: string) => {
  const result = await pool.query(
    'UPDATE projects SET name = $1, description = $2, start_date = $3, end_date = $4, image = $5  WHERE id = $6;',
    [
      project.name,
      project.description,
      project.start_date,
      project.end_date,
      project.image,
      projectId,
    ]
  );
};

const projectService = {
  getAllByUserId,
  getById,
  create,
  deleteById,
  updateById,
};
export default projectService;
