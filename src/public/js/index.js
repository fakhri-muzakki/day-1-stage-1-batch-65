const image = document.getElementById("image");
const imagePreview = document.getElementById("imagePreview");

let imagePreviewUrl = "";

function validateImage(file) {
  if (!file) return;

  const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];

  if (!allowedTypes.includes(file.type)) {
    alert("Only JPG and PNG are allowed");
    input.value = "";
    imagePreview.classList.add("d-none");
    return false;
  }

  if (file.size > 2 * 1024 * 1024) {
    alert("Image must be less than 2MB");
    input.value = "";
    imagePreview.classList.add("d-none");
    return false;
  }

  return true;
}

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

image.addEventListener("change", handleChange);
