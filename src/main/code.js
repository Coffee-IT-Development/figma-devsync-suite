figma.showUI(__html__, { width: 430, height: 640 });
let initialSelection = [];
setup();
figma.ui.onmessage = msg => {
    if (msg.type === 'rename-textlayers') {
        msg.nodesToRename.forEach((nodeToRename) => {
            const node = figma.currentPage.findOne(n => n.id === nodeToRename.id);
            node.name = nodeToRename.value;
        });
        nav(1);
    }
    if (msg.type === 'focus-node') {
        const nodes = figma.currentPage.findAll(n => msg.ids.includes(n.id));
        figma.viewport.scrollAndZoomIntoView(nodes);
        figma.currentPage.selection = nodes;
    }
    if (msg.type === 'cancel') {
        figma.closePlugin();
    }
    if (msg.type === 'sync') {
        const nodes = initialSelection.reduce((total, selectionNode) => [...total, ...selectionNode.findAll(node => node.type === 'TEXT')], []);
        figma.ui.postMessage({
            type: 'textlayers',
            nodes: nodes.map(node => (Object.assign(Object.assign({}, node), { name: node.name, characters: node.characters })))
        });
    }
};
function setup() {
    let nodes = [];
    if (figma.currentPage.selection.length > 0) {
        nodes = figma.currentPage.selection.reduce((total, selectionNode) => {
            if (selectionNode.type === 'FRAME') {
                initialSelection.push(selectionNode);
                return [...total, ...selectionNode.findAll(node => node.type === 'TEXT')];
            }
            return total;
        }, []);
    }
    else {
        nodes = figma.currentPage.findAll(node => node.type === 'TEXT');
        initialSelection = [figma.currentPage];
    }
    figma.ui.postMessage({
        type: 'textlayers',
        nodes: nodes.map(node => (Object.assign(Object.assign({}, node), { name: node.name, characters: node.characters })))
    });
}
