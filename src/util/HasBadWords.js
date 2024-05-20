import Badwords from "./Badwords";

export function HasBadWords(text1, text2) {
   let hasBadWord = false;
   const checkBadWord = (text) => {
      if (!text) return false;
      text = text.toLocaleLowerCase();
      return Badwords.some((badword) => {
         const regex = new RegExp(`\\b${badword}\\b`, "i");
         return regex.test(text);
      });
   };

   if (checkBadWord(text1) || checkBadWord(text2)) {
      hasBadWord = true;
   }

   return hasBadWord;
}
