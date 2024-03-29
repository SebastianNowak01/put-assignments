let ID = 0;

function createNewEntry() {
  let containerDiv = document.getElementById("container");
  let entryDiv = document.createElement("div");
  let authorDiv = document.createElement("div");
  let titleDiv = document.createElement("div");
  let buttonsDiv = document.createElement("div");

  // all ID operations have to be in this section bc later they will be updated
  let editButton = createButton("save", ID);
  let removeButton = createButton("remove", ID);
  entryDiv.id = ID;
  // end of ID operations section
  ID++;

  authorDiv.append(document.createElement("input"));
  titleDiv.append(document.createElement("input"));
  buttonsDiv.append(editButton, removeButton);
  entryDiv.append(authorDiv, titleDiv, buttonsDiv);
  containerDiv.append(entryDiv);
}

function createButton(name, id) {
  let button = document.createElement("button");
  button.textContent = name;
  button.id = id;
  return button;
}
