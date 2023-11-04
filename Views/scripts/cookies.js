// cookies.js


// Retrieve the value of a cookie by name
const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
};

const clearJwt = () => {
  document.cookie = `jwt=""; path=/; expires=0`;
};

const updateActions = async (resp) => {
  if (resp.status == 200) {
    alert(`action done successfully`);
    document.cookie = `leftActionsToday=${
      getCookie("leftActionsToday") - 1
    }; path=/; expires=0`;
  } else {
    console.log(resp);
    const data = await resp.json();
    console.log(data);
    if (data.redirect != undefined) {
      clearJwt();
      alert(data.message);
      window.location.href =data.redirect;
    } else {
      alert("something went wrong with token, please try again");
    }
  }
};
// Export the getCookie function
export { getCookie, clearJwt, updateActions };
