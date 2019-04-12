//waits for any key to be pressed before starting game
letter = "";
isNewGame = false;

document.onkeyup = function(event) {
    letter = event.key;
    if (isNewGame === false) {
        game.startGame();
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
        this.guessesRemaining = 9;
        document.getElementById("guesses").innerText = 9;
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
    changeMode: function() {
        if (this.isFirstNamesOnly) {
            this.isFirstNamesOnly = false;
        } else {
            this.isFirstNamesOnly = true;
        }},

    //tracks wins
    wins: 0,
    win: function() {
        game.wins++ //for some reason I can't put "this.wins" in this line 
        console.log(this.wins)
        alert("You win/win/win! The important difference here is with win/win/win, we all win. Me too. I win for having successfully mediated a conflict at work.")
        document.getElementById("wins").innerText = game.wins; //for some reason I can't put "this.wins" in this line 
        document.getElementById("start").innerText = "Press any key to begin another game!";
        isNewGame = !isNewGame;
        },

    //tracks losses
    losses: 0,
    lose: function() {
        game.losses++
        alert("Idiot! Idiot! The answer was " + game.currentCharacter.firstName + " " + game.currentCharacter.lastName)
        document.getElementById("losses").innerText = game.losses;
        document.getElementById("start").innerText = "Press any key to begin another game!";
        isNewGame = !isNewGame;
    },
    
    //stores user input for current game
    correctGuesses: 0,
    guessesRemaining: 9, 
    lettersGuessed: [], 
    currentCharacter: {
        numOfLettersFirst: 0,
        numOfLettersLast: 0,
        firstName: "",
        lastName: ""
        }, 

    pickNewCharacter: function() {
        numOfCharacters = this.characters.length; //also works to get length of an object: Object.keys(this.characters).length));
        randomCharacterIndex = Math.floor(Math.random()*numOfCharacters);
        newCharacter = this.characters[randomCharacterIndex];
        this.currentCharacter.firstName = newCharacter[0];
        this.currentCharacter.lastName = newCharacter[1];
        this.currentCharacter.numOfLettersFirst = newCharacter[0].length;
        this.currentCharacter.numOfLettersLast = newCharacter[1].length;

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
        
            for (i=0; i < this.currentCharacter.firstName.length; i++) {
                
                if (letter === this.currentCharacter.firstName[i].toLowerCase()) {
                    console.log(letter + " is a match")
                    document.getElementById("first" + i).innerText = letter.toUpperCase();
                        ++this.correctGuesses;
                        console.log("correct guesses: " + this.correctGuesses)
                        if (this.correctGuesses === this.currentCharacter.numOfLettersFirst) {
                            debugger;
                            game.preventLoss = true;
                            setTimeout(this.win, 200); //don't put () after function call inside setTimeout method
                        }
                    }
                }
            }
        this.isDuplicate = false; //resets duplicate preventor till next letter is chosen
        this.guessLetter();
        console.log("Guesses remaining" + this.guessesRemaining);
        
        if (this.guessesRemaining === 0 && game.preventLoss === false) {
            setTimeout(this.lose, 201);
        }
        
            //REWRITE FUNCTION TO ADD NUMBER OF FIRST AND LAST LETTERS FOR BOTH NAMES
            // if (this.isFirstNamesOnly === false) {
            //     for (i=0; i < this.currentCharacter.lastName.length; i++) {
            //         if (letter === this.currentCharacter.lastName[i].toLowerCase()) {
            //         console.log(letter + " is a match")
            //         document.getElementById("last" + i).innerText = letter;
            //         ++this.correctGuesses;
            //         }
            //     }
            // }

    },

    characters: [
        ["Michael", "Scott"],
        ["Dwight", "Schrute"],
        ["Jim", "Halpert"],
        ["Pam", "Beesly"],
        ["Andy", "Bernard"],
        ["Robert", "California"],
        ["Jan", "Levinson"],
        ["Roy", "Anderson"],
        ["Stanley", "Hudson"],
        ["Kevin", "Malone"],
        ["Meredith", "Palmer"],
        ["Angela", "Martin"],
        ["Oscar", "Martinez"],
        ["Phyllis", "Lapin"],
        ["Kelly", "Kapoor"],
        ["Toby", "Flenderson"],
        ["Creed", "Bratton"],
        ["Darryl", "Philbin"],
        ["Erin", "Hannon"], //Her real first name is Kelly
        ["Gabe", "Lewis"],
        ["Holly", "Flax"],
        ["Nellie", "Bertram"],
        ["Clark", "Green"],
        ["Pete", "Miller"],
        ["Todd", "Packer"],
        ["David", "Wallace"],
        ["Karen", "Filippelli"],
        ["Charles", "Miner"],
        ["Jo", "Bennett"],
        ["Robert", "Lipton"],
        ["Nate", "Nickerson"],
        ["Deangelo", "Vicers"],
        ["Val", "Johnson"],
        ["Cathy", "Simms"],
    ],
    
}
