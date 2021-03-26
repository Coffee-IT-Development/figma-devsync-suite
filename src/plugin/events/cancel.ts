import eventHandler from "../eventHandler";

eventHandler.addEventListener("cancel", (event) => {
  figma.closePlugin();
});
