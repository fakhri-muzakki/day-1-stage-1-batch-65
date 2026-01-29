// ambil element
const projectsContainer = document.getElementById("projects");
const form = document.getElementById("projectForm");
const projectName = document.getElementById("projectName");
const startDate = document.getElementById("startDate");
const endDate = document.getElementById("endDate");
const description = document.getElementById("description");
const image = document.getElementById("image");
const imagePreview = document.getElementById("imagePreview");

const projectData = [];

function renderProjects() {
  projectsContainer.innerHTML = "";

  projectData.forEach((project, index) => {
    const card = document.createElement("div");
    card.className = "col-md-4";

    card.innerHTML = `
      <div class="card h-100 shadow-lg">
        <img
          src="${URL.createObjectURL(project.image)}"
          class="card-img-top"
          alt="Project Image"
        />
        <div class="card-body">
          <h5 class="card-title">${project.projectName}</h5>
          <p class="card-text">${project.description}</p>

          <div class="mb-3">
            ${project.technologies
              .map(
                (tech) =>
                  `<span class="badge bg-secondary me-1">${tech}</span>`,
              )
              .join("")}
          </div>

          <div class="d-flex gap-2">
            <button class="btn btn-warning btn-sm w-50">Edit</button>
            <button class="btn btn-danger btn-sm w-50">Delete</button>
          </div>
        </div>
      </div>
    `;

    projectsContainer.appendChild(card);
  });
}

/**
 * Handle submit event from form
 * @param {SubmitEvent} event
 */
const handleSubmit = function (event) {
  event.preventDefault();

  const formData = new FormData(event.currentTarget);
  const technologies = formData.getAll("technologies");
  const raw = Object.fromEntries(formData.entries());
  const userInput = { ...raw, technologies: technologies };

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
  if (!file) return;

  const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
  if (!allowedTypes.includes(file.type)) {
    alert("Only JPG and PNG are allowed");
    input.value = "";
    imagePreview.classList.add("d-none");
    return;
  }

  if (file.size > 2 * 1024 * 1024) {
    alert("Image must be less than 2MB");
    input.value = "";
    imagePreview.classList.add("d-none");
    return;
  }

  imagePreviewUrl = URL.createObjectURL(file);
  imagePreview.src = imagePreviewUrl;
  imagePreview.classList.remove("d-none");
};

form.addEventListener("submit", handleSubmit);

image.addEventListener("change", handleChange);
