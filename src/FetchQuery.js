export const FetchQuery = async (requestedURL) => {
  try {
    const response = await fetch(requestedURL);
    if (!response.ok) throw new Error(`Something went wrong: ${response.status}`);

    const data = await response.json();
    return data;
  } catch (err) {
    throw err;
  }
};
