import eventHandler from "../eventHandler";

eventHandler.addEventListener("rename-textLayers", (event) => {
  event.nodesToRename.forEach((nodeToRename: { id: string; value: string }) => {
    const node = figma.currentPage.findOne((n) => n.id === nodeToRename.id);
    node.name = nodeToRename.value;
    node.setPluginData("DevSyncData", "kebxkqjdbqk");
    const x = node.getPluginData("DevSyncData");
    console.log(x);
    node.setRelaunchData({ edit: "", deleteRelaunch: "" });
  });
});
