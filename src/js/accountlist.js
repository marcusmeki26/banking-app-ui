import { accountServices } from "./services/accountservices";

export async function accountList(){
  const formatNumberToPhp = new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP"
  });

  const app = document.getElementById("app");

  let classes;

  const div = document.createElement("div");
  // classes = ["flex", "justify-center", "items-center", "h-full"];
  classes = ["flex", "h-full", "pt-[.8rem]", "pl-[.8rem]"];
  div.classList.add(...classes);

  // Account lists
  const table = document.createElement("table");
  classes = ["self-start", "w-full", "text-primaryColor"];
  table.classList.add(...classes);
  
  // Header
  const thead = document.createElement("thead");
  const tr = document.createElement("tr");
  const thAccNumber = document.createElement("th");
  classes = ["text-left"];
  thAccNumber.classList.add(...classes);
  thAccNumber.textContent = "Account Number";
  tr.appendChild(thAccNumber);
  const thCardHolderName = document.createElement("th");
  classes = ["text-left"];
  thCardHolderName.classList.add(...classes);
  thCardHolderName.textContent = "Account Holder";
  tr.appendChild(thCardHolderName);
  const thBalance = document.createElement("th");
  classes = ["text-left"];
  thBalance.classList.add(...classes);
  thBalance.textContent = "Current Balance";
  tr.appendChild(thBalance);
  thead.appendChild(tr);
  table.appendChild(thead);

  // Body
  await accountServices.getAllAccounts()
    .then(response => {
      if(response.data.length > 0){
        response.data.forEach(account => {
          const tr = document.createElement("tr");
          const tdAccNumber = document.createElement("td");
          tdAccNumber.textContent = account.accountNumber;
          tr.appendChild(tdAccNumber);
          const tdCardHolderName = document.createElement("td");
          tdCardHolderName.textContent = account.accountHolderName;
          tr.appendChild(tdCardHolderName);
          const tdBalance = document.createElement("td");
          tdBalance.textContent = formatNumberToPhp.format(account.balance);
          tr.appendChild(tdBalance);
          table.appendChild(tr);
        });
      }else{
        const tr = document.createElement("tr");
        const tdMessage = document.createElement("td");
        tdMessage.textContent = "No content available";
        tr.appendChild(tdMessage);
        table.appendChild(tr);
      }
    })
    .catch((error) => {
      alert(`${error.response.data.code}\n
                ${error.response.data.message}`);
    });

  div.appendChild(table);
  app.appendChild(div);
}