const exportButton = document.querySelector('#export');
const cancelButton = document.querySelector('#cancel');
const addButton = document.querySelector('#add');

//initialize select menu
selectMenu.init();
nav(1);

//functions
function exportFile() {
    const entries = nodes
        .filter((a, i) => nodes.findIndex(b => b.name === a.name && b.characters === a.characters) === i)
        .filter(node => node.name !== '#' && node.name?.startsWith('#'));

    const obj = entries.reduce((total, entry) => ({ ...total, [entry.name.slice(1)]: entry.characters }), {});

    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(obj, null, 4));
    const dlAnchorElem = document.getElementById('downloadAnchorElem');
    dlAnchorElem.setAttribute('href', dataStr);
    dlAnchorElem.setAttribute('download', 'data.json');
    dlAnchorElem.click();
}

function cancel() {
    parent.postMessage({ pluginMessage: { type: 'cancel' } }, '*')
};

function focusNodes(name, content) {
    const ids = nodes
        .filter(n => n.name === name && n.characters === content)
        .map(n => n.id.replace('-', ':'));
    parent.postMessage({ pluginMessage: { 
        type: 'focus-node',
        ids,
    } }, '*');
};

function renameTextLayers() {
    const entries = document.querySelectorAll('.entry');
    const nodesToRename = [];
    for (const entry of entries) {
        const checkbox = entry.children[0].children[0];
        const name = entry.children[1].children[0].children[1].value;
        const value = entry.children[1].children[1].children[1].value
        const content = entry.children[1].children[2].value;
        if (checkbox.checked && value) {
            nodes.filter(n => n.name === name && n.characters === content).forEach(n => {
                nodesToRename.push({ id: n.id, value: '#' + value });
            });
        }
    }
    parent.postMessage({ pluginMessage: { 
        type: 'rename-textlayers',
        nodesToRename
    } }, '*');
};

function deleteNode(name, content) {
    const entries = nodes
        .filter(n => n.name === name && n.characters === content)
        .map(n => ({ id: n.id, value: 'This key is deleted' }));

    parent.postMessage({ pluginMessage: { 
        type: 'rename-textlayers',
        nodesToRename: entries
    } }, '*');
    parent.postMessage({ pluginMessage: { 
        type: 'sync',
    } }, '*');
};

function check(id, value) {
    document.querySelector(`#checkbox-${id}`).checked = !!value;
};

function toggleIgnore(id, name, content) {
    var element = document.getElementById(id);

    if(element.classList.contains("icon--visible")){
        element.classList.add('icon--hidden');
        element.classList.remove('icon--visible');
        const entries = nodes
        .filter(n => n.name === name && n.characters === content)
        .map(n => ({ id: n.id, value: '!ignore' }));

        parent.postMessage({ pluginMessage: { 
            type: 'rename-textlayers',
            nodesToRename: entries
        } }, '*');
    } else {
        element.classList.add('icon--visible');
        element.classList.remove('icon--hidden');
        const entries = nodes
        .filter(n => n.name === name && n.characters === content)
        .map(n => ({ id: n.id, value: 'Ready to rename layers' }));

        parent.postMessage({ pluginMessage: { 
            type: 'rename-textlayers',
            nodesToRename: entries
        } }, '*');
    }
    
};

function nav(selected) {
    const tabs = document.querySelector('.tab-container').children;
    const tab1 = document.querySelector('#tab-1');
    const tab2 = document.querySelector('#tab-2');

    if (tabs[selected - 1].style.display === 'block') return;

    for (let tab of tabs) {
        tab.style.display = 'none';
    }
    tabs[selected - 1].style.display = 'block';

    switch(selected) {
        case 1:
            tab1.style.opacity = '1';
            tab2.style.opacity = '0.3';
            break;
        case 2:
            tab1.style.opacity = '0.3';
            tab2.style.opacity = '1';
            break;
        case 3:
            tab1.style.opacity = '0.3';
            tab2.style.opacity = '0.3';
            break;
    }

    parent.postMessage({ pluginMessage: { 
        type: 'sync',
    } }, '*');
};


