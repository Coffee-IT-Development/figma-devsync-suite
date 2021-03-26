import styled from "@emotion/styled";
import React from "react";
import { Checkbox, Icon, Input, Textarea } from "react-figma-plugin-ds";

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

  const check = (id, value) => {
    (document.querySelector(
      `#checkbox-${id}`
    ) as HTMLInputElement).checked = !!value;
  };

  const toggleIgnore = (id) => {
    const elementId = id.split("ignoreicon")[1];
    const element = document.getElementById(id);

    if (element.classList.contains("icon--visible")) {
      element.classList.replace("icon--visible", "icon--hidden");
      const entries = nodes
        .filter((n) => n.id === elementId)
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
      element.classList.replace("icon--hidden", "icon--visible");
      const entries = nodes
        .filter((n) => n.id === elementId)
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
      {filteredNodes.map((node) => {
        const id = node.id.replace(":", "-");
        return (
          <>
            <Entry id={node.id} key={node.id}>
              <Row>
                <Checkbox label="" />
                <InputContainer first={true}>
                  <Input
                    placeholder=""
                    defaultValue={node.name}
                    isDisabled
                    icon="frame"
                    type="text"
                  />
                </InputContainer>
                <InputContainer>
                  <Input
                    placeholder=""
                    defaultValue={node.name}
                    icon="swap"
                    type="text"
                  />
                </InputContainer>
              </Row>
              <Row>
                <StyledIcon
                  onClick={() => toggleIgnore(`ignoreicon${node.id}`)}
                  name={node.name?.startsWith("!") ? "hidden" : "visible"}
                />
                <TextAreaContainer>
                  <StyledTextArea
                    placeholder={node.characters}
                    isDisabled
                    rows={2}
                  />
                </TextAreaContainer>
              </Row>
            </Entry>
            <Seperator />
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

const Seperator = styled.div`
  width: 100%;
  height: 1px;
  background-color: #e5e5e5;
`;

const Entry = styled.li`
  height: 128px;
  padding: 12px 16px;
`;

const Row = styled.div`
  display: flex;
  width: 100%;
  position: relative;
`;

const InputContainer = styled.div<{ first?: boolean }>`
  display: flex;
  width: 100%;
  border: 1px solid rgb(0, 0, 0, 0.1);

  ${(props) => props.first && `margin-right: 13px`};
`;

const StyledIcon = styled(Icon)`
  background-color: "transparant" !important;
`;

const TextAreaContainer = styled.div`
  display: flex;
  width: 100%;
  border: 1px solid rgb(0, 0, 0, 0.1);
`;

const StyledTextArea = styled(Textarea)`
  font: 400 11px Arial;
  font-style: normal;
  font-variant-ligatures: normal;
  font-variant-caps: normal;
  font-variant-numeric: normal;
  font-variant-east-asian: normal;
  font-weight: 400;
  font-stretch: normal;
  font-size: 11px;
  line-height: normal;
  font-family: Arial;
`;
