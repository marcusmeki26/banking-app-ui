import { accountServices } from "./services/accountservices";
import { createInputText } from "./utilities";

export function withdraw(){
  const formatNumberToPhp = new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP"
  });

  const app = document.getElementById("app");

  let classes;

  const div = document.createElement("div");
  classes = ["flex", "justify-center", "items-center", "h-full"];
  div.classList.add(...classes);

  const formWithdraw = document.createElement("form");
  classes = ["flex", "flex-col", "p-[.8rem]", "bg-secondaryBg", "rounded-md", "gap-[.5rem]"];
  formWithdraw.classList.add(...classes);

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
  formWithdraw.appendChild(divAccNumber);

  // Withdrawal Amount
  const divWithdraw = document.createElement("div");
  classes = ["flex", "flex-col"];
  divWithdraw.classList.add(...classes);
  const lblWithdraw = document.createElement("label");
  classes = ["text-primaryColor"];
  lblWithdraw.classList.add(...classes);
  lblWithdraw.textContent = "Withdraw Amount";
  const inputWithdraw = createInputText();
  inputWithdraw.id = "deposit";
  lblWithdraw.for = "deposit";
  divWithdraw.appendChild(lblWithdraw);
  divWithdraw.appendChild(inputWithdraw);
  formWithdraw.appendChild(divWithdraw);

  const withdrawBtn = document.createElement("button");
  classes = ["bg-confirm", "text-primaryBg", "rounded-md", "py-[.3rem]", "cursor-pointer"];
  withdrawBtn.classList.add(...classes);
  withdrawBtn.textContent = "Withdraw";
  withdrawBtn.type = "button";
  formWithdraw.appendChild(withdrawBtn);

  div.appendChild(formWithdraw);
  app.appendChild(div);

  withdrawBtn.addEventListener("click", async () => {
    const accNumber = inputAccNumber.value.trim();
    const withdrawAmount = inputWithdraw.value.trim();

    if(accNumber == "" || withdrawAmount == ""){
      alert("Please fill all missing fields");
      return;
    }

    const withdraw = {
      accountNumber: accNumber,
      withdrawAmount: withdrawAmount
    }

    await accountServices.withdraw(withdraw)
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
          h1Title.textContent = "Withdraw Information";
          divPopupCntr.appendChild(h1Title);

          // Previous balance
          const spanPrevBalance = document.createElement("span");
          spanPrevBalance.textContent = "Previous Balance: " + formatNumberToPhp.format(response.data.previousBalance);
          divPopupCntr.appendChild(spanPrevBalance);
          
          // Withdraw Amount
          const spanWithdrawAmount = document.createElement("span");
          spanWithdrawAmount.textContent = "Withdraw Amount: " + formatNumberToPhp.format(response.data.withdrawAmount);
          divPopupCntr.appendChild(spanWithdrawAmount);
          
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
            inputWithdraw.value = "";
          })
        }
      })
      .catch((error) => {
        alert(`${error.response.data.code}\n
                ${error.response.data.message}`);
      });
  });
}