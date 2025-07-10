import { default as renderStudents } from "./js/render"
import { default as getStudents } from "./api/getMethod"
import { default as addStudent } from "./api/postMethod"
import { default as updateStudent } from "./api/editMethod"
import { default as deleteStudent } from "./api/deleteMethod"

document.querySelector('#get-students-btn').addEventListener('click', () => {
    // getStudents()
    // return getStudents()
    getStudents().then(
    (data) =>{
        console.log(data);
        document.querySelector("tbody").innerHTML = renderStudents(data);
    }
  );
})

document.querySelector('#add-student-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = e.target.elements.name.value;
    const age = e.target.elements.age.value;
    const course = e.target.elements.course.value;
    const skills = e.target.elements.skills.value;
    const email = e.target.elements.email.value;
    let isEnrolled = e.target.elements.isEnrolled.value;
    if (isEnrolled === true){
        isEnrolled = 'true'
    } else {
        isEnrolled = 'false'
    }
    const studentObject = {
      name: name,
      age: age,
      course: course,
      skills: skills,
      email: email,
      isEnrolled: isEnrolled
    };
    console.log(studentObject)
    addStudent(studentObject).then(() => {
        getStudents().then((data) => {
            document.querySelector("tbody").innerHTML = renderStudents(data);
    })})

    e.target.elements.name.value = "";
    e.target.elements.age.value = "";
    e.target.elements.course.value = "";
    e.target.elements.skills.value = "";
    e.target.elements.email.value = "";
    e.target.elements.isEnrolled.value = "";
  });



let studentId = null

document.querySelector('tbody').addEventListener('click', (e) => {
    if (e.target.textContent === 'Редагувати') {
        document.querySelector('.add').style.display = 'none'
        document.querySelector('.edit').style.display = 'inherit'

        const tr = e.target.closest('tr');
        studentId = tr.getAttribute('data-id');

        document.querySelector('#name').value = tr.querySelector('.name').textContent;;
        document.querySelector('#age').value = tr.querySelector('.age').textContent;
        document.querySelector('#course').value = tr.querySelector('.course').textContent;
        document.querySelector('#skills').value = tr.querySelector('.skills').textContent;
        document.querySelector('#email').value = tr.querySelector('.email').textContent;
        if (tr.querySelector('.isEnrolled').textContent === 'true'){
          document.querySelector('#isEnrolled').checked = true
        } else {
          document.querySelector('#isEnrolled').checked = false
        }
}})

document.querySelector('.edit').addEventListener('click', () => {
  const updatedStudent = {
    id: studentId,
    name: document.querySelector('#name').value,
    age: document.querySelector('#age').value,
    course: document.querySelector('#course').value,
    skills: document.querySelector('#skills').value,
    email: document.querySelector('#email').value,
    isEnrolled: document.querySelector('#isEnrolled').checked
  };
  console.log(studentId)

  updateStudent(updatedStudent, studentId).then(() => {
    getStudents().then((data) => {
      document.querySelector("tbody").innerHTML = renderStudents(data);
      document.querySelector('.add').style.display = 'inherit';
      document.querySelector('.edit').style.display = 'none';
    });
  });
});



document.querySelector('tbody').addEventListener('click', (e) => {
    if (e.target.textContent === 'Видалити'){
        const tr = e.target.closest('tr');
        const studentId = tr.getAttribute('data-id'); 
        deleteStudent(studentId).then(() => {
            getStudents().then((data) => {
                console.log(data);
                document.querySelector("tbody").innerHTML = renderStudents(data);
            })})
    }}
)

