export const getTheme = () => {
  const mainContainer = document.querySelector(".Container__main");

  if (mainContainer?.classList.contains("dark")) {
    return true;
  }

  return false;
};

export const toggleTheme = () => {
  const container = document.querySelector(".Container__main");
  container?.classList.toggle("dark");
  
  window.dispatchEvent(new Event("themeChanged"));
};

export const toggleMenu = () => {
  const container = document.querySelector(".Container__menu");
  container?.classList.toggle("active");
  
};
