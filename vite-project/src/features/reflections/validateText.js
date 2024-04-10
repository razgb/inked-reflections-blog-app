export default function validateText(paragraph) {
  const regex = /^[a-zA-Z0-9$#!]+$/;
  const noWhiteSpaceParagraph = paragraph.split(" ").join("");
  return regex.test(noWhiteSpaceParagraph);
}
