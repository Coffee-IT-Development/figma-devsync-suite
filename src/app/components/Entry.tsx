import styled from "@emotion/styled";
import React from "react";
import { Icon } from "react-figma-plugin-ds";

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
      <span className="name">{node.name}</span>
      <span>{node.characters}</span>
      <Trash
        name="trash"
        onClick={() => deleteNode(node.name, node.characters)}
      />
    </Row>
  );
};

const Row = styled.div`
  cursor: pointer;
  padding: 5px;
  border-radius: 5px;
  font-size: 14px;

  display: flex;
  align-items: center;

  .name {
    font-weight: bold;
    width: 30%;
  }

  &:hover {
    background-color: #18a0fb24;
  }
`;

const Trash = styled(Icon)`
  cursor: pointer;
  margin-left: auto;
`;
