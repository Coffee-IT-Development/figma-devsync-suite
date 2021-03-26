import { dimensions } from "./config";

figma.showUI(__html__, dimensions);

let initialSelection: Array<PageNode | FrameNode> = [];
setup();

figma.ui.onmessage = (msg) => {
  if (msg.type === "rename-textlayers") {
    msg.nodesToRename.forEach((nodeToRename: { id: string; value: string }) => {
      const node = figma.currentPage.findOne((n) => n.id === nodeToRename.id);
      node.name = nodeToRename.value;
    });
  }

  if (msg.type === "focus-node") {
    const nodes = figma.currentPage.findAll((n) => msg.ids.includes(n.id));
    figma.viewport.scrollAndZoomIntoView(nodes);
    figma.currentPage.selection = nodes;
  }

  if (msg.type === "cancel") {
    figma.closePlugin();
  }

  if (msg.type === "sync") {
    const nodes = initialSelection.reduce(
      (total, selectionNode) => [
        ...total,
        ...(selectionNode.findAll(
          (node) => node.type === "TEXT"
        ) as TextNode[]),
      ],
      []
    );

    figma.ui.postMessage({
      type: "textlayers",
      nodes: nodes.map((node) => ({
        ...node,
        name: node.name,
        characters: node.characters,
      })),
    });
  }
};

function setup() {
  let nodes: TextNode[] = [];
  if (figma.currentPage.selection.length > 0) {
    nodes = figma.currentPage.selection.reduce((total, selectionNode) => {
      if (selectionNode.type === "FRAME") {
        initialSelection.push(selectionNode);
        return [
          ...total,
          ...(selectionNode.findAll(
            (node) => node.type === "TEXT"
          ) as TextNode[]),
        ];
      }
      return total;
    }, []);
  } else {
    nodes = figma.currentPage.findAll(
      (node) => node.type === "TEXT"
    ) as TextNode[];
    initialSelection = [figma.currentPage];
  }

  figma.ui.postMessage({
    type: "textlayers",
    nodes: nodes.map((node) => ({
      ...node,
      name: node.name,
      characters: node.characters,
    })),
  });
}
