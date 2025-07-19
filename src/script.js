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
  if (e.target.textContent.trim() === 'Редагувати') {
    const tr = e.target.closest('tr');
    studentId = tr.getAttribute('data-id');

    document.querySelector('#nameChange').value = tr.querySelector('.name').textContent;
    document.querySelector('#ageChange').value = tr.querySelector('.age').textContent;
    document.querySelector('#courseChange').value = tr.querySelector('.course').textContent;
    document.querySelector('#skillsChange').value = tr.querySelector('.skills').textContent;
    document.querySelector('#emailChange').value = tr.querySelector('.email').textContent;
    document.querySelector('#isEnrolledChange').checked = tr.querySelector('.isEnrolled').textContent === 'true';

    // document.querySelector('.add').style.display = 'none';
    // document.querySelector('.editButt').style.display = 'inherit';

    document.getElementById('editModal').style.display = 'block';
    document.getElementById('modal-backdrop').style.display = 'block';
  }
});


document.querySelector('.editButt').addEventListener('click', () => {
  const updatedStudent = {
        name: document.querySelector('#nameChange').value,
        age: parseInt(document.querySelector('#ageChange').value),
        course: document.querySelector('#courseChange').value,
        skills: document.querySelector('#skillsChange').value,
        email: document.querySelector('#emailChange').value,
        isEnrolled: document.querySelector('#isEnrolledChange').checked
    };

    console.log(updatedStudent)

  updateStudent(updatedStudent, studentId)
    .then(() => getStudents())
    .then((data) => {
      document.querySelector("tbody").innerHTML = renderStudents(data);
      document.getElementById('editModal').style.display = 'none';
      document.getElementById('modal-backdrop').style.display = 'none';
    })
    .catch(error => {
      console.error('Error updating student:', error);
    });
})


document.querySelector('.cancelButt').addEventListener('click', () => {
      document.getElementById('editModal').style.display = 'none';
      document.getElementById('modal-backdrop').style.display = 'none';
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

