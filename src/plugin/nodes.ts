class Nodes {
  initialSelection: Array<PageNode | FrameNode> = [];

  constructor() {}

  init() {
    let nodes: TextNode[] = [];
    if (figma.currentPage.selection.length > 0) {
      nodes = figma.currentPage.selection.reduce((total, selectionNode) => {
        if (selectionNode.type === "FRAME") {
          this.initialSelection.push(selectionNode);
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
      this.initialSelection = [figma.currentPage];
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
}

export default new Nodes();
