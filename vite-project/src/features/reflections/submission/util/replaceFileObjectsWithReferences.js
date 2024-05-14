/**
 * Replaces file objects with firebase image references in the upload content.
 * @param {Array} validUserContent - The valid user content.
 * @param {Array} imageNames - The unique names of the images.
 * @returns {Array} - The upload content with the file objects replaced with firebase image references.
 */
export function replaceFileObjectsWithReferences(validUserContent, imageNames) {
  let nameIndex = 0;

  return validUserContent.map((widget) => {
    if (widget.component !== "image") return widget;

    const { component, title, id } = widget;
    const imageName = imageNames[nameIndex];

    nameIndex++;
    return {
      component,
      title,
      id,
      firebaseStorageReference: imageName,
    };
  });
}
