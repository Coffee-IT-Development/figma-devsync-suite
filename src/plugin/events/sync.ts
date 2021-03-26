import eventHandler from "../eventHandler";
import nodes from "../nodes";

eventHandler.addEventListener("sync", (event) => {
  const processedNodes = nodes.initialSelection.reduce(
    (total, selectionNode) => [
      ...total,
      ...(selectionNode.findAll((node) => node.type === "TEXT") as TextNode[]),
    ],
    []
  );

  figma.ui.postMessage({
    type: "textlayers",
    nodes: processedNodes.map((node) => ({
      ...node,
      name: node.name,
      characters: node.characters,
    })),
  });
});
