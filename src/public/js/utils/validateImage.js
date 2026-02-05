export function validateImage(file) {
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
