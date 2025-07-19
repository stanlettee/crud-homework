export default async function updateStudent(studentData, id) {
  try {
    return await fetch(`https://687ba9e9b4bc7cfbda86b8b5.mockapi.io/students/data/students/${id}`, {
        method: 'PUT',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(studentData)
    }).then((res) => res.json())
  } catch (error) {
    console.log(error)
}
}
