const renderHomePage = (req, res) => {
  res.render("pages/home", {
    title: "Home",
    layout: "layouts/main",
  });
};

const homeController = { renderHomePage };
export default homeController;
