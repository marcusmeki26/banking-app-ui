import { accountServices } from "./services/accountservices";
import { createInputText } from "./utilities";

export function deposit(){
  const formatNumberToPhp = new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP"
  });

  const app = document.getElementById("app");

  let classes; 

  const div = document.createElement("div");
  classes = ["flex", "justify-center", "items-center", "h-full"];
  div.classList.add(...classes);

  const formDeposit = document.createElement("form");
  classes = ["flex", "flex-col", "p-[.8rem]", "bg-secondaryBg", "rounded-md", "gap-[.5rem]"];
  formDeposit.classList.add(...classes);

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
  formDeposit.appendChild(divAccNumber);

  // Deposit 
  const divDeposit = document.createElement("div");
  classes = ["flex", "flex-col"];
  divDeposit.classList.add(...classes);
  const lblDeposit = document.createElement("label");
  classes = ["text-primaryColor"];
  lblDeposit.classList.add(...classes);
  lblDeposit.textContent = "Deposit Amount";
  const inputDeposit = createInputText();
  inputDeposit.id = "deposit";
  lblDeposit.for = "deposit";
  divDeposit.appendChild(lblDeposit);
  divDeposit.appendChild(inputDeposit);
  formDeposit.appendChild(divDeposit);

  const depositBtn = document.createElement("button");
  classes = ["bg-confirm", "text-primaryBg", "rounded-md", "py-[.3rem]", "cursor-pointer"];
  depositBtn.classList.add(...classes);
  depositBtn.textContent = "Deposit";
  depositBtn.type = "button";
  formDeposit.appendChild(depositBtn);

  div.appendChild(formDeposit);
  app.appendChild(div);

  depositBtn.addEventListener("click", async () => {
    const accNumber = inputAccNumber.value.trim();
    const depositAmount = inputDeposit.value.trim();

    if(accNumber == "" || depositAmount == ""){
      alert("Please fill missing fields");
      return;
    }

    const deposit = {
      accountNumber: accNumber,
      deposit: depositAmount
    }

    await accountServices.deposit(deposit)
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
          h1Title.textContent = "Deposit Information";
          divPopupCntr.appendChild(h1Title);

          // Previous balance
          const spanPrevBalance = document.createElement("span");
          spanPrevBalance.textContent = "Previous Balance: " + formatNumberToPhp.format(response.data.previousBalance);
          divPopupCntr.appendChild(spanPrevBalance);
          
          // Deposit Amount
          const spanDepositAmount = document.createElement("span");
          spanDepositAmount.textContent = "Deposit Amount: " + formatNumberToPhp.format(response.data.depositAmount);
          divPopupCntr.appendChild(spanDepositAmount);
          
          // New Balance
          const spanNewBalance = document.createElement("span");
          spanNewBalance.textContent = "New Balance: " + formatNumberToPhp.format(response.data.newBalance);
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
            inputDeposit.value = "";
          })
        }
      })
      .catch((error) => {
        alert(`${error.response.data.code}\n
                ${error.response.data.message}`);
      });
  });
}