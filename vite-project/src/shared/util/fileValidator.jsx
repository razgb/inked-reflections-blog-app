import { useState } from "react";
import { validateFile } from "../../features/user-auth/validateFile";

export default function useFileValidator() {
  const [fileInput, setFileInput] = useState({
    file: null,
    src: null,
  });
  const [error, setError] = useState({
    isError: false,
    message: "",
  });

  function handleFileChange(event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function (event) {
      const imageURL = event.target.result;
      const image = new Image();

      image.onload = function () {
        const validator = validateFile(file, image);
        console.log("Validator result: ", validator.valid);

        if (validator.valid === false) {
          setError({
            isError: true,
            message: validator.message,
          });
          return;
        } else {
          setError({
            isError: false,
            message: "",
          });
        }

        const cleanFile = new File([file], validator.name, {
          type: file.type,
          lastModified: file.lastModified,
        });

        setFileInput({
          src: imageURL,
          file: cleanFile,
        });
      };

      image.onerror = function () {
        setFileInput({
          file: null,
          source: null,
        });
        setError({
          isError: true,
          message:
            "There was an error in processing the image, please try again.",
        });
      };

      image.src = imageURL;
    };

    reader.readAsDataURL(file);
  }

  return { fileInput, error, handleFileChange };
}
