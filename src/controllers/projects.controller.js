const renderProjectsPage = async (req, res) => {
  res.render("pages/projects", {
    title: "Projects",
    layout: "layouts/main",
  });
};

const renderProjectById = async (req, res) => {
  res.render("pages/projectById", {
    title: "Projects",
    layout: "layouts/main",
  });
};

const projectController = {
  renderProjectsPage,
  renderProjectById,
};
export default projectController;
