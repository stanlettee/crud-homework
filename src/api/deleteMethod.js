export default async function deleteStudent(id){
  try {
    return await fetch(`https://687ba9e9b4bc7cfbda86b8b5.mockapi.io/students/data/students/${id}`, {
        method: "DELETE",
    });
  } catch (error) {
    console.log(error)
  }
};