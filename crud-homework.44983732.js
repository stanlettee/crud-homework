// // Функція для отримання всіх студентів
async function getStudents() {
    try {
        return await fetch("http://localhost:3000/students").then((res)=>res.json());
    } catch (error) {
        console.log(error);
    }
}
// // Функція для відображення студентів у таблиці
function renderStudents(students) {
    const objectChange = students.map((object)=>{
        const newObject = `
    <tr data-id="${object.id}">
        <td>${object.id}</td>
        <td class="name">${object.name}</td>
        <td class="age">${object.age}</td>
        <td class="course">${object.course}</td>
        <td class="skills">${object.skills}</td>
        <td class="email">${object.email}</td>
        <td class="isEnrolled">${object.isEnrolled}</td>
        <td>
            <button style="margin-bottom: 5px" class="edit-button">\u{420}\u{435}\u{434}\u{430}\u{433}\u{443}\u{432}\u{430}\u{442}\u{438}</button>
            <button class="delete-button">\u{412}\u{438}\u{434}\u{430}\u{43B}\u{438}\u{442}\u{438}</button>
        </td>
    </tr>
    `;
        return newObject;
    }).join("");
    return objectChange;
}
// // Функція для додавання нового студента
// function addStudent(student) {
//     const options = {
//     method: "POST",
//     body: JSON.stringify(student),
//     headers: {
//     "Content-Type": "application/json; charset=UTF-8",
//     },
// };
//    return fetch("http://localhost:3000/students", options)
//   .then((res) => res.json())
// }
async function addStudent(student) {
    try {
        return await fetch("http://localhost:3000/students", {
            method: "POST",
            body: JSON.stringify(student),
            headers: {
                "Content-Type": "application/json; charset=UTF-8"
            }
        }).then((res)=>res.json());
    } catch (error) {
        console.log(error);
    }
}
// // Функція для оновлення студента
// function updateStudent(id, studentData) {
//   return fetch(`http://localhost:3000/students/${id}`, {
//     method: 'PATCH',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(studentData)
//   }).then(res => res.json());
// }
async function updateStudent(id, studentData) {
    try {
        return await fetch(`http://localhost:3000/students${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(studentData)
        }).then((res)=>res.json());
    } catch (error) {
        console.log(error);
    }
}
// // Функція для видалення студента
// function deleteStudent(id) {
//   return fetch(`http://localhost:3000/students/${id}`, {
//     method: "DELETE",
//   });
// }
async function deleteStudent(id) {
    try {
        return await fetch(`http://localhost:3000/students/${id}`, {
            method: "DELETE"
        });
    } catch (error) {
        console.log(error);
    }
}
// 1. Реалізуйте функцію getStudents для 
// отримання списку всіх студентів (HTTP GET /students) getStudents
document.querySelector('#get-students-btn').addEventListener('click', ()=>{
    // getStudents()
    // return getStudents()
    getStudents().then((data)=>{
        console.log(data);
        document.querySelector("tbody").innerHTML = renderStudents(data);
    });
});
// 2. Реалізуйте функцію addStudent для додавання
//  нового студента (HTTP POST /students) 
document.querySelector('#add-student-form').addEventListener('submit', (e)=>{
    e.preventDefault();
    const name = e.target.elements.name.value;
    const age = e.target.elements.age.value;
    const course = e.target.elements.course.value;
    const skills = e.target.elements.skills.value;
    const email = e.target.elements.email.value;
    let isEnrolled = e.target.elements.isEnrolled.value;
    if (isEnrolled === true) isEnrolled = 'true';
    else isEnrolled = 'false';
    const studentObject = {
        name: name,
        age: age,
        course: course,
        skills: skills,
        email: email,
        isEnrolled: isEnrolled
    };
    console.log(studentObject);
    addStudent(studentObject).then(()=>{
        getStudents().then((data)=>{
            document.querySelector("tbody").innerHTML = renderStudents(data);
        });
    });
    e.target.elements.name.value = "";
    e.target.elements.age.value = "";
    e.target.elements.course.value = "";
    e.target.elements.skills.value = "";
    e.target.elements.email.value = "";
    e.target.elements.isEnrolled.value = "";
});
// 3. Реалізуйте функцію updateStudent 
//  для часткового оновлення студента (HTTP PATCH /students/{id})
let studentId = null;
document.querySelector('tbody').addEventListener('click', (e)=>{
    if (e.target.textContent === "\u0420\u0435\u0434\u0430\u0433\u0443\u0432\u0430\u0442\u0438") {
        document.querySelector('.add').style.display = 'none';
        document.querySelector('.edit').style.display = 'inline-block';
        const tr = e.target.closest('tr');
        studentId = tr.getAttribute('data-id');
        document.querySelector('#name').value = tr.querySelector('.name').textContent;
        document.querySelector('#age').value = tr.querySelector('.age').textContent;
        document.querySelector('#course').value = tr.querySelector('.course').textContent;
        document.querySelector('#skills').value = tr.querySelector('.skills').textContent;
        document.querySelector('#email').value = tr.querySelector('.email').textContent;
        document.querySelector('#isEnrolled').value = tr.querySelector('.isEnrolled').textContent;
    }
});
document.querySelector('.edit').addEventListener('click', ()=>{
    const updatedStudent = {
        name: document.querySelector('#name').value,
        age: document.querySelector('#age').value,
        course: document.querySelector('#course').value,
        skills: document.querySelector('#skills').value,
        email: document.querySelector('#email').value,
        isEnrolled: document.querySelector('#isEnrolled').value
    };
    console.log(studentId);
    updateStudent(studentId, updatedStudent).then(()=>{
        getStudents().then((data)=>{
            document.querySelector("tbody").innerHTML = renderStudents(data);
            document.querySelector('.add').style.display = 'inline-block';
            document.querySelector('.edit').style.display = 'none';
        });
    });
});
// document.querySelector('.add').addEventListener('click', () => {
// })
// 4. Реалізуйте функцію  для deleteStudent
//  видалення студента за його ідентифікатором (HTTP DELETE /students/{id})
document.querySelector('tbody').addEventListener('click', (e)=>{
    if (e.target.textContent === "\u0412\u0438\u0434\u0430\u043B\u0438\u0442\u0438") {
        const tr = e.target.closest('tr');
        const studentId = tr.getAttribute('data-id');
        deleteStudent(studentId).then(()=>{
            getStudents().then((data)=>{
                console.log(data);
                document.querySelector("tbody").innerHTML = renderStudents(data);
            });
        });
    }
}) // 7. Написати JavaScript-код для обробки
 //  подій користувача.
 // 7.1. Додати обробники подій для кнопок,
 //  щоб вони виконували відповідні HTTP-запити.
 // 7.2. При натисканні на кнопку "Отримати студентів" 
 // (GET), виконати HTTP-запит GET /students і 
 // відобразити отримані дані в таблиці.
 // 7.3. Реалізувати форму для додавання нового студента.
 //  При натисканні на кнопку "Додати студента" (POST), 
 // зібрати дані з полів вводу, сформувати об'єкт з даними  і 
 // виконати HTTP-запит POST /students, щоб додати нового студента до бази даних.
 // 7.4. Реалізувати можливість оновлення інформації про студента. 
 // Для кожного студента в таблиці додати кнопку "Оновити".
 //  При натисканні на цю кнопку, виконати HTTP-запит PUT /students/:id, де :id — 
 // ідентифікатор фільму, і відправити оновлені дані про студента на сервер.
 // 7.5. Додати можливість видалення студента. 
 // Для кожного студента в таблиці додати кнопку "Видалити". 
 // При натисканні на цю кнопку, виконати HTTP-запит DELETE /students/:id.
;

//# sourceMappingURL=crud-homework.44983732.js.map
