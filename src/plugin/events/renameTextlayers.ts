import eventHandler from "../eventHandler";

eventHandler.addEventListener("rename-textLayers", (event) => {
  event.nodesToRename.forEach((nodeToRename: { id: string; value: string }) => {
    const node = figma.currentPage.findOne((n) => n.id === nodeToRename.id);
    node.name = nodeToRename.value;
    node.setRelaunchData({ edit: "", deleteRelaunch: "" });
  });
  eventHandler.fireEvent({ type: "sync" });
});
