export default async function getStudents () {
  try {
    return await fetch("https://687ba9e9b4bc7cfbda86b8b5.mockapi.io/students/data/students")
    .then((res) => res.json())
  } catch (error) {
    console.log(error)
  }
};