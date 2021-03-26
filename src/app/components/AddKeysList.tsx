import styled from "@emotion/styled";
import React from "react";

export const AddKeysList = ({ nodes }) => {
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

  const check = (id, value) => {
    (document.querySelector(
      `#checkbox-${id}`
    ) as HTMLInputElement).checked = !!value;
  };

  const toggleIgnore = (id, name, content) => {
    var element = document.getElementById(id);

    if (element.classList.contains("icon--visible")) {
      element.classList.add("icon--hidden");
      element.classList.remove("icon--visible");
      const entries = nodes
        .filter((n) => n.name === name && n.characters === content)
        .map((n) => ({ id: n.id, value: "!ignore" }));

      parent.postMessage(
        {
          pluginMessage: {
            type: "rename-textlayers",
            nodesToRename: entries,
          },
        },
        "*"
      );
    } else {
      element.classList.add("icon--visible");
      element.classList.remove("icon--hidden");
      const entries = nodes
        .filter((n) => n.name === name && n.characters === content)
        .map((n) => ({ id: n.id, value: "Ready to rename layers" }));

      parent.postMessage(
        {
          pluginMessage: {
            type: "rename-textlayers",
            nodesToRename: entries,
          },
        },
        "*"
      );
    }
  };

  return (
    <KeyList>
      {nodes
        .filter((node) => node.name === "#" || !node.name?.startsWith("#"))
        .filter((node) => node.name === "#" || !node.name?.startsWith("!"))
        .map((node) => {
          const id = node.id.replace(":", "-");
          const idIgnore = node.id
            .replace(":", "_")
            .replace(";", "_")
            .replace(":", "_");
          return (
            <>
              <Entry id={id}>
                <div className="checkbox add_checkbox">
                  <input
                    id={`checkbox-${id}`}
                    type="checkbox"
                    className="checkbox__box"
                  />
                  <label
                    htmlFor={`checkbox-${id}`}
                    className="checkbox__label"
                  />
                  <div
                    className="icon-button"
                    onClick={() =>
                      toggleIgnore(
                        `ignoreicon${idIgnore}`,
                        node.name,
                        node.characters
                      )
                    }
                  >
                    <div
                      id={`ignoreicon${idIgnore}`}
                      className="icon icon--visible"
                    />
                  </div>
                </div>
                <div className="add_inputs">
                  <div className="input input--with-icon add_layer_name">
                    <div className="icon icon--frame" />
                    <input
                      className="input__field"
                      value={node.name}
                      disabled
                    />
                  </div>
                  <div className="input input--with-icon add_layer_name_new">
                    <div className="icon icon--swap" />
                    <input
                      className="input__field"
                      value=""
                      onFocus={() => focusNodes(node.name, node.characters)}
                      onChange={(e) => check(id, e.currentTarget.value)}
                    />
                  </div>
                  <StyledTextArea rows={2}>{node.characters}</StyledTextArea>
                </div>
              </Entry>
              <div className="separator" />
            </>
          );
        })}
    </KeyList>
  );
};

const KeyList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin-top: 0;
`;

const Entry = styled.li`
  height: 128px;
  padding-top: 12px;

  .icon-button {
    position: absolute;
    margin-top: 64px;
  }
`;

const StyledTextArea = styled.textarea`
  font: 400 13.3333px Arial;
  font-style: normal;
  font-variant-ligatures: normal;
  font-variant-caps: normal;
  font-variant-numeric: normal;
  font-variant-east-asian: normal;
  font-weight: 400;
  font-stretch: normal;
  font-size: 13.3333px;
  line-height: normal;
  font-family: Arial;
`;
