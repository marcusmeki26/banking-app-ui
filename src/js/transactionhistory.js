import { transactionService } from "./services/transactionservices";
import { createInputText } from "./utilities";

export function transactionHistory(){
  const app = document.getElementById("app");

  let classes;

  const div = document.createElement("div");
  div.id = "transaction-history-parent";
  classes = ["flex", "flex-col", "p-[.3rem]", "h-full"];
  div.classList.add(...classes);

  const formTransactions = document.createElement("form");
  classes = ["self-start", "flex", "gap-[.5rem]", "items-center", "w-[30%]"];
  formTransactions.classList.add(...classes);

  const divAccountNumber = document.createElement("div");
  classes = ["flex", "flex-col"];
  divAccountNumber.classList.add(...classes);
  const lblAccountNumber = document.createElement("label");
  classes = ["text-primaryColor"];
  lblAccountNumber.classList.add(...classes);
  lblAccountNumber.textContent = "Account Number";
  const inputAccountNumber = createInputText();
  inputAccountNumber.id = "account number";
  lblAccountNumber.for = "account number";
  divAccountNumber.appendChild(lblAccountNumber);
  divAccountNumber.appendChild(inputAccountNumber);
  formTransactions.appendChild(divAccountNumber);

  const searchBtn = document.createElement("button");
  classes = ["bg-confirm", "text-primaryBg", "rounded-md", "py-[.3rem]", "cursor-pointer", "w-[30%]"];
  searchBtn.classList.add(...classes);
  searchBtn.textContent = "Search";
  searchBtn.type = "button";
  formTransactions.appendChild(searchBtn);

  div.appendChild(formTransactions);
  app.appendChild(div);

  searchBtn.addEventListener("click", async () => {
    const accountNumber = inputAccountNumber.value.trim();

    if(accountNumber == ""){
      alert("Please fill missing fields");
      return;
    }

    const url = new URL(window.location.href);
    url.searchParams.set("accountNumber", accountNumber);
    window.history.pushState({}, "", url);

    await transactionService.getTransactionsByAccountNumber(accountNumber)
      .then(response => {
        if(response.status == 200 || response.status == 201){
          if(div.children.length == 2){
            const tableRef = div.children[1];
            div.removeChild(tableRef);
          }

          const table = document.createElement("table");
          classes = ["self-start", "w-full", "text-primaryColor"];
          table.classList.add(...classes);

          // Header
          const thead = document.createElement("thead");
          const tr = document.createElement("tr");
          const thTransactionRef = document.createElement("th");
          classes = ["text-left"];
          thTransactionRef.classList.add(...classes);
          thTransactionRef.textContent = "Transaction Reference";
          tr.appendChild(thTransactionRef);
          const thTransactionType = document.createElement("th");
          classes = ["text-left"];
          thTransactionType.classList.add(...classes);
          thTransactionType.textContent = "Transaction Type";
          tr.appendChild(thTransactionType);
          const thAmount = document.createElement("th");
          classes = ["text-left"];
          thAmount.classList.add(...classes);
          thAmount.textContent = "Amount";
          tr.appendChild(thAmount);
          const thTransactionDate = document.createElement("th");
          classes = ["text-left"];
          thTransactionDate.classList.add(...classes);
          thTransactionDate.textContent = "Transaction Date";
          tr.appendChild(thTransactionDate);
          const thReferenceAccount = document.createElement("th");
          classes = ["text-left"];
          thReferenceAccount.classList.add(...classes);
          thReferenceAccount.textContent = "Reference Account";
          tr.appendChild(thReferenceAccount);
          const thBalance = document.createElement("th");
          classes = ["text-left"];
          thBalance.classList.add(...classes);
          thBalance.textContent = "Balance";
          tr.appendChild(thBalance);
          thead.appendChild(tr);
          table.appendChild(thead);

          console.log(response);

          if(response.data.length > 0){
            response.data.forEach(transaction => {
              const tr = document.createElement("tr");
              const tdTransactionReference = document.createElement("td");
              tdTransactionReference.textContent = transaction.transactionReference;
              tr.appendChild(tdTransactionReference);
              const tdTransactionType = document.createElement("td");
              tdTransactionType.textContent = transaction.transactionType;
              tr.appendChild(tdTransactionType);
              const tdAmount = document.createElement("td");
              tdAmount.textContent = transaction.amount;
              tr.appendChild(tdAmount);
              const tdTransactionDate = document.createElement("td");
              tdTransactionDate.textContent = transaction.transactionDate;
              tr.appendChild(tdTransactionDate);
              const tdReferenceAccount = document.createElement("td");
              tdReferenceAccount.textContent = transaction.referenceAccount;
              tr.appendChild(tdReferenceAccount);
              const tdBalance = document.createElement("td");
              tdBalance.textContent = transaction.balance;
              tr.appendChild(tdBalance);
              table.appendChild(tr);
            });

            div.appendChild(table);
            app.appendChild(div);
          }else{
            const tr = document.createElement("tr");
            const tdMessage = document.createElement("td");
            tdMessage.textContent = "No content available";
            tr.appendChild(tdMessage);
            table.appendChild(tr);

            div.appendChild(table);
            app.appendChild(div);
          }
        }
      })
      .catch(error => {
        alert(`${error.response.data.code}\n
                ${error.response.data.message}`);
      });
  });
}