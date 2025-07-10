export default async function deleteStudent(id){
  try {
    return await fetch(`http://localhost:3000/students/${id}`, {
        method: "DELETE",
    });
  } catch (error) {
    console.log(error)
  }
};