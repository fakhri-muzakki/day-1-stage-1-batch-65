export default function Notfound(title, message, isItForPage) {
  const buttons = `
     <div class="d-flex justify-content-center gap-3 ">
          <a href="projects.html" class="btn btn-primary px-4"> Back to Home </a>
          <button
            class="btn btn-outline-secondary px-4"
            onclick="history.back()"
          >
            Go Back
          </button>
        </div>
    `;

  return `
      <div class="text-center">
        <h1 class="display-1 fw-bold text-secondary">404</h1>
        <h3 class="fw-semibold mb-3">${title}</h3>
        <p class="text-muted mb-4">
          ${message}
        </p>
        ${isItForPage ? buttons : ""}
      </div>
    `;
}
