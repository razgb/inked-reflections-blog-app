export function addTextValuesToUserContent(
  userContent,
  userContentValueEntries
) {
  return userContent.map((widget, index) => {
    const { component } = widget;
    if (component === "image") {
      return widget;
    } else
      return {
        ...widget,
        value: userContentValueEntries[index][1],
      };
  });
}
