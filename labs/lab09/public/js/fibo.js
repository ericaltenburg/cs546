function checkIsProperNumber (num) {
	if (num === undefined || num === null) throw "Error: number does not exist";
	if (typeof num !== 'number') throw `Error: ${num} is NaN`;
	if (num % 1 !== 0) throw `Error: ${num} is not an integer`; // which shouldn't be possible
}

function fibonacci(num) {
    if (num <= 1) {
        return num;
    }
    return fibonacci(num-1) + fibonacci(num-2);
}

function isPrime(num) {
    for (let i = 2; i < num; i++) {
        if (num % i === 0) 
            return false;
    }
    return num > 1;
}

const form = document.getElementById('form');
const myOl = document.getElementById('results');
if (form) {
    const enteredNum = document.getElementById('number');
    const errorContainer = document.getElementById('error-container');
    const errorTextElement = errorContainer.getElementsByClassName('text-goes-here')[0];

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        try {
            // hide containers by default
            // errorContainer.classList.add('hidden');
            errorContainer.hidden = true;
            
            const enteredNumValue = enteredNum.value;
            const parsedEnteredNum = parseInt(enteredNumValue);
            checkIsProperNumber(parsedEnteredNum);

            let li = document.createElement('li');

            if (parsedEnteredNum > 0) {
                const fiboResult = fibonacci(parsedEnteredNum);
                const prime = isPrime(fiboResult);
    
                li.innerHTML = 'The Fibonacci of ' + parsedEnteredNum + ' is ' + fiboResult + ".";
                li.className = prime ? "is-prime" : "not-prime";
            } else {
                li.innerHTML = 'The Fibonacci of anything les than 1 is 0.';
                li.className = "not-prime";
            }
            
            myOl.appendChild(li);
        } catch (e) {
            const message = typeof e === 'string' ? e : e.message;
            errorTextElement.textContent = message + ".";
            errorContainer.classList.remove('hidden');
            errorContainer.hidden = false;
        }   
    });
}