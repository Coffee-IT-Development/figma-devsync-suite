import styled from "@emotion/styled";
import React from "react";
import { Entry } from "./Entry";

export const Translations = ({ uniqueNodes }) => {
  const unsorted_keys = uniqueNodes.filter(
    (node) => node.name !== "#" && node.name?.startsWith("#")
  );
  const sorted_keys = unsorted_keys.sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  return (
    <KeyList>
      {sorted_keys.forEach((node) => {
        return <Entry node={node} />;
      })}
    </KeyList>
  );
};

const KeyList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin-top: 8px;
  background-color: red;
`;
