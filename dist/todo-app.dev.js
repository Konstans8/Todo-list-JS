"use strict";

var todoArray = [];

var createAppTitle = function createAppTitle(title) {
  var appTitle = document.createElement('h1');
  appTitle.innerHTML = title;
  return appTitle;
};

var createTodoForm = function createTodoForm() {
  var form = document.createElement('form');
  var input = document.createElement('input');
  var addButton = document.createElement('button');
  var wrapper = document.createElement('div');
  addButton.disabled = !input.value.length;
  input.addEventListener('input', function () {
    addButton.disabled = !input.value.length;
  });
  form.classList.add('input-group', 'mb-3');
  input.classList.add('form-control');
  input.placeholder = 'Введите название дела';
  addButton.classList.add('btn', 'btn-primary');
  wrapper.classList.add('input-group-append');
  addButton.textContent = 'Добавить дело';
  wrapper.append(addButton);
  form.append(input);
  form.append(wrapper);
  return {
    form: form,
    input: input,
    addButton: addButton
  };
};

var createTodoList = function createTodoList() {
  var list = document.createElement('ul');
  list.classList.add('list-group');
  return list;
};

var createTodoItem = function createTodoItem(name) {
  var todoItem = document.createElement('li');
  var btnWrapper = document.createElement('div');
  var doneBtn = document.createElement('button');
  var deleteBtn = document.createElement('button');
  var randomId = Math.random() * 15.75;
  todoItem.id = randomId.toFixed(2);
  todoItem.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-item-center');
  doneBtn.classList.add('btn', 'btn-success');
  deleteBtn.classList.add('btn', 'btn-danger');
  todoItem.textContent = name;
  doneBtn.textContent = 'Готово';
  deleteBtn.textContent = 'Удалить';
  btnWrapper.append(doneBtn, deleteBtn);
  todoItem.append(btnWrapper);
  return {
    todoItem: todoItem,
    doneBtn: doneBtn,
    deleteBtn: deleteBtn,
    btnWrapper: btnWrapper
  };
};

var changeItemDone = function changeItemDone(arr, item) {
  arr.map(function (obj) {
    if (obj.id === item.id & obj.done === false) {
      obj.done = true;
    } else if (obj.id === item.id & obj.done === true) {
      obj.done = false;
    }
  });
};

var completeTodoItem = function completeTodoItem(item, btn) {
  btn.addEventListener('click', function () {
    todoArray = JSON.parse(localStorage.getItem(key));
    item.classList.toggle('list-group-item-success');
    changeItemDone(todoArray, item);
    localStorage.setItem(key, JSON.stringify(todoArray));
  });
};

var deleteTodoItem = function deleteTodoItem(item, btn) {
  btn.addEventListener('click', function () {
    if (confirm('Вы уверены?')) {
      todoArray = JSON.parse(localStorage.getItem(key));
      var newList = todoArray.filter(function (obj) {
        return obj.id !== item.id;
      });
      localStorage.setItem(key, JSON.stringify(newList));
      item.remove();
    }
  });
};

function createTodoApp(container, title, key) {
  var appTitle = createAppTitle(title);
  var appForm = createTodoForm();
  var appList = createTodoList();
  container.append(appTitle, appForm.form, appList);

  if (localStorage.getItem(key)) {
    todoArray = JSON.parse(localStorage.getItem(key));
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = todoArray[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var obj = _step.value;
        var todoItem = createTodoItem(appForm.input.value);
        todoItem.todoItem.textContent = obj.name;
        todoItem.todoItem.id = obj.id;

        if (obj.done == true) {
          todoItem.todoItem.classList.add('list-group-item-success');
        } else {
          todoItem.todoItem.classList.remove('list-group-item-success');
        }

        completeTodoItem(todoItem.todoItem, todoItem.doneBtn);
        deleteTodoItem(todoItem.todoItem, todoItem.deleteBtn);
        appList.append(todoItem.todoItem);
        todoItem.todoItem.append(todoItem.btnWrapper);
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator["return"] != null) {
          _iterator["return"]();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
  }

  appForm.form.addEventListener('submit', function (e) {
    e.preventDefault();
    var todoItem = createTodoItem(appForm.input.value);

    if (!appForm.input.value) {
      return;
    }

    completeTodoItem(todoItem.todoItem, todoItem.doneBtn);
    deleteTodoItem(todoItem.todoItem, todoItem.deleteBtn);
    var localStorageData = localStorage.getItem(key);

    if (localStorageData == null) {
      todoArray = [];
    } else {
      todoArray = JSON.parse(localStorageData);
    }

    var createItemObj = function createItemObj(arr) {
      var itemObj = {};
      itemObj.name = appForm.input.value;
      itemObj.id = todoItem.todoItem.id;
      itemObj.done = false;
      arr.push(itemObj);
    };

    createItemObj(todoArray);
    localStorage.setItem(key, JSON.stringify(todoArray));
    appList.append(todoItem.todoItem);
    appForm.input.value = '';
    appForm.addButton.disabled = !appForm.addButton.disabled;
  });
}

;
//# sourceMappingURL=todo-app.dev.js.map
