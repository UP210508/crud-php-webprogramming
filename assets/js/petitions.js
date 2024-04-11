export const getAllUsers = async () => {
  const resp = await fetch( '/crud/api/getUsers.php' );
  const json = await resp.json();
  return json;
}

export const getAllTasks = async () => {
  const resp = await fetch('/crud/api/getTasks.php');
  const json = await resp.json();
  return json;
}

export const getTaskById = async ( taskID = '' ) => {
  const resp = await fetch(`/crud/api/getTask.php?id=${taskID}`);
  const json = await resp.json();
  return json;
}
