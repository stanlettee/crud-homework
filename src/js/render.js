export default function renderStudents(students) {
    const objectChange = students
    .map((object) => {
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
            <button style="margin-bottom: 5px" class="edit-button">Редагувати</button>
            <button class="delete-button">Видалити</button>
        </td>
    </tr>
    `;
    return newObject;
    })

    .join("");
    return objectChange;
}
