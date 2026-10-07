import { accountServices } from "./services/accountservices";
import { createInputText } from "./utilities";

export function transfer(){
  const formatNumberToPhp = new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP"
  });
  
  const app = document.getElementById("app");

  let classes;

  const div = document.createElement("div");
  classes = ["flex", "justify-center", "items-center", "h-full"];
  div.classList.add(...classes);

  const formTransfer = document.createElement("form");
  classes = ["flex", "flex-col", "p-[.8rem]", "bg-secondaryBg", "rounded-md", "gap-[.5rem]"];
  formTransfer.classList.add(...classes);

  // Source account number
  const divSourceAccNumber = document.createElement("div");
  classes = ["flex", "flex-col"];
  divSourceAccNumber.classList.add(...classes);
  const lblSourceAccNumber = document.createElement("label");
  classes = ["text-primaryColor"];
  lblSourceAccNumber.classList.add(...classes);
  lblSourceAccNumber.textContent = "Source Account Number";
  const inputSourceAccNumber = createInputText();
  inputSourceAccNumber.id = "source account number";
  lblSourceAccNumber.for = "source account number";
  divSourceAccNumber.appendChild(lblSourceAccNumber);
  divSourceAccNumber.appendChild(inputSourceAccNumber);
  formTransfer.appendChild(divSourceAccNumber);

  // Destination account number
  const divDestinationAccNumber = document.createElement("div");
  classes = ["flex", "flex-col"];
  divDestinationAccNumber.classList.add(...classes);
  const lblDestinationAccNumber = document.createElement("label");
  classes = ["text-primaryColor"];
  lblDestinationAccNumber.classList.add(...classes);
  lblDestinationAccNumber.textContent = "Destination Account Number";
  const inputDestinationAccNumber = createInputText();
  inputDestinationAccNumber.id = "destination account number";
  lblDestinationAccNumber.for = "destination account number";
  divDestinationAccNumber.appendChild(lblDestinationAccNumber);
  divDestinationAccNumber.appendChild(inputDestinationAccNumber);
  formTransfer.appendChild(divDestinationAccNumber);

  // Transfer amount
  const divTransferAmount = document.createElement("div");
  classes = ["flex", "flex-col"];
  divTransferAmount.classList.add(...classes);
  const lblTransferAmount = document.createElement("label");
  classes = ["text-primaryColor"];
  lblTransferAmount.classList.add(...classes);
  lblTransferAmount.textContent = "Transfer Amount";
  const inputTransferAmount = createInputText();
  inputTransferAmount.id = "transfer amount";
  lblTransferAmount.for = "transfer amount";
  divTransferAmount.appendChild(lblTransferAmount);
  divTransferAmount.appendChild(inputTransferAmount);
  formTransfer.appendChild(divTransferAmount);

  const transferBtn = document.createElement("button");
  classes = ["bg-confirm", "text-primaryBg", "rounded-md", "py-[.3rem]", "cursor-pointer"];
  transferBtn.classList.add(...classes);
  transferBtn.textContent = "Transfer";
  transferBtn.type = "button";
  formTransfer.appendChild(transferBtn);

  div.appendChild(formTransfer);
  app.appendChild(div);

  transferBtn.addEventListener("click", async () => {
    const sourceAccNumber = inputSourceAccNumber.value.trim();
    const destinationAccNumber = inputDestinationAccNumber.value.trim();
    const transferAmount = inputTransferAmount.value.trim();

    if(sourceAccNumber == "" || destinationAccNumber == "" || transferAmount == ""){
      alert("Please fill missing fields");
      return;
    }

    const transfer = {
      sourceAccountNumber: sourceAccNumber,
      destinationAccountNumber: destinationAccNumber,
      transferAmount: transferAmount
    }

    await accountServices.transfer(transfer)
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
          h1Title.textContent = "Transfer Information";
          divPopupCntr.appendChild(h1Title);

          // From account
          const spanFromAccount = document.createElement("span");
          spanFromAccount.textContent = "From Account: " + response.data.sourceAccountNumber;
          divPopupCntr.appendChild(spanFromAccount);
          
          // To account
          const spanToAccount = document.createElement("span");
          spanToAccount.textContent = "To Account: " + response.data.destinationAccountNumber;
          divPopupCntr.appendChild(spanToAccount);
          
          // Transfer amount
          const spanTransferAmount = document.createElement("span");
          spanTransferAmount.textContent = "Amount: " + formatNumberToPhp.format(response.data.transferAmount);
          divPopupCntr.appendChild(spanTransferAmount);
          
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
            inputSourceAccNumber.value = "";
            inputDestinationAccNumber.value = "";
            inputTransferAmount.value = "";
          })
        }
      })
      .catch((error) => {
        alert(`${error.response.data.code}\n
                ${error.response.data.message}`);
      });
  });
}