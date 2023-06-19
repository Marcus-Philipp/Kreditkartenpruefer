const isvalidateCreditCardNumber = element => {
  element = [...element].reverse();
  
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
    } if (luhn % 10 === 0) {
      return true;
    } 
     return false;
};

function isNumberKey(evt){
  let charCode = (evt.which) ? evt.which : evt.keyCode;
  if (charCode > 31 && (charCode < 48 || charCode > 57))
      return false;
  return true;
}

const cardNumberInput = document.getElementById('cardnumber');
const logo = document.querySelector('.company-logo');

cardNumberInput.addEventListener('input', event => {
  event.target.value = event.target.value.replace(/[^\dA-Z]/g, '').replace(/(.{4})/g, '$1 ').trim();

  let result = event.target.value;
  
  if(result.length === 0) {
    logo.innerHTML = '';
    return;

  } if(result === '4') {
    logo.innerHTML = '<img src="./visa.png">';
  } else if(result > '50' && result < '56') {
    logo.innerHTML = '<img src="./mastercard.png">';
  } else if(result === '34' || result === '37') {
    logo.innerHTML = '<img src="./american.png">';
  }
});

let expiryInput = document.getElementById('validthru');

expiryInput.addEventListener('input', event => {
    let target = event.target;
    if (target.value.length === 2 && !target.value.includes('/')) {
        target.value += '/';
    } else if (target.value.length === 3 && target.value.includes('/')) {
        target.value = target.value.slice(0, -1);
    }
});