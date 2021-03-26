import styled from "@emotion/styled";
import React, { useState } from "react";
import { Button } from "react-figma-plugin-ds";
import { useNodes } from "../hooks/useNodes";
import { AddKeysList } from "./AddKeysList";
import { AllKeysList } from "./AllKeysList";
import { Loader } from "./Loader";

const App = ({}) => {
  const [selectedTab, setSelectedTab] = useState<number>(1);

  const { nodes, uniqueNodes } = useNodes();

  const nav = (selected) => {
    setSelectedTab(selected);

    parent.postMessage(
      {
        pluginMessage: {
          type: "sync",
        },
      },
      "*"
    );
  };

  const exportFile = () => {
    if (!nodes) return;
    const entries = nodes
      .filter(
        (a, i) =>
          nodes.findIndex(
            (b) => b.name === a.name && b.characters === a.characters
          ) === i
      )
      .filter((node) => node.name !== "#" && node.name?.startsWith("#"));

    const obj = entries.reduce(
      (total, entry) => ({ ...total, [entry.name.slice(1)]: entry.characters }),
      {}
    );

    const dataStr =
      "data:text/json;charset=utf-8," +
      encodeURIComponent(JSON.stringify(obj, null, 4));
    const dlAnchorElem = document.getElementById("downloadAnchorElem");
    dlAnchorElem.setAttribute("href", dataStr);
    dlAnchorElem.setAttribute("download", "data.json");
    dlAnchorElem.click();
  };

  const renameTextLayers = () => {
    const entries = document.querySelectorAll(".entry");
    const nodesToRename = [];
    for (const entry of entries) {
      const checkbox = entry.children[0].children[0] as HTMLInputElement;
      const name = (entry.children[1].children[0]
        .children[1] as HTMLInputElement).value;
      const value = (entry.children[1].children[1]
        .children[1] as HTMLInputElement).value;
      const content = (entry.children[1].children[2] as HTMLInputElement).value;
      if (checkbox.checked && value) {
        nodes
          .filter((n) => n.name === name && n.characters === content)
          .forEach((n) => {
            nodesToRename.push({ id: n.id, value: "#" + value });
          });
      }
    }
    parent.postMessage(
      {
        pluginMessage: {
          type: "rename-textlayers",
          nodesToRename,
        },
      },
      "*"
    );
    nav(1);
  };

  return (
    <>
      <TabBar>
        <TabButton onClick={() => nav(1)}>All keys</TabButton>
        <TabButton onClick={() => nav(2)}>Add keys</TabButton>
        <TabButton onClick={() => nav(3)}>3</TabButton>
      </TabBar>
      <TabContainer>
        {selectedTab === 1 && (
          <Tab>
            <Container>
              {uniqueNodes && nodes ? (
                <AllKeysList uniqueNodes={uniqueNodes} nodes={nodes} />
              ) : (
                <Loader />
              )}
            </Container>

            <Footer>
              <StyledButton onClick={() => exportFile()}>Export</StyledButton>
            </Footer>
          </Tab>
        )}
        {selectedTab === 2 && (
          <Tab>
            <Container>
              {nodes ? <AddKeysList nodes={nodes} /> : <Loader />}
            </Container>

            <Footer>
              <StyledButton onClick={() => renameTextLayers()}>
                Add
              </StyledButton>
            </Footer>
          </Tab>
        )}
        {selectedTab === 3 && (
          <NotificationsTab>
            <div id="notifications">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </NotificationsTab>
        )}
      </TabContainer>

      <a id="downloadAnchorElem" />
    </>
  );
};

export default App;

const Container = styled.div`
  height: 552px;
  overflow: scroll;
`;

const TabBar = styled.div`
  display: flex;
  width: 100%;
  background-color: #fff;
  border-bottom: 1px solid #e5e5e5;
  z-index: 3;
  padding: 8px;
`;

const TabContainer = styled.div`
  margin-top: 40px;
`;

const Tab = styled.div``;

const TabButton = styled.div`
  color: #000;
  background-color: #fff;
  font-size: 11px;
  height: 38px;
  padding: 8px 8px 6px 8px;
`;

const NotificationsTab = styled(Tab)`
  background-color: #f4f4f4;
  height: 100%;
`;

const Footer = styled.div`
  position: fixed;
  width: 100%;
  bottom: 0;
  left: 0;
  background-color: #fff;
  height: 48px;
  border-top: 1px solid #e5e5e5;
  border-radius: 0px 0px 3px 3px;
  z-index: 3;
  margin-bottom: 1px;
`;

const StyledButton = styled(Button)`
  float: right;
`;
