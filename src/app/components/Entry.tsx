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
      <span className="content">{node.characters}</span>
      <Trash
        name="trash"
        onClick={() => deleteNode(node.name, node.characters)}
      />
    </Row>
  );
};

const Row = styled.div`
  cursor: pointer;
  min-height: 40px;
  padding: 4px 8px;
  border-radius: 5px;
  font-size: 12px;
  display: flex;

  .name {
    font-weight: bold;
    width: 180px;
    overflow: hidden;
    text-overflow: ellipsis;
    padding: 8px 0px 8px 0px;
  }

  .content {
    width: 180px;
    overflow: hidden;
    text-overflow: ellipsis;
    padding: 8px 8px 8px 8px;
  }

  .icon-button {
    display: none;
  }

  &:hover {
    background-color: #18a0fb24;
  }

  &:hover .icon-button {
    display: block;
  }
`;

const Trash = styled(Icon)`
  cursor: pointer;
  margin-left: auto;
`;
