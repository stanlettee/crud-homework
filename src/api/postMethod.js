export default async function addStudent(student) {
  try {
    return await fetch("https://687ba9e9b4bc7cfbda86b8b5.mockapi.io/students/data/students", {
        method: "POST",
        body: JSON.stringify(student),
        headers: {
        "Content-Type": "application/json; charset=UTF-8",
        }
    }).then((res) => res.json())
  } catch (error) {
    console.log(error)
}
}
