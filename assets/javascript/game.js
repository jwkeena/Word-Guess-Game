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
        document.getElementById("start").innerText = "Computron has chosen the next character:";
        document.getElementById("start").style = "font-family: 'Press Start 2P', cursive; font-size: 17px;"
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
        document.getElementById("current-portrait").src = game.currentCharacter.portrait;
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
        document.getElementById("current-portrait").src = this.currentCharacter.portrait;
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
        portrait: "",
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
        this.currentCharacter.portrait = newCharacter[3];

        console.log(this.currentCharacter.portrait)
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
                alert("Letter already guessed!"); //will fire multiple times in a row if the same letter has been chosen more than twice
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
        ["Michael", "Scott", "You don't deserve a hint for this one", "https://media.giphy.com/media/12XMGIWtrHBl5e/giphy.gif"],
        ["Dwight", "Schrute", "Sidekick", "https://media.giphy.com/media/fc8vjg5dxqkMM/giphy.gif"],
        ["Jim", "Halpert", "A smelly fish", "https://media1.giphy.com/media/ZwBiSBq92zbEY/giphy.gif"],
        ["Pam", "Beesly", "Eligible", "https://media.giphy.com/media/1tzjdMvopfY52/giphy.gif"],
        ["Andy", "Bernard", "Anger management", "https://media1.giphy.com/media/YuZrlVuAWzvTG/giphy.gif"],
        ["Robert", "California", "Ultron", "https://media1.tenor.com/images/89b5cd8244497ee5a4b0d4d5197713fd/tenor.gif?itemid=9239993"],
        ["Jan", "Levinson", "Toxic", "https://assets.rbl.ms/18152715/210x.gif"],
        ["Roy", "Anderson", "Bad match", "https://i.redd.it/n80i9o0bvcwx.jpg"],
        ["Stanley", "Hudson", "Pretzel day", "https://media.giphy.com/media/j0IvNX2iBd3q0/giphy.gif"],
        ["Kevin", "Malone", "Chili", "https://media1.tenor.com/images/b8319e1ee8daa2da21b7633a7b8c8693/tenor.gif?itemid=5408450"],
        ["Meredith", "Palmer", "Alcoholic", "https://media.giphy.com/media/1399UZyRaVoV5m/giphy.gif"],
        ["Angela", "Martin", "Sprinkles", "https://media1.tenor.com/images/ff62604c3f4ee321de63a4e954e5af44/tenor.gif?itemid=5400529"],
        ["Oscar", "Martinez", "Gil", "https://media1.tenor.com/images/7032aa9adfd7783a30c3b12ed1e62d5f/tenor.gif?itemid=12151523"],
        ["Phyllis", "Lapin", "Pre-Vance", "https://media2.giphy.com/media/117GU54VvZUhlS/giphy.gif"],
        ["Kelly", "Kapoor", "Diwali", "https://media.giphy.com/media/zMQcrvqjkC9d6/200.gif"],
        ["Toby", "Flenderson", "The worst", "https://media.giphy.com/media/wrKbZmYC2IQ92/giphy.gif"],
        ["Creed", "Bratton", "BOBODDY", "https://media.giphy.com/media/uxCT4ewdlB8uk/giphy.gif"],
        ["Darryl", "Philbin", "Warehouse","data:image/jpeg;base64,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"],
        ["Erin", "Hannon", "Real first name: Kelly", "https://media1.tenor.com/images/3f5ca71e4a484718a4692e8f28c52f5b/tenor.gif?itemid=11932383"], 
        ["Gabe", "Lewis", "Getting attacked by a skeleton", "https://i.redd.it/iq6f623xk5i11.gif"],
        ["Holly", "Flax", "Anti-matter Jan", "https://66.media.tumblr.com/16c2af7f05b593f69be09f68deb39bf9/tumblr_nowlc3WbyZ1rynk4uo8_250.gif"],
        ["Nellie", "Bertram", "Uslurps Andy's job", "https://media1.giphy.com/media/6aEBfY1zwdF3G/giphy.gif"],
        ["Clark", "Green", "Babyface boring character in season 9", "https://cdn-images-1.medium.com/max/1600/1*DG3UouTe1mTgurE9LHea7g.gif"],
        ["Pete", "Miller", "Plop", "https://media.giphy.com/media/z4Qq8XD7Kwyhq/giphy.gif"],
        ["Todd", "Packer", "Every disgusting frat boy rolled into one disgusting person", "https://media.giphy.com/media/Hf0VGD0h6s1tm/giphy.gif"],
        ["David", "Wallace", "Corporate", "https://i.redd.it/8n7e05kxtdi21.gif"],
        ["Karen", "Filippelli", "The wrong girlfriend", "https://media1.tenor.com/images/85842331eb9ff64a6af0a191d0b6fb7b/tenor.gif?itemid=7375916"],
        ["Charles", "Miner", "He's aware of the effect he has on women", ""],
        ["Jo", "Bennett", "Author of Take a Good Look", "https://media.giphy.com/media/12iQizf0Dfdw5y/giphy.gif"],
        ["Robert", "Lipton", "He holds political office", "https://t1.daumcdn.net/cfile/tistory/015A6039514E9D6C34"],
        ["Nate", "Nickerson", "Hard of hearing", "http://i.imgur.com/d7TELUJ.gif"],
        ["Deangelo", "Vickers", "Quickly hospitalized", "https://thumbs.gfycat.com/AppropriateLinearGrouse-size_restricted.gif"],
        ["Cathy", "Simms", "Let's seduce Jim!", "https://media.giphy.com/media/mycruCgRdF4Jy/giphy.gif"],
    ],
    
}
