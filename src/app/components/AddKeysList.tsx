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

  return (
    <KeyList>
      {filteredNodes.map((node) => (
        <>
          <AddKey node={node} />
          <Separator />
        </>
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
