// coords у HTML задані для розмірів зображення з атрибутів width та height.
for (const img of document.querySelectorAll("img[usemap]")) {
  const map = document.querySelector(img.getAttribute("usemap").replace("#", "map[name=") + "]");
  const areas = [...map.querySelectorAll("area[coords]")].map(area =>
    [area, area.coords.split(",").map(Number)]
  );
  function resizeMap() {
    const scale = img.getBoundingClientRect().width / Number(img.getAttribute("width"));
    for (const [area, coords] of areas) {
      area.coords = coords.map(value => Math.round(value * scale)).join(",");
    }
  }
  img.addEventListener("load", resizeMap);
  new ResizeObserver(resizeMap).observe(img);
  resizeMap();
}
