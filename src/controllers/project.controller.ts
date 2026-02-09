import { Request, Response } from 'express';
// import projectTechnologiesService from '../services/projectTechnologies.service';
// import projectTechnologiesService from '../../services/projectTechnologies.service';
import projectService from '@/services/project.service';
import technologyService from '@/services/technology.service';
import projectTechnologiesService from '@/services/projectTechnologies.service';

const renderProjects = async (req: Request, res: Response) => {
  const userID = '5553b625-1027-471b-b69b-d012050055fa';
  const data = await projectService.getAllByUserId(userID);
  const technologies = await technologyService.get();
  // console.log(technologies);

  res.render('pages/projects/projects', {
    layout: 'layouts/main',
    title: 'Home',
    projects: data,
    technologies,
  });
};

const renderProjectById = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  const { id } = req.params;
  const data = await projectService.getById(id);

  res.render('pages/projects/projectById', {
    layout: 'layouts/main',
    title: 'Project',
    ...data,
  });
};

const createProject = async (req: Request, res: Response) => {
  try {
    const { name, description, startDate, endDate, technologies, image } =
      req.body;

    const userId = '5553b625-1027-471b-b69b-d012050055fa'; // sementara (nanti dari auth)
    // const technologiesArr = Array.isArray(technologies)
    //   ? technologies
    //   : [technologies];

    const technologiesArr = !technologies
      ? []
      : Array.isArray(technologies)
        ? technologies
        : [technologies];

    await projectService.create({
      name: name,
      description: description,
      start_date: startDate,
      end_date: endDate,
      image,
      user_id: userId,
      technologyIds: technologiesArr,
    });

    return res.redirect('/projects');
  } catch (error) {
    console.error(error);
    return res.status(500).send('Failed to create project');
  }
};

const deleteProject = async (req: Request<{ id: string }>, res: Response) => {
  const { id } = req.params;
  await projectService.deleteById(id);

  return res.redirect('/projects');
};

const renderEditById = async (req: Request<{ id: string }>, res: Response) => {
  const { id } = req.params;

  const technologies = await technologyService.get();
  const project = await projectService.getById(id);

  const mappedTechnologies = technologies.map((tech) => ({
    ...tech,
    checked: project.technologies.includes(tech.name),
  }));

  res.render('pages/projects/editProject', {
    layout: 'layouts/main',
    title: 'Edit Project',
    project,
    technologies: mappedTechnologies,
  });
};

interface UpdateProjectRequest extends Request {
  params: { id: string };
  body: {
    name: string;
    description: string;
    startDate: string;
    endDate: string;
    technologies: string;
    image: string;
    existingImage: string;
  };
}

const updateProject = async (req: UpdateProjectRequest, res: Response) => {
  const { id: projectId } = req.params;
  const userId = '5553b625-1027-471b-b69b-d012050055fa'; // sementara (nanti dari auth)
  const {
    name,
    description,
    startDate,
    endDate,
    technologies,
    image,
    existingImage,
  } = req.body;

  let imageData: string = existingImage;
  if (image) imageData = image;

  const technologiesArr = !technologies
    ? []
    : Array.isArray(technologies)
      ? technologies
      : [technologies];

  const projectTechnologies =
    (await projectTechnologiesService.getByProjectId(projectId)) || [];

  const recordAkanDiHapus = projectTechnologies.filter(
    (v: string) => !technologiesArr.includes(v)
  );

  const recordAkanDiTambahkan = technologiesArr
    .filter(Boolean)
    .filter((v) => !projectTechnologies.includes(v));

  // update operation
  await projectService.updateById(
    {
      name: name,
      description,
      start_date: startDate,
      end_date: endDate,
      user_id: userId,
      image: imageData,
    },
    projectId
  );

  for (let techId of recordAkanDiTambahkan) {
    await projectTechnologiesService.createTechnology(projectId, techId);
  }

  for (let techId of recordAkanDiHapus) {
    await projectTechnologiesService.deleteTechnology(projectId, techId);
  }

  return res.redirect('/projects');
};

const projectController = {
  renderProjects,
  createProject,
  deleteProject,
  renderProjectById,
  renderEditById,
  updateProject,
};
export default projectController;
