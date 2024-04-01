let ID = 0;

function createNewEntry() {
  const containerDiv = document.getElementById("container");
  const entryDiv = document.createElement("div");
  const authorDiv = document.createElement("div");
  const titleDiv = document.createElement("div");
  const buttonsDiv = document.createElement("div");
  const authorInput = document.createElement("input");
  const titleInput = document.createElement("input");

  // all ID operations have to be in this section bc later they will be updated
  const editButton = createButton("save", ID, function (id) {
    modifyEntry(this.id);
  });
  const removeButton = createButton("remove", ID, function (id) {
    removeEntry(this.id);
  });
  entryDiv.id = "div" + ID;
  authorDiv.id = "author" + ID;
  titleDiv.id = "title" + ID;
  // end of ID operations section
  ID++;

  authorDiv.append(authorInput);
  titleDiv.append(titleInput);
  buttonsDiv.append(editButton, removeButton);
  entryDiv.append(authorDiv, titleDiv, buttonsDiv);
  entryDiv.classList.add("entry");
  containerDiv.append(entryDiv);
}

function createButton(name, id, fn) {
  const button = document.createElement("button");
  button.textContent = name;
  button.id = id;
  button.onclick = fn;
  console.log(fn);
  return button;
}

function removeEntry(id) {
  document.getElementById("div" + id).remove();
}

function modifyEntry(id) {
  aId = "author" + id;
  tId = "title" + id;
  const button = document.getElementById(id);
  const author = document.getElementById(aId);
  const title = document.getElementById(tId);
  const authorChild = author.children[0];
  const titleChild = title.children[0];

  if (button.textContent === "save") {
    button.textContent = "edit";
    let authorText = document.createElement("div");
    let titleText = document.createElement("div");
    authorText.textContent = authorChild.value;
    titleText.textContent = titleChild.value;

    authorChild.remove();
    titleChild.remove();
    author.append(authorText);
    title.append(titleText);
  } else {
    button.textContent = "save";
    authorChild.remove();
    titleChild.remove();
    author.append(document.createElement("input"));
    title.append(document.createElement("input"));
  }
}
