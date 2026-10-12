import { accountServices } from "./services/accountservices";
import { createInputText } from "./utilities";

export function updateAccount(){
  const app = document.getElementById("app");

  let classes;

  const div = document.createElement("div");
  classes = ["flex", "justify-center", "items-center", "h-full"];
  div.classList.add(...classes);

  const formUpdateAccount = document.createElement("form");
  classes = ["flex", "flex-col", "p-[.8rem]", "bg-secondaryBg", "rounded-md", "gap-[.5rem]"];
  formUpdateAccount.classList.add(...classes);
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
  formUpdateAccount.appendChild(divAccNumber);

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
  formUpdateAccount.appendChild(divAccHolderName);

  const updateBtn = document.createElement("button");
  classes = ["bg-confirm", "text-primaryBg", "rounded-md", "py-[.3rem]", "cursor-pointer"];
  updateBtn.classList.add(...classes);
  updateBtn.textContent = "Update account";
  updateBtn.type = "button";
  formUpdateAccount.appendChild(updateBtn);

  div.appendChild(formUpdateAccount);
  app.appendChild(div);

  updateBtn.addEventListener("click", async () => {
    const accountNumber = inputAccNumber.value.trim();
    const accountHolderName = inputAccHolderName.value.trim();

    if(accountNumber == "" || accountHolderName == ""){
      alert("Please fill missing fields");
      return;
    }

    const url = new URL(window.location.href);
    url.searchParams.set("accountNumber", accountNumber);
    window.history.pushState({}, "", url);

    const patchRequest = {
      accountName: accountHolderName
    }

    await accountServices.patchAccount(patchRequest, accountNumber)
      .then(response => {
        if(response.status == 200){
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
          h1Title.textContent = "Updated successfully!";
          divPopupCntr.appendChild(h1Title);

          // Account Number
          const spanAccountNumber = document.createElement("span");
          spanAccountNumber.textContent = "Account Number: " + response.data.accountNumber;
          divPopupCntr.appendChild(spanAccountNumber);
          
          // Account Holder Name
          const spanAccountHolderName = document.createElement("span");
          spanAccountHolderName.textContent = "Account Holder Name: " + response.data.accountHolderName;
          divPopupCntr.appendChild(spanAccountHolderName);
          
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

            const url = new URL(window.location.href);
            url.searchParams.delete("accountNumber");
            window.history.pushState({}, "", url);
          });
        }
      })
      .catch(error => {
         alert(`${error.response.data.code}\n
                ${error.response.data.message}`);
      })
  });
}