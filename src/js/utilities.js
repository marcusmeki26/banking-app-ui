function createInputText(){
  const input = document.createElement("input");
  let classes = ["px-[.3rem]", "border-primaryColor", "rounded-md", "border-[.2rem]", "outline-[0]"];
  input.classList.add(...classes);
  input.type = "text";

  input.addEventListener("keydown", function(e){
    if(e.key === "Enter")
      e.preventDefault();
  });

  return input;
}

export { createInputText };