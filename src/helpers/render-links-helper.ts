
export const renderLinks = (links_a : HTMLAnchorElement[], a_link : HTMLAnchorElement, nav_el : HTMLElement) => {
  links_a.forEach((a) => {
    a.classList.remove("active");
    a.classList.add("inactive");
  });
  nav_el.classList.add("hidden");
  a_link.classList.remove("inactive");
  a_link.classList.add("active");
}
