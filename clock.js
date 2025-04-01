function updateClock() {
  const now = new Date();
  
  let hours = now.getHours();
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  
  let meridian = "AM";
  if (hours >= 12) {
    meridian = "PM";
  }
  if (hours > 12) {
    hours = hours - 12;
  }
  
  const clockDisplay = document.getElementById('clock');
  const clockTime = `${hours}:${minutes}:${seconds} ${meridian}`;
  clockDisplay.textContent = clockTime;
}

//chatGPT andis ka selle osa, et kell töötaks
function startClock() {
  var partytime = -1;
  
  updateClock();
  
  var oneSecond = 1000;
  setInterval(updateClock, oneSecond);

  dateDisplay();
  
  showGreeting();
  
  var partyButton = document.getElementById("partyTimeButton");
  
  //"Lisa "partyButton" kuulaja, et seda vajutades hakkaks langema confetti ning et ka nupp muudaks värvi"
  var partyEvent = function() {
    if (partytime < 0) {
      partytime = new Date().getHours();
      partyButton.innerText = "Party Time!";
      partyButton.style.backgroundColor = "#222";
    } else {
      partytime = -1;
      partyButton.innerText = "Party Over!";
      partyButton.style.backgroundColor = "#0A8DAB";
      createConfetti(150);
    }
  };
  
  partyButton.addEventListener("click", partyEvent);
  partyEvent();
  
  setupTimeSelectors();
}

//"Kuidas saaksin luua funktsiooni, mis võimaldab kasutajal valida ärkamise, 
// lõuna- ja uinaku aja ning kuvada ekraanil erinevaid visuaalseid efekte (nt päike tõuseb, 
// toiduga seotud ikoonid, magamise sümbolid) vastavalt valitud ajale? Lisaks peaks valikud salvestuma sessionStorage-i."
function setupTimeSelectors() {
  const saveWakeUpButton = document.getElementById("saveWakeUpTime");
  const saveLunchButton = document.getElementById("saveLunchTime");
  const saveNapButton = document.getElementById("saveNapTime");

  const sunriseContainer = document.getElementById("sunriseContainer");
  const lunchContainer = document.getElementById("lunchContainer");
  const napContainer = document.getElementById("napContainer");

 
  saveWakeUpButton.addEventListener("click", function() {
    const wakeUpTimeSelector = document.getElementById("wakeUpTimeSelector");
    const wakeuptime = wakeUpTimeSelector.value;
    sessionStorage.setItem("wakeuptime", wakeuptime);

    sunriseContainer.innerHTML = '';
    const sun = document.createElement("div");
    sun.classList.add("sun");
    sunriseContainer.appendChild(sun);
    
    setTimeout(function() {
      sunriseContainer.innerHTML = '';
    }, 5000);
  });

  saveLunchButton.addEventListener("click", function() {
    const lunchTimeSelector = document.getElementById("lunchTimeSelector");
    const lunchtime = lunchTimeSelector.value;
    sessionStorage.setItem("lunchtime", lunchtime);

    lunchContainer.innerHTML = '';
    
    const foodItems = ['🍴', '🥄', '🍽️', '🥢', '🍕', '🍔', '☕', '🍱', '🍲', '🥗', '🍜', '🍝', '🍚', '🥪'];
    
    for (let i = 0; i < 15; i++) {
      const foodItem = document.createElement('div');
      foodItem.classList.add('food-item');
      
      foodItem.style.position = 'absolute';
      foodItem.style.zIndex = '100';
      foodItem.innerText = foodItems[Math.floor(Math.random() * foodItems.length)];
      
      foodItem.style.left = `${Math.random() * 90 + 5}%`;
      foodItem.style.top = `${Math.random() * 60 + 20}%`;
      
      const size = Math.random() * 30 + 20;
      foodItem.style.fontSize = `${size}px`;
      
      foodItem.style.animationDelay = `${Math.random() * 0.5}s`;
      
      lunchContainer.appendChild(foodItem);
    }

    setTimeout(function() {
      lunchContainer.innerHTML = '';
    }, 5000);
  });

  saveNapButton.addEventListener("click", function() {
    const napTimeSelector = document.getElementById("napTimeSelector");
    const naptime = napTimeSelector.value;
    sessionStorage.setItem("napTime", naptime);

    napContainer.innerHTML = '';
    
    const sleepElements = ['Z', '💤', '😴', '🛌', '🌙'];
    
    for (let i = 0; i < 15; i++) {
      const sleepZ = document.createElement('div');
      sleepZ.classList.add('sleep-z');
      
      sleepZ.innerText = sleepElements[Math.floor(Math.random() * sleepElements.length)];
    
      sleepZ.style.left = `${Math.random() * 90 + 5}%`;
      sleepZ.style.bottom = `${Math.random() * 60 + 20}%`;
      
      const size = Math.random() * 30 + 20;
      sleepZ.style.fontSize = `${size}px`;
      
      sleepZ.style.animationDelay = `${Math.random() * 0.5}s`;
      
      napContainer.appendChild(sleepZ);
    }
    
    setTimeout(function() {
      napContainer.innerHTML = '';
    }, 5000);
  });
}

