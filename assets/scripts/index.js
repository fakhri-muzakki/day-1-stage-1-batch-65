import Notfound from "./components/Notfound.js";
import ProjectCard from "./components/ProjectCard.js";
import {
  fileToBase64,
  addProject,
  filterByLastTime,
} from "./services/projectService.js";
import { validateImage } from "./utils/validateImage.js";

// ambil element
const projectsContainer = document.getElementById("projects");
const form = document.getElementById("projectForm");
const image = document.getElementById("image");
const imagePreview = document.getElementById("imagePreview");
const filterByLastTimeMenu = document.getElementById("filterByLastTimeMenu");

let projectData = [];
let projectId = 1;

// Function yang akan dijalankna ketika terjadi perubahan pada variabel projectData
const renderProjects = function (dataParams) {
  projectsContainer.innerHTML = "";

  const data = dataParams ? dataParams : projectData;

  data.forEach((project, index) => {
    const card = document.createElement("div");
    card.className = "col-md-4";

    card.innerHTML = ProjectCard(project);
    projectsContainer.appendChild(card);
  });
};

/**
 * Handle submit event from form
 * @param {SubmitEvent} event
 */
const handleSubmit = async function (event) {
  event.preventDefault();

  const formData = new FormData(event.currentTarget);
  const technologies = formData.getAll("technologies");
  const raw = Object.fromEntries(formData.entries());

  const currentTime = new Date();
  const date = {
    createdAt: currentTime,
    updatedAt: currentTime,
  };

  const imageFile = formData.get("image");

  // binary menjadi string
  const imageBase64 = imageFile ? await fileToBase64(imageFile) : "";

  const id = projectId++;
  const userInput = {
    id,
    ...raw,
    technologies: technologies,
    image: imageBase64,
    ...date,
  };

  // Menyimpan datanya ke local storage
  addProject(userInput, () => {
    projectData.push(userInput);
    renderProjects();

    // Supaya inputnya kosong lagi
    imagePreview.classList.add("d-none");
    form.reset();

    Toastify({
      text: "Project successfully added!",
      duration: 3000,
      gravity: "top",
      position: "right",
      close: true,
      style: {
        background: "#198754",
        borderRadius: "10px",
      },
    }).showToast();
  });
};

let imagePreviewUrl = "";
/**
 * Handle image input change
 * @param {Event} event
 */
const handleChange = function (event) {
  /** @type {HTMLInputElement} */
  const input = event.target;

  if (imagePreviewUrl) {
    URL.revokeObjectURL(imagePreviewUrl);
  }

  const file = input.files[0];
  const validatedImage = validateImage(file);
  if (!validatedImage) return;

  imagePreviewUrl = URL.createObjectURL(file);
  imagePreview.src = imagePreviewUrl;
  imagePreview.classList.remove("d-none");
};

// Function yang akan dijalankan ketika awal di load-nya halaman
const loadProjectData = function () {
  const data = localStorage.getItem("projects");

  if (data) {
    projectData = JSON.parse(data);
    projectId = projectData.length + 1;
    renderProjects();
  } else {
    projectsContainer.innerHTML = Notfound(
      "Data is empty",
      "You haven't added data yet",
    );
  }
};

form.addEventListener("submit", handleSubmit);
image.addEventListener("change", handleChange);

filterByLastTimeMenu.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-filter]");
  if (!button) return;

  const dataSet = button.dataset.filter; // 5
  const result = filterByLastTime(projectData, dataSet);

  if (!result.length) {
    projectsContainer.innerHTML = Notfound(
      "Data is empty",
      "You haven't added data yet",
    );
  } else {
    renderProjects(result);
  }
});

loadProjectData();
