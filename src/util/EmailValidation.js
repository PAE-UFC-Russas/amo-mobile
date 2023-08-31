import React, { useState } from "react";
import validator from "validator";

export default function EmailValidation(email) {
   const [cor, setCor] = useState("tertiaryBlue");
   const [inputErros, setInputErros] = useState({
      errosEmail: null,
   });

   let erros = {
      errosEmail: null,
   };

   if (email.length < 10 && !validator.isEmail(email)) setCor("red");
   erros.errosEmail = "E-mail inválido!";

   setInputErros(erros);
   if (!erros.errosEmail) navigate("CheckCode", { register: false });
   return null;
}
