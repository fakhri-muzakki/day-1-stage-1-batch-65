import projectsService from "../services/projects.service.js";

const renderProjectsPage = async (req, res) => {
  try {
    const projects = await projectsService.getAllProjects();

    //  ubah technologies string → array
    const mappedProjects = projects.map((project) => ({
      ...project,
      technologies: project.technologies
        ? project.technologies.split(",").map((t) => t.trim())
        : [],
    }));

    res.render("pages/projects", {
      title: "Projects",
      layout: "layouts/main",
      projects: mappedProjects,
    });
  } catch (error) {
    console.error(error);

    res.status(500).render("pages/error", {
      title: "Error",
      message: "Gagal memuat data projects",
    });
  }
};

const renderProjectById = async (req, res) => {
  try {
    const { id } = req.params;

    const project = await projectsService.getProjectById(id);

    // Kalau project tidak ditemukan
    if (!project) {
      return res.status(404).render("pages/notFound", {
        title: "Not Found",
        layout: "layouts/main",
        message: "Project tidak ditemukan",
      });
    }

    // mengubah technologies (string → array)
    const mappedProject = {
      ...project,
      technologies: project.technologies
        ? project.technologies.split(",").map((t) => t.trim())
        : [],
    };

    res.render("pages/projectById", {
      title: mappedProject.name,
      layout: "layouts/main",
      ...mappedProject,
    });
  } catch (error) {
    console.error(error);

    res.status(500).render("pages/error", {
      title: "Error",
      layout: "layouts/main",
      message: "Terjadi kesalahan saat mengambil project",
    });
  }
};

const createProject = async (req, res) => {
  try {
    const { projectName, startDate, endDate, description } = req.body;

    const technologies = Array.isArray(req.body.technologies)
      ? req.body.technologies.join(", ")
      : req.body.technologies;

    const imageFilename = req.file.filename;
    const imageUrl = `/uploads/${imageFilename}`;

    const data = await projectsService.createProject({
      projectName,
      startDate,
      endDate,
      description,
      technologies,
      imageUrl,
    });

    return res.redirect("/projects");
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Gagal menambahkan project",
    });
  }
};

const projectController = {
  renderProjectsPage,
  createProject,
  renderProjectById,
};
export default projectController;
