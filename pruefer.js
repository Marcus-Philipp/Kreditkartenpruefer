// Deklarieren von DOM-Elementen.
const cardNumberInput = document.getElementById('cardnumber');
const logo = document.querySelector('.company-logo');
const expiryInput = document.getElementById('validthru');
const checkButton = document.querySelector('.check');
const resultAnimation = document.querySelector('.result-box');
const resultCrypt = document.querySelector('.result');
const resetButton = document.querySelector('.reset-button');
const holderInput = document.getElementById('cardholder');
const cvvInput = document.getElementById('card-cvv');

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

  if(result.startsWith('4')) {
    logo.innerHTML = '<img src="./visa.png">';
  } else if(result > '50' && result < '56') {
    logo.innerHTML = '<img src="./mastercard.png">';
  } else if(result.startsWith('34') || result.startsWith('37')) {
    logo.innerHTML = '<img src="./american.png">';
  } else {
    logo.innerHTML = '';
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

// Funktion fuer Ergebnis der Kartennummer.
const validateAnimation = (event, style) => {
  resultAnimation.classList.toggle('show'); 
  resultCrypt.textContent = event;
  resultCrypt.classList.remove('green', 'red');
  resultCrypt.classList.add(style);
};

// Funktion Pruefung der Kreditkartennummer.
const creditNumberCheck = () => {
  if(cardNumberInput.value.length === 19) {
    let cardNumber = cardNumberInput.value.replace(/\s/g, '');
    let checker = isvalidateCreditCardNumber(cardNumber);
    if(checker) {
        validateAnimation('KORREKT', 'green');
    } else {
        validateAnimation('INKORREKT', 'red');
    }
} else {
    alert('Bitte geben Sie eine gueltige Kreditkartennummer ein');
    }
  return false;
};

// Funktion Pruefung des Karteninhabers.
const cardHolderCheck = () => {
   if(holderInput.value.length >= 6 && /^[A-Za-z\s]+$/.test(holderInput.value)) {
    return true;
   } else {
    alert('Bitte geben Sie einen vollstaendigen Namen ein');
    return false;
   }
};

// Funktion Pruefung des Ablaufdatum.
const validThruCheck = () => {

  const expiryPattern = /^(0[1-9]|1[0-2])\/\d{2}$/;

  if(expiryPattern.test(expiryInput.value)) {
    return true;
   } else {
    alert('Bitte geben Sie ein vollstaendiges Ablaufdatum ein');
    return false;
   }
};

// Funktion Pruefung der CVV.
const cvvCheck = () => {
  if(cvvInput.value.length === 3 && !isNaN(cvvInput.value)) {
    return true;
   } else {
    alert('Bitte geben Sie eine vollstaendige CVV ein');
    return false;
   }
}; 

// Ereignishandler fuer Ergebnis.
checkButton.addEventListener('click', () => {
  if(cardHolderCheck() && validThruCheck() && cvvCheck()) {
    creditNumberCheck();
  }
});

// Funktion um Ergebnis zu resetten.
const resetComplete = () => {
  resultAnimation.classList.toggle('show');
  resultCrypt.textContent = '';
  cardNumberInput.value = '';
  expiryInput.value = '';
  holderInput.value = '';
  cvvInput.value = '';
  logo.innerHTML = '';
};

// Ereignishandler um Ergebnis zu resetten und zurueck auf Startseite.  
resetButton.addEventListener('click', resetComplete);