//confetti loomise osa
function createConfetti(amount) {
  const confettiContainer = document.getElementById("confettiContainer");
  const confettiColors = [
    '#f44336', '#e91e63', '#9c27b0', '#673ab7', 
    '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4', 
    '#009688', '#4caf50', '#8bc34a', '#cddc39', 
    '#ffeb3b', '#ffc107', '#ff9800', '#ff5722'
  ];
  const confettiShapes = ['square', 'circle'];

  for(let i = 0; i < amount; i++) {
    setTimeout(() => {
      const confetti = document.createElement('div');
      confetti.classList.add('confetti');

      const randomColor = confettiColors[Math.floor(Math.random() * confettiColors.length)];
      confetti.style.backgroundColor = randomColor;

      const size = Math.random() * 10 + 5;
      confetti.style.width = `${size}px`;
      confetti.style.height = `${size}px`;

      const startPosition = Math.random() * window.innerWidth;
      confetti.style.left = `${startPosition}px`;

      const duration = Math.random() * 3 + 3;
      confetti.style.animationDuration = `${duration}s`;

      const translateX = Math.random() * 250 - 125;
      confetti.style.animationName = 'fall';
      confetti.style.transform = `translateX(${translateX}px)`;

      const shape = confettiShapes[Math.floor(Math.random() * confettiShapes.length)];
      if (shape === 'circle') {
        confetti.style.borderRadius = '50%';
      } else {
        confetti.style.borderRadius = '0';
      }

      confettiContainer.appendChild(confetti);

      setTimeout(() => {
        confetti.remove();
      }, duration * 1000);
    }, i * 15);
  }
}

//"Loo .js fail ka kuupäeva kuvamiseks, kus kuupäeva värvi saab vahetada, kui kasutaja vajutab Space klahvi."
function dateDisplay() {
  const now = new Date();
  const day = String(now.getDate()).padStart(2, '0');
  const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  const year = now.getFullYear();

  const dateDisplay = document.getElementById('date');
  dateDisplay.textContent = `${day}/${month}/${year}`;

  // Lisame kuulamise Space klahvi jaoks
  document.addEventListener('keydown', function(event) {
    if (event.key === ' ') {
      // Kui Space klahv vajutatakse, vahetame kuupäeva värvi
      changeDateColor(dateDisplay);
    }
  });
}

// Funktsioon kuupäeva värvi vahetamiseks
function changeDateColor(dateElement) {
  // Funktsioon juhusliku värvi saamiseks
  const randomColor = getRandomColor();
  dateElement.style.color = randomColor;
}

// Funktsioon juhusliku värvi loomiseks
function getRandomColor() {
  const randomHex = Math.floor(Math.random() * 16777215).toString(16); // 16777215 on 0xFFFFFF ehk maksimaalne heksadesimaalne väärtus
  return `#${randomHex.padStart(6, '0')}`; // PadStart tagab, et värv oleks alati kuuehoolikuline
}

function showGreeting() {
  const now = new Date();
  const hours = now.getHours();
  let greeting;

  if (hours < 12) {
    greeting = "Tere hommikust!";
  } else if (hours < 18) {
    greeting = "Tere päevast!";
  } else {
    greeting = "Tere õhtust!";
  }

  const greetingDisplay = document.getElementById('greeting');
  greetingDisplay.textContent = greeting;
}

// "Lisa funktsioon, mis võimaldab kasutajal muuta kella fonti, kui kasutaja klikib kella peal.""
document.addEventListener('DOMContentLoaded', function() {
  const clockDisplay = document.getElementById('clock');
  const fonts = ['Impact', 'Comic Sans MS', 'Copperplate', 'Papyrus', 'Brush Script MT', 'Arial', 'Verdana', 'Courier New', 'Georgia', 'Times New Roman'];
  let currentFontIndex = 0;

  clockDisplay.addEventListener('click', function() {
    currentFontIndex = (currentFontIndex + 1) % fonts.length;
    clockDisplay.style.fontFamily = fonts[currentFontIndex];
  });
});
 
//"Lisa .js faili funktsioon, mis kuvab ekraanil nädalapäeva ja võimaldab kasutajal nooleklahvidega seda liigutada."
function updateDay() {
  const now = new Date();
  const weekDays = ['Esmaspäev', 'Teisipäev', 'Kolmapäev', 'Neljapäev', 'Reede', 'Laupäev', 'Pühapäev'];
  let dayIndex = (now.getDay() + 6) % 7; // Algab esmaspäevast
  const dayDisplay = document.getElementById('weekday');
  
  // Algne positsioon (top, left)
  let position = { top: 280, left: 660 };

  // Funktsioon, et kuvada päeva ja uuendada positsiooni
  const updateDisplayedDay = () => {
    dayDisplay.textContent = weekDays[dayIndex];
    dayDisplay.style.position = 'absolute';
    dayDisplay.style.top = `${position.top}px`;
    dayDisplay.style.left = `${position.left}px`;
  };

  // Nooleklahvide kuulamine päeva liikumiseks
  document.addEventListener('keydown', function(event) {
    const moveDistance = 10;

    if (event.key === 'ArrowUp') { 
      position.top -= moveDistance;
    } else if (event.key === 'ArrowDown') {
      position.top += moveDistance;
    } else if (event.key === 'ArrowLeft') {
      position.left -= moveDistance;
    } else if (event.key === 'ArrowRight') {
      position.left += moveDistance;
    }
    
    updateDisplayedDay();
  });

  updateDisplayedDay();
}

document.addEventListener('DOMContentLoaded', function() {
  updateDay();
  setInterval(updateDay, 60000);
});

document.addEventListener('DOMContentLoaded', startClock);