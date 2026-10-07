import { accountList } from "./js/accountlist.js";

const navTab = document.getElementById("nav-lists");

const url = new URL(window.location.href);
const newUrl = url.origin;
window.history.pushState({}, "", newUrl);

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
    import("./js/createaccount.js")
      .then(({ createAccount }) => {
        const url = new URL(window.location.href);
        const newUrl = url.origin + "/create-account";
        window.history.pushState({}, "", newUrl);
  
        createAccount();
      })
      .catch((err) => {
        console.error("Failed to load module:", err);
      });
  }else if(tab.toLowerCase() == "balance inquiry"){
    import("./js/balanceinquiry.js")
      .then(({ balanceInquiry }) => {
        const url = new URL(window.location.href);
        const newUrl = url.origin + "/balance-inquiry";
        window.history.pushState({}, "", newUrl);

        balanceInquiry();
      })
      .catch((err) => {
        console.error("Failed to load module:", err);
      });
  }else if(tab.toLowerCase() == "list accounts"){
    import("./js/accountlist.js")
      .then(({ accountList }) => {
        const url = new URL(window.location.href);
        const newUrl = url.origin + "/list-account";
        window.history.pushState({}, "", newUrl);

        accountList();
      })
      .catch((err) => {
        console.error("Failed to load module: ", err);
      });
  }else if(tab.toLowerCase() == "deposit"){
    import("./js/deposit.js")
      .then(({ deposit }) => {
        const url = new URL(window.location.href);
          const newUrl = url.origin + "/deposit";
          window.history.pushState({}, "", newUrl);

          deposit();
      })
      .catch((err) => {
        console.error("Failed to load module: ", err);
      });
  }else if(tab.toLowerCase() == "withdraw"){
    import("./js/withdraw.js")
    .then(({ withdraw }) => {
        const url = new URL(window.location.href);
        const newUrl = url.origin + "/withdraw";
        window.history.pushState({}, "", newUrl);

        withdraw();
    })
    .catch((err) => {
      console.error("Failed to load module: ", err);
    });
  }else if(tab.toLowerCase() == "transfer"){
    import("./js/transfer.js")
      .then(({ transfer }) => {
        const url = new URL(window.location.href);
        const newUrl = url.origin + "/transfer";
        window.history.pushState({}, "", newUrl);

        transfer();
      })
      .catch((err) => {
        console.error("Failed to load module: ", err);
      });
  }
}