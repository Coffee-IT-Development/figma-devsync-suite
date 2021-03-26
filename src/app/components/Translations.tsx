import styled from "@emotion/styled";
import React from "react";
import { Entry } from "./Entry";

export const Translations = ({ uniqueNodes, nodes }) => {
  const unsorted_keys = uniqueNodes.filter(
    (node) => node.name !== "#" && node.name?.startsWith("#")
  );
  const sorted_keys = unsorted_keys.sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  return (
    <KeyList>
      {sorted_keys.map((node) => (
        <Entry node={node} nodes={nodes} />
      ))}
    </KeyList>
  );
};

const KeyList = styled.ul`
  list-style-type: none;
  margin-top: 8px;
  padding: 10px;
`;
