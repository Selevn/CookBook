export const fetchData = async (url, setLoader, settings) => {
  setLoader(true);
  let localurl = url;
  if (settings) {
    localurl += '?';
    Object.keys(settings).forEach((key) => {
      localurl += `${key}=${settings[key]}&`;
    });
  }
  const response = await fetch(localurl);
  setLoader(false);
  if (response.status !== 200) throw Error(response);
  const data = await response.json();
  return data;
};

export const Login = async (url, data) => {
  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  });
  if (response.status !== 200) throw Error(response);
  return await response.json();
};

export const Register = async (url, data) => {
  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  });
  if (response.status !== 200) throw Error(response);
  const answer = await response.json();
  console.log(answer)
  return answer;
};

