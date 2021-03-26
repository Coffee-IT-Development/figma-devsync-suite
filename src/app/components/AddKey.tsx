import styled from "@emotion/styled";
import React, { useState } from "react";
import { Checkbox, Icon, Input, Textarea } from "react-figma-plugin-ds";

export const AddKey = ({ node }) => {
  const [isIgnored, setIsIgnored] = useState(!!node.name?.startsWith("!"));

  const toggleIgnore = () => {
    parent.postMessage(
      {
        pluginMessage: {
          type: "rename-textlayers",
          nodesToRename: [
            {
              id: node.id,
              value: isIgnored ? "Ready to rename layers" : "!ignore",
            },
          ],
        },
      },
      "*"
    );
    setIsIgnored((i) => !i);
  };

  return (
    <Entry id={node.id}>
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
          onClick={() => toggleIgnore()}
          name={isIgnored ? "hidden" : "visible"}
        />
        <TextAreaContainer>
          <StyledTextArea placeholder={node.characters} isDisabled rows={2} />
        </TextAreaContainer>
      </Row>
    </Entry>
  );
};

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
