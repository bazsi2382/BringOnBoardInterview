export default async function sendServerRequest(method: string, path: string) {
  let response = null;
  const options: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
    credentials: 'same-origin',
  };

  response = await fetch(path, options);

  if (!response.ok || response.status !== 200) {
    return response;
  }

  return response.json();
}
