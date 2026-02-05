export default function ProjectCard(project) {
  return `
     <div  class="card h-100 shadow-lg" data-project-id="${project.id}">
     <a href="/projects/${project.id}" class="text-decoration-none ">
        <img
          src="${project.image}"
          height="200px"
          class="card-img-top"
          alt="Project Image"
        />
      </a>

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

          <div class="d-flex gap-2 button-wraper">
            <button class="btn btn-warning btn-sm w-50 btn-edit" >Edit</button>
            <button class="btn btn-danger btn-sm w-50 btn-delete">Delete</button>
          </div>
        </div>
      </div>`;
}
