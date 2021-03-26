import { dimensions } from "./config";
import eventHandler from "./eventHandler";
import "./events";
import nodes from "./nodes";

figma.showUI(__html__, dimensions);

nodes.init();

figma.ui.onmessage = (msg) => {
  eventHandler.fireEvent(msg);
};
