function createInputText(){
  const input = document.createElement("input");
  let classes = ["px-[.3rem]", "border-primaryColor", "rounded-md", "border-[.2rem]", "outline-[0]"];
  input.classList.add(...classes);
  input.type = "text";
  return input;
}

export { createInputText };