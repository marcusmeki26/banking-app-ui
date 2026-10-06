const navTab = document.getElementById("nav-lists");

for(const li of navTab.children){
  li.addEventListener("click", () => {
    navigate(li.textContent);
    li.classList.add("active")
  });
}

function navigate(tab){
  const app = document.getElementById("app");
  app.innerHTML = "";

  const navTab = document.getElementById("nav-lists");
  for(const li of navTab.children){
    li.classList.remove("active");
  }

  if(tab.toLowerCase() == "create account"){
    import('./js/createaccount.js')
      .then(({ createAccount }) => {
        const url = new URL(window.location.href);
        const newUrl = url.origin + "/create-account";
        window.history.pushState({}, "", newUrl);
  
        createAccount();
      })
      .catch((err) => {
        console.error("Failed to load module:", err);
      });
  }
}