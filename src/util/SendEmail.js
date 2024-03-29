import { Linking } from "react-native";

export function SendEmailSignUpTeacher() {
   const destinatario = "paeufcrussas@gmail.com";
   const assunto = "Cadastrar no aplicativo";
   const corpoEmail =
      "Olá, gostaria de me cadastrar como professor!. \n insira seu [SIAPE] [NOME COMPLETO]";

   const url = `mailto:${destinatario}?subject=${assunto}&body=${corpoEmail}`;

   // Verifique se o Linking é suportado no dispositivo
   Linking.canOpenURL(url)
      .then((supported) => {
         if (!supported) {
            console.log("Não é possível enviar e-mails neste dispositivo.");
            return "Não é possível enviar e-mails neste dispositivo.";
         } else {
            // Abra o cliente de e-mail padrão
            return Linking.openURL(url);
         }
      })
      .catch((err) => {
         console.error("Erro ao abrir o cliente de e-mail:", err);
         return "Erro ao abrir o cliente de e-mail";
      });
}

export function OpenBrowser(url){
   Linking.canOpenURL(url)
      .then((supported) => {
         if (!supported) {
            return "Não é possível abrir o navegador neste dispositivo.";
         } else {
            return Linking.openURL(url);
         }
      })
      .catch((err) => {
         console.error("Erro ao abrir o cliente de e-mail:", err);
         return "Erro ao abrir o cliente de e-mail";
      });
}
