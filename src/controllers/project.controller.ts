import { type Request, type Response } from 'express';
import projectService from '@/services/project.service';
import technologyService from '@/services/technology.service';
import projectTechnologiesService from '@/services/projectTechnologies.service';
import { deleteFile } from '@/utils/file';

const getUserId = (req: Request): string => {
  if (!req.session.user) {
    throw new Error('User is not authenticated');
  }

  return req.session.user.id;
};

const renderProjects = async (req: Request, res: Response) => {
  const userId = getUserId(req);
  const data = await projectService.getAllByUserId(userId);
  const technologies = await technologyService.get();

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
    const userId = getUserId(req);
    const { name, description, startDate, endDate, technologies } = req.body;
    const imageFilename = req.file?.filename;
    const imageUrl = `/uploads/${imageFilename}`;

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
      image: imageUrl,
      user_id: userId,
      technologyIds: technologiesArr,
    });

    return res.redirect('/projects');
  } catch (error) {
    console.error('Login error:', error);

    req.flash('error', 'Something went wrong. Please try again.');
    return res.redirect('/login');
  }
};

const deleteProject = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const { id } = req.params;
    const { image } = await projectService.getById(id);
    console.log(image);

    await projectService.deleteById(id);
    await deleteFile(image);

    return res.redirect('/projects');
  } catch (error) {
    console.error('Login error:', error);

    req.flash('error', 'Something went wrong. Please try again.');
    return res.redirect('/projects');
  }
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
  try {
    const { id: projectId } = req.params;
    const userId = getUserId(req);

    const {
      name,
      description,
      startDate,
      endDate,
      technologies,

      existingImage,
    } = req.body;

    const imageFilename = req.file?.filename;
    const imageUrl = imageFilename && `/uploads/${imageFilename}`;

    let imageData: string = existingImage;
    if (imageUrl) {
      await deleteFile(existingImage);
      imageData = imageUrl;
    }

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
  } catch (error) {
    console.error('Login error:', error);

    req.flash('error', 'Something went wrong. Please try again.');
    return res.redirect('/login');
  }
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
