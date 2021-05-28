export const PutData = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};
export const GetData = (key) => {
  return JSON.parse(localStorage.getItem(key));
};
export const Remove = (key) => {
  return localStorage.removeItem(key);
};
