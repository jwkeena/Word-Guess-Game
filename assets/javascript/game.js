//waits for any key to be pressed before starting game
letter = "";
isNewGame = false;

document.onkeyup = function(event) {
    letter = event.key;
    if (isNewGame === false) {
        game.startGame();
        document.getElementById("mode").disabled = true;
        document.getElementById("hint").disabled = false;
    } else {
        game.checkLetter();
    }
}

const game = {
    startGame: function() {
        isNewGame = !isNewGame;
        this.preventloss = false;
        this.correctGuesses = 0;
        document.getElementById("start").innerText = "Computron has chosen the next character...";
        document.getElementById("start").style = "font-family: 'Press Start 2P', cursive;"
        this.guessesRemaining = 12;
        document.getElementById("guesses").innerText = 12;
        this.lettersGuessed = [];
        document.getElementById("letters-guessed").innerText = "";
        for (i=0; i < 11; i++){
            document.getElementById("first" + i).innerText = "";
            document.getElementById("last" + i).innerText = "";
        }
        this.pickNewCharacter();
    },
    
    //toggle difficulty (easy mode does first name only, hard mode does first and last)
    isFirstNamesOnly: true,
    switchMode: function() {
        if (this.isFirstNamesOnly) {
            this.isFirstNamesOnly = false;
            document.getElementById("current-mode").innerText = "First and last names"

        } else {
            this.isFirstNamesOnly = true;
            document.getElementById("current-mode").innerText="First names only"
        }
    console.log(this.isFirstNamesOnly)},

    hint: function() {
        document.getElementById("current-hint").innerText = this.currentCharacter.hint;
    },

    //tracks wins
    wins: 0,
    win: function() {
        game.wins++ //for some reason I can't put "this.wins" in this line 
        alert("You win/win/win! The important difference here is with win/win/win, we all win. Me too. I win for having successfully mediated a conflict at work.")
        document.getElementById("wins").innerText = game.wins; //for some reason I can't put "this.wins" in this line 
        document.getElementById("start").innerText = "Press any key to begin another game!";
        document.getElementById("mode").disabled = false;
        document.getElementById("hint").disabled = true;
        document.getElementById("current-hint").innerText = "One per game";
        document.getElementById("start").style = "font-family: Helvetica, sans-serif;"
        isNewGame = !isNewGame;
        },

    //tracks losses
    losses: 0,
    lose: function() {
        game.losses++
        alert("Idiot! Idiot! The answer was " + game.currentCharacter.firstName + " " + game.currentCharacter.lastName)
        document.getElementById("losses").innerText = game.losses;
        document.getElementById("start").innerText = "Press any key to begin another game!";
        document.getElementById("mode").disabled = false;
        document.getElementById("hint").disabled = true;
        document.getElementById("current-hint").innerText = "One per game";
        document.getElementById("start").style = "font-family: Helvetica, sans-serif;"
        isNewGame = !isNewGame;
    },
    
    //stores user input for current game
    correctGuesses: 0,
    guessesRemaining: 12, 
    lettersGuessed: [], 
    currentCharacter: {
        numOfLettersFirst: 0,
        numOfLettersLast: 0,
        firstName: "",
        lastName: "",
        hint: "",
        }, 

    pickNewCharacter: function() {
        numOfCharacters = this.characters.length; //also works to get length of an object: Object.keys(this.characters).length));
        randomCharacterIndex = Math.floor(Math.random()*numOfCharacters);
        newCharacter = this.characters[randomCharacterIndex];
        this.currentCharacter.firstName = newCharacter[0];
        this.currentCharacter.lastName = newCharacter[1];
        this.currentCharacter.numOfLettersFirst = newCharacter[0].length;
        this.currentCharacter.numOfLettersLast = newCharacter[1].length;
        this.currentCharacter.hint = newCharacter[2];

        console.log("Here's the answer, cheater: " + newCharacter[0] + " " + newCharacter[1]);

        for (i = 0; i < this.currentCharacter.numOfLettersFirst; i++) {
            document.getElementById("first" + i).innerText = "_ ";
            }

        if (this.isFirstNamesOnly === false) {
            for (i = 0; i < this.currentCharacter.numOfLettersLast; i++) {
            document.getElementById("last" + i).innerText = "_ ";
            }
        }
    },

    isDuplicate: false,
    checkForDuplicate: function() {
    for (i=0; i < this.lettersGuessed.length; i++) {
            if (letter === this.lettersGuessed[i].toLowerCase()){
                alert("Letter already guessed!");
                this.isDuplicate = true;
            }
        }   
    },

    guessLetter: function() {
        this.lettersGuessed.push(letter);
        document.getElementById("letters-guessed").innerText = this.lettersGuessed.join(", ").toUpperCase();
        --this.guessesRemaining;
        document.getElementById("guesses").innerText = this.guessesRemaining;
    },

    preventLoss: false,
    checkLetter: function() {
        this.preventLoss = false;
        this.checkForDuplicate(); //prevents previously guessed number from incrementing correctGuesses (and triggering a false win)
        if (this.isDuplicate === false) {
        
            //checks first names only
            for (i=0; i < this.currentCharacter.firstName.length; i++) {
                
                if (letter === this.currentCharacter.firstName[i].toLowerCase()) {
                    console.log(letter + " is a match")
                    document.getElementById("first" + i).innerText = letter.toUpperCase();
                        ++this.correctGuesses;
                        console.log("correct guesses: " + this.correctGuesses)
                        if (this.correctGuesses === this.currentCharacter.numOfLettersFirst && this.isFirstNamesOnly === true) {
                            game.preventLoss = true;
                            setTimeout(this.win, 200); //don't put () after function call inside setTimeout method
                        }
                    }
                }
            }

            //checks last names only if the mode button is clicked
            if (this.isFirstNamesOnly === false) {

                for (i=0; i < this.currentCharacter.lastName.length; i++) {
                    
                    if (letter === this.currentCharacter.lastName[i].toLowerCase()) {
                        console.log(letter + " is a match")
                        document.getElementById("last" + i).innerText = letter.toUpperCase();
                            ++this.correctGuesses;
                            console.log("correct guesses: " + this.correctGuesses)
                            if (this.correctGuesses === this.currentCharacter.numOfLettersFirst + this.currentCharacter.numOfLettersLast) {
                                game.preventLoss = true;
                                setTimeout(this.win, 200); //don't put () after function call inside setTimeout method
                            }
                        }
                    }
                }


            this.isDuplicate = false; //resets duplicate preventor till next letter is chosen
            this.guessLetter();
        
            if (this.guessesRemaining === 0 && game.preventLoss === false) {
                setTimeout(this.lose, 201);
            }

    },

    characters: [
        ["Michael", "Scott", "You don't deserve a hint for this one"],
        ["Dwight", "Schrute", "Sidekick"],
        ["Jim", "Halpert", "A smelly fish"],
        ["Pam", "Beesly", "Eligible"],
        ["Andy", "Bernard", "Anger management"],
        ["Robert", "California", "Ultron"],
        ["Jan", "Levinson", "Toxic"],
        ["Roy", "Anderson", "Bad match"],
        ["Stanley", "Hudson", "Pretzel day"],
        ["Kevin", "Malone", "Chili"],
        ["Meredith", "Palmer", "Alcoholic"],
        ["Angela", "Martin", "Sprinkles"],
        ["Oscar", "Martinez", "Gil"],
        ["Phyllis", "Lapin", "Pre-Vance"],
        ["Kelly", "Kapoor", "Diwali"],
        ["Toby", "Flenderson", "The worst"],
        ["Creed", "Bratton", "BOBODDY"],
        ["Darryl", "Philbin", "Warehouse"],
        ["Erin", "Hannon", "Real first name: Kelly"], 
        ["Gabe", "Lewis", "Getting attacked by a skeleton"],
        ["Holly", "Flax", "Anti-matter Jan"],
        ["Nellie", "Bertram", "Uslurps Andy's job"],
        ["Clark", "Green", "Babyface boring character in season 9"],
        ["Pete", "Miller", "Plop"],
        ["Todd", "Packer", "Every disgusting frat boy rolled into one disgusting person"],
        ["David", "Wallace", "Corporate"],
        ["Karen", "Filippelli", "The wrong girlfriend"],
        ["Charles", "Miner", "He's aware of the effect he has on women"],
        ["Jo", "Bennett", "Author of Take a Good Look"],
        ["Robert", "Lipton", "He holds political office"],
        ["Nate", "Nickerson", "Hard of hearing"],
        ["Deangelo", "Vickers", "Quickly hospitalized"],
        ["Val", "Johnson", "This one is impossible. Just give up"],
        ["Cathy", "Simms", "Let's seduce Jim!"],
    ],
    
}
