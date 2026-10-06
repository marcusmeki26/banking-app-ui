import { accountServices } from "./services/accountservices";
import { createInputText } from "./utilities";

export function balanceInquiry(){
  const formatNumberToPhp = new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP"
  });

  const app = document.getElementById("app");

  let classes; 

  const div = document.createElement("div");
  classes = ["flex", "justify-center", "items-center", "h-full"];
  div.classList.add(...classes);

  const formBalInquiry = document.createElement("form");
  classes = ["flex", "flex-col", "p-[.8rem]", "bg-secondaryBg", "rounded-md", "gap-[.5rem]"];
  formBalInquiry.classList.add(...classes);

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
  formBalInquiry.appendChild(divAccNumber);

  const searchBtn = document.createElement("button");
  classes = ["bg-confirm", "text-primaryBg", "rounded-md", "py-[.3rem]", "cursor-pointer"];
  searchBtn.classList.add(...classes);
  searchBtn.textContent = "Check balance";
  searchBtn.type = "button";
  formBalInquiry.appendChild(searchBtn);

  div.appendChild(formBalInquiry);
  app.appendChild(div);

  searchBtn.addEventListener("click", async () => {
    const accNumber = inputAccNumber.value.trim();

    if(accNumber == ""){
      alert("Please fill all missing fields");
      return;
    }

    await accountServices.getBalance(accNumber)
      .then(response => {
        console.log(response);
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
          h1Title.textContent = "Account Information";
          divPopupCntr.appendChild(h1Title);

          // Account number
          const spanAccNumber = document.createElement("span");
          spanAccNumber.textContent = "Account Number: " + response.data.accountNumber;
          divPopupCntr.appendChild(spanAccNumber);
          
          // Account holder
          const spanAccHolder = document.createElement("span");
          spanAccHolder.textContent = "Account Holder: " + response.data.accountHolderName;
          divPopupCntr.appendChild(spanAccHolder);
          
          // Current balance
          const spanBalance = document.createElement("span");
          spanBalance.textContent = "Current Balance: " + formatNumberToPhp.format(response.data.deposit);
          divPopupCntr.appendChild(spanBalance);
          
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
          })
        }
      })
      .catch(error => {
        alert(`${error.response.data.code}\n
                ${error.response.data.message}`);
      });
  });
}