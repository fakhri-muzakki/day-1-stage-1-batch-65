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
