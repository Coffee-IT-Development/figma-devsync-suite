import styled from "@emotion/styled";
import React from "react";
import { AddKey } from "./AddKey";

type Props = {
  nodes: Array<TextNode & { name: string; characters: string }>;
  showIgnored: boolean;
};

export const AddKeysList = ({ nodes, showIgnored }: Props) => {
  const filteredNodes = nodes
    .filter((n) => !n.name?.startsWith("#"))
    .filter((n) => (showIgnored ? n : !n.name?.startsWith("!")));

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

  return (
    <KeyList>
      {filteredNodes.map((node) => (
        <div key={node.id}>
          <AddKey
            node={node}
            onFocus={(name, content) => focusNodes(name, content)}
          />
          <Separator />
        </div>
      ))}
    </KeyList>
  );
};

const KeyList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin-top: 0;
`;

const Separator = styled.div`
  width: 100%;
  height: 1px;
  background-color: #e5e5e5;
`;
