const fetchBreedList = async ({ queryKey }) => {
  const animal = queryKey[1];

  if (!animal) return [];
  //querykey 1 is the id
  const apiRes = await fetch(
    `https://pets-v2.dev-apis.com/breeds?animal=${animal}`
  );
  //need to have error handling
  if (!apiRes.ok) {
    throw new Error(`breeds/${animal} fetch not ok`);
  }
  return apiRes.json();
  //returns a promise
};

export default fetchBreedList;
