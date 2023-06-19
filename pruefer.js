// Deklarieren von DOM-Elementen.
const cardNumberInput = document.getElementById('cardnumber');
const logo = document.querySelector('.company-logo');
const expiryInput = document.getElementById('validthru');
const checkButton = document.querySelector('.check');
const resultAnimation = document.querySelector('.result-box');
const resultCrypt = document.querySelector('.result');

// Funktion zum ueberpruefen ob die Kartennummer gueltig ist.
const isvalidateCreditCardNumber = num => {
  let arr = num.split('').reverse();
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
      let digit = parseInt(arr[i]);
      if (i % 2 !== 0) {
          digit *= 2;
          if (digit > 9) {
              digit -= 9;
          }
      }
      sum += digit;
  }
  return sum % 10 === 0;
};

// Ereignishandler Leerzeichen und Logo auswahl.
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

// Ereignishandler fuer Schraegstrich.
expiryInput.addEventListener('input', event => {
    let target = event.target;
    if (target.value.length === 2 && !target.value.includes('/')) {
        target.value += '/';
    } else if (target.value.length === 3 && target.value.includes('/')) {
        target.value = target.value.slice(0, -1);
    }
});

const validateAnimation = (event, style) => {
    resultAnimation.classList.toggle('show'); 
    resultCrypt.textContent = event;
    resultCrypt.classList.remove('green', 'red');
    resultCrypt.classList.add(style);
};

checkButton.addEventListener('click', () => {
  if(cardNumberInput.value.length === 19) {
      let cardNumber = cardNumberInput.value.replace(/\s/g, '');
      let checker = isvalidateCreditCardNumber(cardNumber);
      if(checker) {
          validateAnimation('KORREKT', 'green');
      } else {
          validateAnimation('INKORREKT', 'red');
      }
  } else {
      alert('Bitte geben Sie eine gültige Kreditkartennummer ein');
  }
});


