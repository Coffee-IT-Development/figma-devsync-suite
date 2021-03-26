import { useEffect, useState } from "react";

export const useNodes = () => {
  const [nodes, setNodes] = useState<
    Array<TextNode & { name: string; characters: string }>
  >();
  const [uniqueNodes, setUniqueNodes] = useState();

  useEffect(() => {
    window.onmessage = (event) => {
      if (event.data.pluginMessage.type === "textlayers") {
        const newNodes = event.data.pluginMessage.nodes;
        console.log(newNodes);
        setNodes(newNodes);
        setUniqueNodes(
          newNodes.filter(
            (a, i) =>
              newNodes.findIndex(
                (b) => b.name === a.name && b.characters === a.characters
              ) === i
          )
        );
      }
    };
  }, []);

  return {
    nodes,
    uniqueNodes,
  };
};
