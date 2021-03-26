import React, { useState } from "react";
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
      <div className="tab-bar">
        <button
          id="tab-1"
          className="button tab-button tab1"
          onClick={() => nav(1)}
        >
          All keys
        </button>
        <button
          id="tab-2"
          className="button tab-button tab2"
          onClick={() => nav(2)}
        >
          Add keys
        </button>
        <button id="tab-3" className="button" onClick={() => nav(3)}>
          3
        </button>
      </div>
      <div className="tab-container">
        {selectedTab === 1 && (
          <div className="tab-content">
            <div id="all_keys">
              {uniqueNodes && nodes ? (
                <AllKeysList uniqueNodes={uniqueNodes} nodes={nodes} />
              ) : (
                <Loader />
              )}
            </div>

            <div className="footer">
              <div className="flex p-xxsmall mb-xsmall">
                <button
                  id="export"
                  className="button button--primary float-right"
                  onClick={() => exportFile()}
                >
                  Export
                </button>
              </div>
            </div>
          </div>
        )}
        {selectedTab === 2 && (
          <div className="tab-content">
            <div id="add_keys">
              {nodes ? <AddKeysList nodes={nodes} /> : <Loader />}
            </div>

            <div className="footer">
              <div className="flex p-xxsmall mb-xsmall">
                <button
                  id="add"
                  className="button button--primary float-right"
                  onClick={() => renameTextLayers()}
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        )}
        {selectedTab === 3 && (
          <div className="tab-content notifications-tab">
            <div id="notifications">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        )}
      </div>

      <a id="downloadAnchorElem" />
    </>
  );
};

export default App;
