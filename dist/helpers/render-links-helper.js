export const renderLinks = (links_a, a_link, nav_el) => {
    links_a.forEach((a) => {
        a.classList.remove("active");
        a.classList.add("inactive");
    });
    nav_el.classList.add("hidden");
    a_link.classList.remove("inactive");
    a_link.classList.add("active");
};
