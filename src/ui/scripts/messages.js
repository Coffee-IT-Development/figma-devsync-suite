let nodes;

onmessage = (event) => {
  if (event.data.pluginMessage.type === 'textlayers') {
    nodes = event.data.pluginMessage.nodes;

    uniqueNodes = nodes.filter((a, i) => nodes.findIndex(b => b.name === a.name && b.characters === a.characters) === i);

    addAllKeysHtml(uniqueNodes);
    addAddKeysHtml(uniqueNodes);
  }
}

function addAllKeysHtml(nodes) {
  const all_keys = document.querySelector('#all_keys');

  let html = '<ul class="all_keys_list">';

  nodes.filter(node => node.name !== '#' && node.name?.startsWith('#')).forEach(node => {
    const id = node.id.replace(':', '-');
    html += `
    <li class="entry-all" onclick="focusNodes('${node.name}', '${node.characters}')" id="${id}">
        <h5>${node.name}</h5>
        <h6>${node.characters}</h6>
        <div class="icon icon--trash" onclick="deleteNode('${node.name}', '${node.characters}')"></div>
    </li>`;
  });
  html += '</ul>';
  all_keys.innerHTML = html;
};

function addAddKeysHtml(nodes) {
  const add_keys = document.querySelector('#add_keys');

  let html = '<ul class="add_keys_list">';

  nodes.filter(node => node.name === '#' || !node.name?.startsWith('#')).forEach(node => {
    const id = node.id.replace(':', '-');
    html += `
    <li class="entry" id="${id}">
      <div class="checkbox add_checkbox">
        <input id="checkbox-${id}" type="checkbox" class="checkbox__box" />
        <label for="checkbox-${id}" class="checkbox__label"></label>
      </div>
      <div class="add_inputs">
        <div class="input input--with-icon add_layer_name">
          <div class="icon icon--frame"></div>
          <input class="input__field" value="${node.name}" disabled/>
        </div>
        <div class="input input--with-icon add_layer_name_new">
          <div class="icon icon--swap"></div>
          <input class="input__field" value="" onfocus="focusNodes('${node.name}', '${node.characters}')" onkeyup="check('${id}', this.value)"/>
        </div>
        <textarea class="textarea" rows="2">${node.characters}</textarea>
      <div>
    </li>
    <div class="separator"></div>`;
  });
  html += '</ul>';
  add_keys.innerHTML = html;
};
