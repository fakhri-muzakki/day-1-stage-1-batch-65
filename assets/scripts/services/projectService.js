export const fileToBase64 = function (file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;

    reader.readAsDataURL(file);
  });
};

export const addProject = function (project) {
  const projects = JSON.parse(localStorage.getItem("projects")) || [];
  projects.push(project);

  localStorage.setItem("projects", JSON.stringify(projects));
};
