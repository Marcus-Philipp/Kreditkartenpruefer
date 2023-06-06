const validateCred = element => {
    element = element.reverse();
    let x = 0;
    let luhn = 0;
    for (let i = 1; i < element.length; i += 2) {
       x = element[i] * 2;
      if (x > 9) {
         luhn += x - 9;
      } else {
         luhn += x;
      }
    }
   for (let i = 0; i < element.length; i += 2) {
       luhn += element[i];
   }
   if (luhn % 10 === 0) {
     return true;
   } else {
     return false;
   }
  };