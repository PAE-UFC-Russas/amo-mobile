import { useState } from "react";
import { Linking } from "react-native";

export default function SendEmailRefactorPassword() {
   const [errorMessage, setErrorMessage] = useState("");
   const destinatario = "paeufcrussas@gmail.com";
   const assunto = "Redefinição de senha";
   const corpoEmail = "Olá, gostaria de redefinir minha senha.";

   const url = `mailto:${destinatario}?subject=${assunto}&body=${corpoEmail}`;

   // Verifique se o Linking é suportado no dispositivo
   Linking.canOpenURL(url)
      .then((supported) => {
         if (!supported) {
            console.log("Não é possível enviar e-mails neste dispositivo.");
            setErrorMessage("Não é possível enviar e-mails neste dispositivo");
         } else {
            // Abra o cliente de e-mail padrão
            return Linking.openURL(url);
         }
      })
      .catch((err) => console.error("Erro ao abrir o cliente de e-mail:", err));
}
