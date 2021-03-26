import eventHandler from "../eventHandler";

eventHandler.addEventListener("focus-node", (event) => {
  const nodes = figma.currentPage.findAll((n) => event.ids.includes(n.id));
  figma.viewport.scrollAndZoomIntoView(nodes);
  figma.currentPage.selection = nodes;
});
