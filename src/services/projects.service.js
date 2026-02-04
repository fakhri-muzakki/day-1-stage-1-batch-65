import pool from "../database/index.js";

export const createProject = async ({
  projectName,
  startDate,
  endDate,
  description,
  technologies,
  imageUrl,
}) => {
  await pool.query(
    `
      INSERT INTO projects
      (
        name,
        start_date,
        end_date,
        description,
        technologies,
        image_url
      )
      VALUES ($1, $2, $3, $4, $5, $6)
      `,
    [projectName, startDate, endDate, description, technologies, imageUrl],
  );

  const technologiesArray = technologies.split(",").map((tech) => tech.trim());

  return {
    projectName,
    startDate,
    endDate,
    description,
    technologies: technologiesArray,
    imageUrl,
  };
};

const getAllProjects = async () => {
  const result = await pool.query(
    `
    SELECT
      id,
      name,
      start_date,
      end_date,
      description,
      technologies,
      image_url,
      created_at
    FROM projects
    ORDER BY created_at DESC
    `,
  );

  return result.rows;
};

const getProjectById = async (id) => {
  const result = await pool.query(
    `
    SELECT
      id,
      name,
      start_date,
      end_date,
      description,
      technologies,
      image_url
    FROM projects
    WHERE id = $1
    `,
    [id],
  );

  return result.rows[0];
};

const projectsService = { createProject, getAllProjects, getProjectById };
export default projectsService;
