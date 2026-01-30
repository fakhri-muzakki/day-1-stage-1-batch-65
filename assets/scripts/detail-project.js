import Notfound from "./components/Notfound.js";

const container = document.getElementById("container");
const projectName = document.getElementById("projectName");
const image = document.getElementById("image");
const date = document.getElementById("date");
const technologies = document.getElementById("technologies");
const description = document.getElementById("description");

const fillData = function (project) {
  const technologiesData = project.technologies
    .map((tech) => `<span class="badge bg-secondary me-1">${tech}</span>`)
    .join("");

  projectName.innerText = project.projectName;
  image.src = project.image;
  date.innerText = `${project.startDate} - ${project.endDate}`;
  technologies.innerHTML = technologiesData;
  description.innerText = project.description;
};

const prepareData = function () {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  if (!id) {
    container.innerHTML = Notfound(
      "Id is notfound",
      `Id not included in url`,
      true,
    );
  }

  const result = localStorage.getItem("projects");
  const data = JSON.parse(result);
  const project = data.find((d) => d.id === Number(id));

  if (project) {
    fillData(project);
  } else {
    container.innerHTML = Notfound(
      "Data is notfound",
      `Data with id ${id} not found`,
      true,
    );
  }
};

prepareData();
