import { accountServices } from "./services/accountservices";
import { createInputText } from "./utilities";

export function createAccount(){
  const formatNumberToPhp = new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP"
  });

  const app = document.getElementById("app");

  let classes; 

  const div = document.createElement("div");
  classes = ["flex", "justify-center", "items-center", "h-full"];
  div.classList.add(...classes);

  const formCreateAcc = document.createElement("form");
  classes = ["flex", "flex-col", "p-[.8rem]", "bg-secondaryBg", "rounded-md", "gap-[.5rem]"];
  formCreateAcc.classList.add(...classes);
  // Account number
  const divAccNumber = document.createElement("div");
  classes = ["flex", "flex-col"];
  divAccNumber.classList.add(...classes);
  const lblAccNumber = document.createElement("label");
  classes = ["text-primaryColor"];
  lblAccNumber.classList.add(...classes);
  lblAccNumber.textContent = "Account Number";
  const inputAccNumber = createInputText();
  inputAccNumber.id = "account number";
  lblAccNumber.for = "account number";
  divAccNumber.appendChild(lblAccNumber);
  divAccNumber.appendChild(inputAccNumber);
  formCreateAcc.appendChild(divAccNumber);

  // Account holder name
  const divAccHolderName = document.createElement("div");
  classes = ["flex", "flex-col"];
  divAccHolderName.classList.add(...classes);
  const lblAccHolderName = document.createElement("label");
  classes = ["text-primaryColor"];
  lblAccHolderName.classList.add(...classes);
  lblAccHolderName.textContent = "Account Holder Name";
  const inputAccHolderName = createInputText();
  inputAccHolderName.id = "account holder name";
  lblAccHolderName.for = "account holder name";
  divAccHolderName.appendChild(lblAccHolderName);
  divAccHolderName.appendChild(inputAccHolderName);
  formCreateAcc.appendChild(divAccHolderName);

  // Initial deposit
  const divDeposit = document.createElement("div");
  classes = ["flex", "flex-col"];
  divDeposit.classList.add(...classes);
  const lblDeposit = document.createElement("label");
  classes = ["text-primaryColor"];
  lblDeposit.classList.add(...classes);
  lblDeposit.textContent = "Initial Deposit";
  const inputDeposit = createInputText();
  inputDeposit.id = "deposit";
  lblDeposit.for = "deposit";
  divDeposit.appendChild(lblDeposit);
  divDeposit.appendChild(inputDeposit);
  formCreateAcc.appendChild(divDeposit);

  const saveBtn = document.createElement("button");
  classes = ["bg-confirm", "text-primaryBg", "rounded-md", "py-[.3rem]", "cursor-pointer"];
  saveBtn.classList.add(...classes);
  saveBtn.textContent = "Add account";
  saveBtn.type = "button";
  formCreateAcc.appendChild(saveBtn);

  div.appendChild(formCreateAcc);
  app.appendChild(div);

  saveBtn.addEventListener("click", async () => {
    const accNumber = inputAccNumber.value.trim();
    const accHolderName = inputAccHolderName.value.trim();
    const deposit = inputDeposit.value.trim();

    if(accNumber == "" || accHolderName == "" || deposit == ""){
      alert("Please fill missing fields");
      return;
    }

    const account = {
      accountNumber: accNumber,
      accountHolderName: accHolderName,
      deposit: deposit
    }

    await accountServices.postAccount(account)
      .then(response => {
        if(response.status == 200 || response.status == 201){
          const body = document.getElementById("body");

          const divPopup = document.createElement("div");
          classes = ["flex", "justify-center", "items-center", "absolute", "w-full", "h-full", "bg-secondaryBg/50", "text-primaryColor", "z-[3]"];
          divPopup.classList.add(...classes);

          const divPopupCntr = document.createElement("div");
          classes = ["flex", "flex-col", "gap-[.6rem]", "w-[30%]", "h-max","bg-primaryBg", "p-2", "rounded-md", "shadow-md"];
          divPopupCntr.classList.add(...classes);
          
          const h1Title = document.createElement("h1");
          classes = ["text-3xl", "font-extrabold"];
          h1Title.classList.add(...classes);
          h1Title.textContent = "Added successfully!";
          divPopupCntr.appendChild(h1Title);

          // Account Number
          const spanPrevBalance = document.createElement("span");
          spanPrevBalance.textContent = "Account Number: " + response.data.accountNumber;
          divPopupCntr.appendChild(spanPrevBalance);
          
          // Account Holder Name
          const spanWithdrawAmount = document.createElement("span");
          spanWithdrawAmount.textContent = "Account Holder Name: " + response.data.accountHolderName;
          divPopupCntr.appendChild(spanWithdrawAmount);
          
          // Balance
          const spanNewBalance = document.createElement("span");
          spanNewBalance.textContent = "Balance: " + formatNumberToPhp.format(response.data.balance);
          divPopupCntr.appendChild(spanNewBalance);
          
          const okBtn = document.createElement("button");
          classes = ["bg-confirm", "text-primaryBg", "rounded-md", "py-[.3rem]", "cursor-pointer"];
          okBtn.classList.add(...classes);
          okBtn.textContent = "OK";
          okBtn.type = "button";
          divPopupCntr.appendChild(okBtn);

          divPopup.appendChild(divPopupCntr);
          body.appendChild(divPopup);
          
          okBtn.addEventListener("click", () => {
            body.removeChild(divPopup);
            inputAccNumber.value = "";
            inputAccHolderName.value = "";
            inputDeposit.value = "";
          });
        }
      })
      .catch(error => {
        alert(`${error.response.data.code}\n
                ${error.response.data.message}`);
      });
  });
}