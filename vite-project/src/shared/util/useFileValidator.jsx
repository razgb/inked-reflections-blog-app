import { useState } from "react";
import { validateFile } from "../../features/user-auth/validateFile";

/**
 * Hook that abstracts onChange handling and file validation. Add an options object to further tune validation parameters.
 * @param {object|null} options To be forwarded to the fileValidator function inside of it.
 * @param {number} [options.minWidth=200] The minimum width of the image.
 * @param {number} [options.minHeight=200] The minimum height of the image.
 * @param {number} [options.maxWidth=1080] The maximum width of the image.
 * @param {number} [options.maxHeight=1920] The maximum height of the image.
 * @param {number} [options.maxSizeBytes=2]
 * @returns {object} File object used for upload and it's src used for UX & UI.
 * @returns {object} Error object with boolean and message.
 */
export default function useFileValidator(options) {
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
        const validator = validateFile(file, image, options);
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
