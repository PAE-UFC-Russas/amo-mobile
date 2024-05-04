import Badwords from "./Badwords";

export function HasBadWords(text1, text2) {
  let hasBadWord = false;
  Badwords.forEach((badword) => {
    if (
      (text1 && text1.toLocaleLowerCase().includes(badword)) ||
      (text2 && text2.toLocaleLowerCase().includes(badword))
    ) {
      hasBadWord = true;
      return;
    }
  });

  if (hasBadWord) return true;
  return false;
}
