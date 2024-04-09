let basicDatas = [
    { id: 1, title: "Todo 1", done: false },
    { id: 2, title: "Todo 2", done: true },
];

const form = document.getElementById('todo-form');  // form
const todoInput = document.getElementById('todo-input');    // input
const todoList = document.getElementById('todo-item-list'); // ul

// 초기 리스트 불러오기
function displayTodos() {
    todoList.innerHTML = '';

    basicDatas.forEach(todo => {
        const todoItem = document.createElement('li');  // li
        todoItem.classList.add('todo-item');    // todo-item이라는 class 추가
        todoItem.dataset.id = todo.id;  // data-id를 리스트의 id로 설정

        // todo 내용
        const todoText = document.createElement('span');
        todoText.classList.add('todo-text');
        todoText.textContent = todo.title;

        // 삭제 버튼
        const removeButton = document.createElement('span');
        removeButton.classList.add('remove');
        removeButton.textContent = 'x';

        todoItem.appendChild(todoText);
        todoItem.appendChild(removeButton);
        todoList.appendChild(todoItem);

        // x 클릭 시 todo 삭제
        removeButton.addEventListener('click', () => deleteTodo(todo.id));

        // title 클릭 시 t/f 변경
        todoItem.addEventListener('click', () => changeDone(todo.id));

        // done이 false인 경우 checked 클래스 추가
        if (!todo.done) {
            todoItem.classList.add('checked');
        }
    });
}

// 화면이 불러졌을 때 리스트 출력
window.onload = function() {
    displayTodos();
}

// 할 일 추가
function createTodo(title) {
    const newTodo = {
        id: basicDatas.length + 1,
        title: title,
        done: true
    };

    // 배열에 넣고 화면에 다시 불러오기
    basicDatas.push(newTodo);
    displayTodos();
}

form.addEventListener('submit', e => {
    e.preventDefault(); // form의 새로고침을 막음
    const newTodoTitle = todoInput.value;
    if (newTodoTitle !== '') {  // 공백이 아닐 때만 할 일 추가
        createTodo(newTodoTitle);
        todoInput.value = '';   // 입력 칸 초기화
    }
    else
        alert('내용을 입력해주세요.');
})

// 할 일 삭제
function deleteTodo(id) {
    basicDatas = basicDatas.filter(todo => todo.id !== id); // id와 일치하지 않는 요소만 배열로 구성
    displayTodos();
}

// 할 일 클릭 시 t/f 값 변경
function changeDone(id) {
    basicDatas.forEach(todo => {
        if (todo.id === id) {
            todo.done = !todo.done; // t->f, f->t로 변경
            const todoItem = document.querySelector(`[data-id="${id}"]`); // 해당 할 일의 요소 가져오기
            todoItem.classList.toggle('checked'); // checked 클래스가 존재하면 제거, 존재하지 않으면 추가
        }
    });
}