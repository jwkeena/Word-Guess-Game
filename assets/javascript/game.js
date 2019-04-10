//waits for any key to be pressed before starting game
letter = "";
isNewGame = false;

document.onkeyup = function(event) {
    letter = event.key;
    if (isNewGame === false) {
        game.startGame();
    } else {
        game.guessLetter();
        game.checkLetter();
    }
}

const game = {
    startGame: function() {
        isNewGame = !isNewGame
        document.getElementById("start").innerText = "";
        this.guessesRemaining = 7;
        document.getElementById("guesses").innerText = 7;
        this.lettersGuessed = [];
        document.getElementById("current-character-first").innerText = "";
        document.getElementById("current-character-last").innerText = "";
        this.pickNewCharacter();
    },
    
    //toggle difficulty (easy mode does first name only, hard mode does first and last)
    isFirstNamesOnly: true,
    changeMode: function() {
        if (this.isFirstNamesOnly) {
        } else {
            this.isFirstNamesOnly = true;
        }},
    
    //tracks wins
    wins: 0,
    win: function() {
        this.wins++
        document.getElementById("wins").innerText = this.wins;
        document.getElementById("start").innerText = "Press any key to begin another game!";
        isNewGame = !isNewGame;
        },

    //tracks losses
    losses: 0,
    lose: function() {
        this.losses++
        document.getElementById("losses").innerText = this.losses;
        document.getElementById("start").innerText = "Press any key to begin another game!";
        isNewGame = !isNewGame;
        },
    
    guessLetter: function() {
        --this.guessesRemaining;
        document.getElementById("guesses").innerText = this.guessesRemaining;
        if (this.guessesRemaining === 0) {
            this.lose();
        }
        this.lettersGuessed.push(letter);
        document.getElementById("letters-guessed").innerHTML = this.lettersGuessed.join(", ");
    },

    //stores user input for current game
    guessesRemaining: 7, //Decrement this number each guess.
    lettersGuessed: [], //Push letters the user presses to this object
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
        this.currentCharacter.firstName = newCharacter[0]; //reassigns firstName variable in currentCharacter object to the random name just picked
        this.currentCharacter.lastName = newCharacter[1]; //ditto for lastName
        this.currentCharacter.numOfLettersFirst = newCharacter[0].length;
        this.currentCharacter.numOfLettersLast = newCharacter[1].length;
        console.log("Here's the answer, cheater: " + newCharacter[0] + " " + newCharacter[1]);
        for (i = 0; i < this.currentCharacter.numOfLettersFirst; i++) {
            document.getElementById("first" + i).innerText = "_ ";
            // first way to print the desired number of underscores: document.getElementById("current-character-first").textContent += "_ "
            }
        if (this.isFirstNamesOnly != true) {
            for (i = 0; i < this.currentCharacter.numOfLettersLast; i++) {
            document.getElementById("last" + i).innerText = "_ ";
            }
        }
        },
    // writeCharacterToScreen: function() {
    //     if (this.isFirstNamesOnly) {
    //         document.getElementById("current-character-first").innerText = this.currentCharacter.firstName.toUpperCase();
    //         document.getElementById("current-character-last").innerText = "";
    //     } else {
    //         document.getElementById("current-character-first").innerText = this.currentCharacter.firstName.toUpperCase();
    //         document.getElementById("current-character-last").innerText = this.currentCharacter.lastName.toUpperCase();
    //     }
    // },
    checkLetter: function() {
        for (i=0; i < this.currentCharacter.firstName.length; i++) {
            if (letter === this.currentCharacter.firstName[i].toLowerCase())
            console.log(letter + " is a match")
        }
        //write same loop for last name

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
        ["Deangelo", "Vicerks"],
        ["Val", "Johnson"],
        ["Cathy", "Simms"],
    ],
    
}
