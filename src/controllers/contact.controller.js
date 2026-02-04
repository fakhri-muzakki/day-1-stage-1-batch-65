const renderContactPage = (req, res) => {
  res.render("pages/contact", {
    title: "Contact",
    layout: "layouts/main",
  });
};

const contactController = { renderContactPage };
export default contactController;
