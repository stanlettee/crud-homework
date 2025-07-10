export default async function getStudents () {
  try {
    return await fetch("http://localhost:3000/students")
    .then((res) => res.json())
  } catch (error) {
    console.log(error)
  }
};