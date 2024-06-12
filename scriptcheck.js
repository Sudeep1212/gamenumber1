document.addEventListener('DOMContentLoaded', () => {
    const numbers = Array.from({ length: 100 }, (_, i) => i + 1);
    let randomNumber = numbers[Math.floor(Math.random() * numbers.length)];
    let filteredNumbers = [...numbers];
    let guessCount = 0;

    const numberGrid = document.getElementById('number-grid');
    const message = document.getElementById('message');
    const guessInput = document.getElementById('guess-input');
    const guessButton = document.getElementById('guess-button');
    const guessCountDisplay = document.getElementById('guess-count');

    function renderNumbers() {
        numberGrid.innerHTML = '';
        numbers.forEach(num => {
            const span = document.createElement('span');
            span.textContent = num;
            span.dataset.number = num;
            span.classList.add('number');
            if (!filteredNumbers.includes(num)) {
                span.classList.add('hidden');
            }
            numberGrid.appendChild(span);
        });
    }

    renderNumbers();

    guessButton.addEventListener('click', () => {
        const userGuess = Number(guessInput.value);
        guessCount++;
        if (userGuess === randomNumber) {
            message.textContent = `Correct! The number was ${randomNumber}. You took ${guessCount} guesses.`;
            guessInput.disabled = true;
            guessButton.disabled = true;
            document.querySelectorAll('.number').forEach(el => {
                if (el.dataset.number == randomNumber) { // Change background and text color of guessed number
                    el.style.backgroundColor = '#ffffff';
                    el.style.color = '#000000';
                }
            });
        } else {
            if (userGuess > randomNumber) {
                message.textContent = 'Too high!';
                filteredNumbers = filteredNumbers.filter(num => num < userGuess);
            } else {
                message.textContent = 'Too low!';
                filteredNumbers = filteredNumbers.filter(num => num > userGuess);
            }
            renderNumbers();
        }
        guessInput.value = '';
        guessCountDisplay.textContent = `Number of guesses: ${guessCount}`;
    });

    numberGrid.addEventListener('click', (e) => {
        if (e.target.classList.contains('number') && !e.target.classList.contains('hidden')) {
            guessInput.value = e.target.dataset.number;
        }
    });
});
