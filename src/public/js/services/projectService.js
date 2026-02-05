export const fileToBase64 = function (file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;

    reader.readAsDataURL(file);
  });
};

export const addProject = function (project, callback) {
  const projects = JSON.parse(localStorage.getItem("projects")) || [];
  projects.push(project);

  localStorage.setItem("projects", JSON.stringify(projects));
  callback();
};

export const filterByLastTime = (projectData, minutes) => {
  const now = Date.now();
  // sekarang - 5 * 60detik * 1 detik
  const threshold = now - Number(minutes) * 60 * 1000;
  // sekarang

  return projectData.filter((p) => {
    const createdAt = new Date(p.createdAt).getTime();

    // Artinya data yang akan di tampilan itu adalah data yang di buat ... menit yang lalu
    //  createdAt itu 4 detik yang lalu
    // threshold itu 5 menit yang lalu
    // waktu saat ini 10
    // 6 >= 5
    return createdAt >= threshold;
  });
};

export const deleteProject = (projectData, id) => {
  const confirmDelete = confirm("Yakin hapus project?");
  if (!confirmDelete) return;

  projectData = projectData.filter((p) => p.id !== id);
  localStorage.setItem("projects", JSON.stringify(projectData));

  return projectData;
};

export const editProject = (projectData, projectId) => {
  const technologies = document.getElementById("technologies");
  const projectName = document.getElementById("projectName");
  const startDate = document.getElementById("startDate");
  const endDate = document.getElementById("endDate");
  const description = document.getElementById("description");
  const imagePreview = document.getElementById("imagePreview");

  const project = projectData.filter((p) => p.id === projectId)[0];

  projectName.value = project.projectName;
  startDate.value = project.startDate;
  endDate.value = project.endDate;
  description.value = project.description;
  imagePreview.src = project.image;
  imagePreview.classList.remove("d-none");

  const checkboxes = technologies.querySelectorAll('input[type="checkbox"]');

  Array.from(checkboxes).forEach(
    (p) => (p.checked = project.technologies.includes(p.value)),
  );

  return;
};
