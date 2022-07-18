function getAndUpdate() {
  title = document.getElementById("title").value;
  description = document.getElementById("description").value;

  if (localStorage.getItem("itemJson") == null) {
    itemJsonArray = [];
    itemJsonArray.push([title, description]);
    localStorage.setItem("itemJson", JSON.stringify(itemJsonArray));
  } 
  else {
    itemJsonString = localStorage.getItem("itemJson");
    itemJsonArray = JSON.parse(itemJsonString);
    itemJsonArray.push([title, description]);
    localStorage.setItem("itemJson", JSON.stringify(itemJsonArray));

    console.log(localStorage.getItem("itemJson"));
  }

  update();
}

function update() {
  if (localStorage.getItem("itemJson") == null) {
    itemJsonArray = [];
    localStorage.setItem("itemJson", JSON.stringify(itemJsonArray));
  } else {
    itemJsonString = localStorage.getItem("itemJson");
    itemJsonArray = JSON.parse(itemJsonString);
  }

  tablebody = document.getElementById("tablebody");
  let str = "";

  itemJsonArray.forEach((element, index) => {
    str += `
            <tr>
                <th scope="row">${index + 1}</th>
                <td>${element[0]}</td>
                <td>${element[1]}</td>
                <td><button class="btn btn-primary btn-small" onclick="deleted(${index})">Delete</button></td>
            </tr>
        `;
  });
  tablebody.innerHTML = str;
}

add = document.getElementById("add");
add.addEventListener("click", getAndUpdate);
update();

function deleted(indexItem) {
  itemJsonString = localStorage.getItem("itemJson");
  itemJsonArray = JSON.parse(itemJsonString);
  itemJsonArray.splice(indexItem, 1);
  localStorage.setItem("itemJson", JSON.stringify(itemJsonArray));
  console.log(localStorage.getItem("itemJson"));

  update();
}

function clearList() {
  if (confirm("Do you really want to Clear the List?")) {
    localStorage.clear();
  }

  update();
}
