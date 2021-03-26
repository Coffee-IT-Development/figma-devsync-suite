import styled from "@emotion/styled";
import React from "react";

export const Entry = ({ node, nodes }) => {
  const focusNodes = (name, content) => {
    const ids = nodes
      .filter((n) => n.name === name && n.characters === content)
      .map((n) => n.id.replace("-", ":"));

    parent.postMessage(
      {
        pluginMessage: {
          type: "focus-node",
          ids,
        },
      },
      "*"
    );
  };

  const deleteNode = (name, content) => {
    const entries = nodes
      .filter((n) => n.name === name && n.characters === content)
      .map((n) => ({ id: n.id, value: "This key is deleted" }));

    parent.postMessage(
      {
        pluginMessage: {
          type: "rename-textlayers",
          nodesToRename: entries,
        },
      },
      "*"
    );
    parent.postMessage(
      {
        pluginMessage: {
          type: "sync",
        },
      },
      "*"
    );
  };

  return (
    <Row onClick={() => focusNodes(node.name, node.characters)}>
      <h5>{node.name}</h5>
      <h6>{node.characters}</h6>
      <div
        className="icon icon--trash"
        onClick={() => deleteNode(node.name, node.characters)}
      ></div>
    </Row>
  );
};

const Row = styled.div`
  cursor: pointer;

  &:hover {
    background-color: #18a0fb;
  }
`;
