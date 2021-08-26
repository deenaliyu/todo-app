function changeTheme() {
  document.querySelector("body").classList.toggle("dark");
}

function checkAll() {
  let check = document.querySelectorAll(".checked");
  let label = document.querySelectorAll(".lbl");
  for (let i = 0; i < check.length; i++) {
    if (check[i].checked == true) {
      label[i].style.textDecoration = "line-through";
      label[i].style.color = "hsl(234, 11%, 52%)";
    } 
  }
}

function createNew() {
  let news = document.querySelector(".create");
  let newTodo = document.querySelector(".newTodo").value;
  let uppElement = document.querySelector(".sendHere");
  if (news.checked == true) {
    if (newTodo != "") {
      let newList =
        '<hr>\
            <div class="content3" draggable="true">\
              <div class="form-check">\
                <input class="form-check-input checked" type="checkbox" value="" id="check2" onclick="checkAll();">\
                <label class="form-check-label lbl" for="check2">' +
        newTodo +
        '</label>\
                <img src="/images/icon-cross.svg" style="float: right; cursor: pointer;" alt=""  onclick="deleted()">\
              </div>\
            </div><hr />';
      uppElement.innerHTML += newList;
    }
  }
}

function deleted() {
  let remove = document.querySelector(".content3");
  let line = document.querySelector(".line");
  remove.parentNode.removeChild(remove);
  line.parentNode.removeChild(line);
}

function clearAll() {
  let label = document.querySelectorAll(".lbl");
  let check = document.querySelectorAll(".checked");
  for (let i = 0; i < check.length; i++) {
    if (check[i].checked == true) {
      check[i].parentNode.removeChild(check[i]);
      label[i].parentNode.removeChild(label[i]);
    }
  }
}
function onlyClicked() {
    let label = document.querySelectorAll(".lbl");
    let check = document.querySelectorAll(".checked");
    for (let i = 0; i < check.length; i++) {
      if (check[i].checked == false) {
       check[i].parentNode.removeChild(check[i]);
      label[i].parentNode.removeChild(label[i]);
      }
    }
  }

let draggable = document.querySelectorAll(".content3");
let sendHere = document.querySelector(".sendHere");

draggable.forEach((draggable) => {
  draggable.addEventListener("dragstart", () => {
    draggable.classList.add("dragging");
  });

  draggable.addEventListener("dragend", () => {
    draggable.classList.remove("dragging");
  });
});

sendHere.addEventListener("dragover", (e) => {
  e.preventDefault();
  const afterElement = getDragAfterElement(sendHere, e.clientY);
  const draggables = document.querySelector(".dragging");
  if (afterElement == null) {
    sendHere.appendChild(draggables);
  } else {
    sendHere.insertBefore(draggables, afterElement);
  }
});

function getDragAfterElement(sendHere, y) {
  const draggableElements = [
    ...sendHere.querySelectorAll(".content3:not(.dragging)"),
  ];

  return draggableElements.reduce(
    (closest, child) => {
      const box = child.getBoundingClientRect();
      console.log(box);
      const offset = y - box.top - box.height / 2;
      if (offset < 0 && offset > closest.offset) {
        return { offset: offset, element: child };
      } else {
        return closest;
      }
    },
    { offset: Number.NEGATIVE_INFINITY }
  ).element;
}
