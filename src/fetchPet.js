const fetchPet = async ({ queryKey }) => {
  const id = queryKey[1];
  //querykey 1 is the id
  const apiRes = await fetch(`http://pets-v2.dev-apis.com/pets?id=${id}`);
  //need to have error handling
  if (!apiRes.ok) {
    throw new Error(`details/${id} fetch not ok`);
  }
  return apiRes.json();
  //returns a promise
};

export default fetchPet;
