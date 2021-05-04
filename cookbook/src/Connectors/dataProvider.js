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
  const data = JSON.parse(await response.json());
  return data;
};
