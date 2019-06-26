/*
 ДЗ 7 - Создать редактор cookie с возможностью фильтрации

 7.1: На странице должна быть таблица со списком имеющихся cookie. Таблица должна иметь следующие столбцы:
   - имя
   - значение
   - удалить (при нажатии на кнопку, выбранная cookie удаляется из браузера и таблицы)

 7.2: На странице должна быть форма для добавления новой cookie. Форма должна содержать следующие поля:
   - имя
   - значение
   - добавить (при нажатии на кнопку, в браузер и таблицу добавляется новая cookie с указанным именем и значением)

 Если добавляется cookie с именем уже существующей cookie, то ее значение в браузере и таблице должно быть обновлено

 7.3: На странице должно быть текстовое поле для фильтрации cookie
 В таблице должны быть только те cookie, в имени или значении которых, хотя бы частично, есть введенное значение
 Если в поле фильтра пусто, то должны выводиться все доступные cookie
 Если добавляемая cookie не соответсвует фильтру, то она должна быть добавлена только в браузер, но не в таблицу
 Если добавляется cookie, с именем уже существующей cookie и ее новое значение не соответствует фильтру,
 то ее значение должно быть обновлено в браузере, а из таблицы cookie должна быть удалена

 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то добавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#homework-container');
// текстовое поле для фильтрации cookie
const filterNameInput = homeworkContainer.querySelector('#filter-name-input');
// текстовое поле с именем cookie
const addNameInput = homeworkContainer.querySelector('#add-name-input');
// текстовое поле со значением cookie
const addValueInput = homeworkContainer.querySelector('#add-value-input');
// кнопка "добавить cookie"
const addButton = homeworkContainer.querySelector('#add-button');
// таблица со списком cookie
const listTable = homeworkContainer.querySelector('#list-table tbody');

filterNameInput.addEventListener('keyup', function() {
    // здесь можно обработать нажатия на клавиши внутри текстового поля для фильтрации cookie
    const filterValue = filterNameInput.value.toUpperCase();

    for (let cookie of listTable.children) {
        const cookieValue = cookie.innerText.toUpperCase();

        if (cookieValue.includes(filterValue) === false) {
            cookie.style.display = 'none';
        } else {
            cookie.style.display = 'table-row';
        }
    }
});

addButton.addEventListener('click', () => {
    // здесь можно обработать нажатие на кнопку "добавить cookie"
    document.cookie = `${addNameInput.value}=${addValueInput.value}`;

    const tr = document.createElement('tr');
    const removeButton = document.createElement('button');
    const removeButtonId = 'remove' + Math.random();

    removeButton.append('удалить');
    removeButton.setAttribute('id', removeButtonId);

    tr.innerHTML = `<td class="cookie-name">${addNameInput.value}</td>
        <td class="cookie-value">${addValueInput.value}</td>
        <td class="cookie-button">${removeButton.outerHTML}</td>`;

    listTable.appendChild(tr);
    
    const removeTrButton = document.getElementById(removeButtonId);

    removeTrButton.addEventListener('click', () => {
        removeTrButton.closest('tr').remove();

    });

    addNameInput.value = '';
    addValueInput.value = '';
});

window.onload = function() {
    const cookieJson = document.cookie.split('; ').reduce((prev, current) => {
        const [name, value] = current.split('=');
        
        prev[name] = value;

        return prev;
    }, {});

    for (let cookie in cookieJson) {
        if (!cookie) return;

        const tr = document.createElement('tr');
        const removeButton = document.createElement('button');
        const removeButtonId = 'remove' + Math.random();

        removeButton.append('удалить');
        removeButton.setAttribute('id', removeButtonId);

        tr.innerHTML = `<td class="cookie-name">${cookie}</td>
            <td class="cookie-value">${cookieJson[cookie]}</td>
            <td class="cookie-button">${removeButton.outerHTML}</td>`;

        listTable.appendChild(tr);
    
        const removeTrButton = document.getElementById(removeButtonId);

        removeTrButton.addEventListener('click', () => {
            const cookieName = removeTrButton.closest('tr').querySelector('.cookie-name').innerText;
            const date = new Date('1970-01-01');
            
            document.cookie = `${cookieName}= ; expires = ${date}`;
            removeTrButton.closest('tr').remove();

        });
    }
};
