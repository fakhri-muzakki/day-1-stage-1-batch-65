document.addEventListener('DOMContentLoaded', () => {
  const alerts = document.querySelectorAll('.flash-alert');

  alerts.forEach((alert) => {
    setTimeout(() => {
      alert.classList.remove('show');
      alert.classList.add('hide');

      setTimeout(() => {
        alert.remove();
      }, 300);
    }, 2000); // 2 detik
  });
});
