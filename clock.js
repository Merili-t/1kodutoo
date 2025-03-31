function updateClock() {
    const now = new Date();
    
    // Get current time
    let hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    
    // Format for 12-hour clock with meridian
    let meridian = "AM";
    if (hours >= 12) {
      meridian = "PM";
    }
    if (hours > 12) {
      hours = hours - 12;
    }
    
    // Display time on the webpage
    const clockDisplay = document.getElementById('clock');
    const clockTime = `${hours}:${minutes}:${seconds} ${meridian}!`;
    clockDisplay.textContent = clockTime;
  }
  
  function startClock() {
    // Time constants
    var wakeuptime = 7;
    var noon = 12;
    var lunchtime = 12;
    var naptime = lunchtime + 2;
    var partytime = -1;
    var evening = 18;
    
    // Initial clock update
    updateClock();
    
    // Update clock every second
    var oneSecond = 1000;
    setInterval(updateClock, oneSecond);
    
    // Setup date display
    dateDisplay();
    
    // Setup greeting
    showGreeting();
    
    // Setup party time button
    var partyButton = document.getElementById("partyTimeButton");
    
    var partyEvent = function() {
      if (partytime < 0) {
        partytime = new Date().getHours();
        partyButton.innerText = "Party Over!";
        partyButton.style.backgroundColor = "#0A8DAB";
        createConfetti(150);
      } else {
        partytime = -1;
        partyButton.innerText = "Party Time!";
        partyButton.style.backgroundColor = "#222";
      }
    };
    
    partyButton.addEventListener("click", partyEvent);
    partyEvent();
    
    // Setup save buttons
    setupTimeSelectors();
  }
  
  function setupTimeSelectors() {
    // Get save buttons
    var saveWakeUpButton = document.getElementById("saveWakeUpTime");
    var saveLunchButton = document.getElementById("saveLunchTime");
    var saveNapButton = document.getElementById("saveNapTime");
  
    // Get effect containers
    var sunriseContainer = document.getElementById("sunriseContainer");
    var lunchContainer = document.getElementById("lunchContainer");
    var napContainer = document.getElementById("napContainer");
  
    // Wake Up Time effect - sunrise
    saveWakeUpButton.addEventListener("click", function() {
      // Get wakeup time selector
      const wakeUpTimeSelector = document.getElementById("wakeUpTimeSelector");
      
      // Save time
      wakeuptime = wakeUpTimeSelector.value;
      
      // Clear container
      sunriseContainer.innerHTML = '';
      
      // Create sun element
      var sun = document.createElement("div");
      sun.classList.add("sun");
      sunriseContainer.appendChild(sun);
      
      // Remove effect after animation ends
      setTimeout(function() {
        sunriseContainer.innerHTML = '';
      }, 3500);
    });
  
    // Lunch Time effect
    saveLunchButton.addEventListener("click", function() {
      // Get lunch time selector
      const lunchTimeSelector = document.getElementById("lunchTimeSelector");
      
      // Save time
      lunchtime = lunchTimeSelector.value;
      
      // Clear container
      lunchContainer.innerHTML = '';
      
      // Lunchtime utensils icons
      const utensils = ['🍴', '🥄', '🍽️', '🥢', '🍕', '🍔', '☕'];
      
      for (let i = 0; i < 12; i++) {
        const utensil = document.createElement('div');
        utensil.classList.add('utensil');
        
        // Choose random utensil icon
        utensil.innerText = utensils[Math.floor(Math.random() * utensils.length)];
        
        // Place at random position
        utensil.style.left = `${Math.random() * 90 + 5}%`;
        utensil.style.top = `${Math.random() * 60 + 20}%`;
        
        // Apply random sizes
        const size = Math.random() * 30 + 20;
        utensil.style.fontSize = `${size}px`;
        
        // Animation delay
        utensil.style.animationDelay = `${Math.random() * 0.5}s`;
        
        lunchContainer.appendChild(utensil);
      }
      
      // Remove effect after animation ends
      setTimeout(function() {
        lunchContainer.innerHTML = '';
      }, 5000);
    });
  
    // Nap Time effect - sleeping Zs
    saveNapButton.addEventListener("click", function() {
        // Get nap time selector
        const napTimeSelector = document.getElementById("napTimeSelector");
        
        // Save time
        naptime = napTimeSelector.value;
        
        // Clear container
        napContainer.innerHTML = '';
        
        // Sleep elements: Z letters and sleep emojis
        const sleepElements = ['Z', '💤', '😴', '🛌', '🌙'];
        
        // Create multiple Zs and sleep emojis with different sizes
        for (let i = 0; i < 15; i++) {
          const sleepZ = document.createElement('div');
          sleepZ.classList.add('sleep-z');
          
          // Select random sleep element (Z or emoji)
          sleepZ.innerText = sleepElements[Math.floor(Math.random() * sleepElements.length)];
          
          // Random position
          sleepZ.style.left = `${Math.random() * 90 + 5}%`;
          sleepZ.style.bottom = `${Math.random() * 60 + 20}%`;
          
          // Random size
          const size = Math.random() * 30 + 20;
          sleepZ.style.fontSize = `${size}px`;
          
          // Delay appearance
          sleepZ.style.animationDelay = `${Math.random() * 0.5}s`;
          
          napContainer.appendChild(sleepZ);
        }
        
        // Remove effect after animation ends
        setTimeout(function() {
          napContainer.innerHTML = '';
        }, 5000);
      });
    }

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
  
  function dateDisplay() {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = now.getFullYear();
  
    const dateDisplay = document.getElementById('date');
    dateDisplay.textContent = `${day}/${month}/${year}`;
  }
  
  function showGreeting() {
    const now = new Date();
    const hours = now.getHours();
    let greeting;
  
    if (hours < 12) {
      greeting = "Good Morning!";
    } else if (hours < 18) {
      greeting = "Good Afternoon!";
    } else {
      greeting = "Good Evening!";
    }
  
    const greetingDisplay = document.getElementById('greeting');
    greetingDisplay.textContent = greeting;
  }
  
  // Start the clock when the document is ready
  document.addEventListener('DOMContentLoaded', startClock);