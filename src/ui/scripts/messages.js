let nodes;

onmessage = (event) => {
  if (event.data.pluginMessage.type === 'textlayers') {
    nodes = event.data.pluginMessage.nodes;

    const uniqueNodes = nodes.filter((a, i) => nodes.findIndex(b => b.name === a.name && b.characters === a.characters) === i);

    addAllKeysHtml(uniqueNodes);
    addAddKeysHtml(uniqueNodes);
  }
}

function addAllKeysHtml(nodes) {
  const all_keys = document.querySelector('#all_keys');

  let html = '<ul class="all_keys_list">';

  var unsorted_keys = nodes.filter(node => node.name !== '#' && node.name?.startsWith('#'));
  var sorted_keys = unsorted_keys.sort((a, b) => a.name.localeCompare(b.name) );

  sorted_keys.forEach(node => {
    const id = node.id.replace(':', '-');
    html += `
    <li class="entry-all" onclick="focusNodes('${node.name}', '${node.characters}')" id="${id}">
    <table>  
      <tr>  
        <th><h5>${node.name}</h5></th>
        <th><h6>${node.characters}</h6></th>
        <th><div class="icon icon--trash" onclick="deleteNode('${node.name}', '${node.characters}')"></div></th>
      </tr>
    </table>
    </li>`;
  });
  html += '</ul>';
  all_keys.innerHTML = html;
};

function addAddKeysHtml(nodes) {
  const add_keys = document.querySelector('#add_keys');
  const showIgnored = document.querySelector('#checkbox-ignored').checked;

  let html = '<ul class="add_keys_list">';

  function filterNodes(node) {
    if (showIgnored) {
      return node
    } else {
      return !node.name?.startsWith('!')
    }
  }

  nodes.filter(n => !n.name?.startsWith('#')).filter(filterNodes).forEach(node => {
    const id = node.id.replace(':', '-');

    html += `
    <li class="entry" id="${node.id}">
      <div class="checkbox add_checkbox">
        <input id="checkbox-${id}" type="checkbox" class="checkbox__box" />
        <label for="checkbox-${id}" class="checkbox__label"></label>
        <div class="icon-button" onClick="toggleIgnore('ignoreicon${node.id}')">
          <div id="ignoreicon${node.id}" class="icon icon--${node.name?.startsWith('!') ? 'hidden' : 'visible'}"></div>
        </div>
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
