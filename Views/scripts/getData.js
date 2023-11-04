import { getCookie, clearJwt } from "./cookies.js";


const getData = async (name) => {
    const url =`http://localhost:3000/${name}`
  const resp = await fetch(url, {
    method: "GET",
    headers: { "jwt-access-token": getCookie("jwt") },
  });

  if (resp.status === 200) {
    const data = await resp.json();
    return data;
 } else {
    const data = await resp.json();
    console.log(data);
    alert(data.message);
    window.location.href = "../welcomePage.html";
 }
};

export { getData}