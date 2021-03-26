import styled from "@emotion/styled";
import React from "react";

export const AllKeysList = ({ uniqueNodes, nodes }) => {
  const unsorted_keys = uniqueNodes.filter(
    (node) => node.name !== "#" && node.name?.startsWith("#")
  );
  const sorted_keys = unsorted_keys.sort((a, b) =>
    a.name.localeCompare(b.name)
  );

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
    <KeyList>
      {sorted_keys.forEach((node) => {
        const id = node.id.replace(":", "-");
        return (
          <EntryAll
            onClick={() => focusNodes(node.name, node.characters)}
            id={id}
          >
            <table>
              <tr>
                <th>
                  <h5>{node.name}</h5>
                </th>
                <th>
                  <h6>{node.characters}</h6>
                </th>
                <th>
                  <div
                    className="icon icon--trash"
                    onClick={() => deleteNode(node.name, node.characters)}
                  ></div>
                </th>
              </tr>
            </table>
          </EntryAll>
        );
      })}
    </KeyList>
  );
};

const KeyList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin-top: 8px;
`;

const EntryAll = styled.li`
  padding: 0px 8px;
  min-height: 40px;
  margin-left: 6px;
  margin-right: 6px;
  border-radius: 4px;

  h5 {
    font-size: 11;
    font-weight: 600;
    float: left;
    width: 140px;
    margin: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    padding: 10px 0px;
  }

  h6 {
    font-size: 11;
    font-weight: 400;
    float: left;
    margin: 0;
    width: 208px;
    margin-left: 16px;
    overflow: hidden;
    text-overflow: ellipsis;
    padding: 10px 0px;
  }

  .icon {
    float: right;
    margin-top: 0px;
    display: none;
  }

  .icon:hover {
    cursor: pointer;
  }

  &:hover {
    background-color: #e6f1f8;

    .icon {
      display: block;
    }
  }
`;
