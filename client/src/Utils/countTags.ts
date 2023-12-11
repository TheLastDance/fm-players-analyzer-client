export const countTags = (file: File | undefined): Promise<number> | undefined => {

  if (file) {
    return new Promise((resolve) => {
      const reader = new FileReader();

      reader.onload = function (e) {
        const content = e.target?.result;
        const tempDiv = document.createElement('div');

        if (typeof content === "string") {
          tempDiv.innerHTML = content;
          const matchingTags = tempDiv.querySelectorAll("tr");
          resolve(matchingTags.length - 1);
        }
      };

      reader.readAsText(file);
    })
  }
};