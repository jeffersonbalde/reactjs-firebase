import Swal from "sweetalert2";

const showAlert = ({
  icon = "info",
  title,
  text,
  confirmColor,
}) => {
  // Set confirmColor based on icon if not manually provided
  if (!confirmColor) {
    if (icon === "error") confirmColor = "#7A3200"; // red
    else if (icon === "success") confirmColor = "#004332"; // green
    else confirmColor = "#7A3200"; // default
  }

  return Swal.fire({
    icon,
    title,
    text,
    showConfirmButton: true,
    customClass: {
      popup: "swal-popup",
      title: "swal-title",
      htmlContainer: "swal-text",
      icon: "swal-icon",
      confirmButton: "swal-confirm",
    },
    didOpen: () => {
      const popup = document.querySelector(".swal-popup");
      const titleEl = document.querySelector(".swal-title");
      const textEl = document.querySelector(".swal-text");
      const iconEl = document.querySelector(".swal-icon");
      const confirmBtn = document.querySelector(".swal-confirm");

      if (popup) {
        popup.style.padding = "15px";
        popup.style.maxWidth = "320px";
      }
      if (iconEl) iconEl.style.margin = "10px auto 0 auto";
      if (titleEl) {
        titleEl.style.marginBottom = "6px";
        titleEl.style.fontSize = "1.8rem";
      }
      if (textEl) {
        textEl.style.marginBottom = "10px";
        textEl.style.fontSize = "1.2rem";
      }
      if (confirmBtn) {
        confirmBtn.style.backgroundColor = confirmColor;
        confirmBtn.style.color = "white";
        confirmBtn.style.border = "none";
        confirmBtn.style.padding = "13px 16px";
        confirmBtn.style.borderRadius = "6px";
        confirmBtn.style.transition = "background-color 0.2s";
      }

      const style = document.createElement("style");
      style.innerHTML = `
        .swal-confirm:hover {
          background-color: ${confirmColor} !important;
        }`;
      document.head.appendChild(style);
    },
  });
};

export default showAlert;