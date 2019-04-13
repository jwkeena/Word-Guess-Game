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
        document.getElementById("current-portrait").src="assets/images/static.gif";
        document.getElementById("start").innerText = "Computron has chosen the next character...";
        document.getElementById("start").style = "font-family: 'Press Start 2P', cursive; font-size: 16px;"
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
        document.getElementById("current-portrait").src = game.currentCharacter.portrait;
        isNewGame = false;
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
        hint: "One per game",
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
                    document.getElementById("first" + i).innerText = letter.toUpperCase();
                        ++this.correctGuesses;
                        console.log("correct guesses: " + this.correctGuesses)
                        if (this.correctGuesses >= this.currentCharacter.numOfLettersFirst && this.isFirstNamesOnly === true) {
                            game.preventLoss = true;
                            setTimeout(this.win, 200); //don't put () after function call inside setTimeout method
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
            }



            this.isDuplicate = false; //resets duplicate preventor till next letter is chosen
            this.guessLetter();
        
            if (this.guessesRemaining <= 0 && game.preventLoss === false) {
                setTimeout(this.lose, 220);
            }

    },

    characters: [
        ["Michael", "Scott", "You don't deserve a hint for this one", "https://media.giphy.com/media/12XMGIWtrHBl5e/giphy.gif"],
        ["Dwight", "Schrute", "Sidekick", "https://media.giphy.com/media/fc8vjg5dxqkMM/giphy.gif"],
        ["Jim", "Halpert", "A smelly fish", "https://media1.giphy.com/media/ZwBiSBq92zbEY/giphy.gif"],
        ["Pam", "Beesly", "Eligible", "https://media.giphy.com/media/3oEjHYibHwRL7mrNyo/giphy.gif"],
        ["Andy", "Bernard", "Anger management", "https://media1.giphy.com/media/YuZrlVuAWzvTG/giphy.gif"],
        ["Robert", "California", "Ultron", "https://media1.tenor.com/images/89b5cd8244497ee5a4b0d4d5197713fd/tenor.gif?itemid=9239993"],
        ["Jan", "Levinson", "Toxic", "https://assets.rbl.ms/18152715/210x.gif"],
        ["Roy", "Anderson", "Stay away, Pam", "https://thumbs.gfycat.com/ClosedSecondaryBilby-small.gif"],
        ["Stanley", "Hudson", "Pretzel day", "https://media.giphy.com/media/j0IvNX2iBd3q0/giphy.gif"],
        ["Kevin", "Malone", "Chili", "https://media1.tenor.com/images/b8319e1ee8daa2da21b7633a7b8c8693/tenor.gif?itemid=5408450"],
        ["Meredith", "Palmer", "Alcoholic", "https://media.giphy.com/media/1399UZyRaVoV5m/giphy.gif"],
        ["Mose", "Schrute", "The producer", "https://media0.giphy.com/media/YIWLXw1tvipLW/giphy.gif"],
        ["Angela", "Martin", "Sprinkles", "https://media1.tenor.com/images/ff62604c3f4ee321de63a4e954e5af44/tenor.gif?itemid=5400529"],
        ["Oscar", "Martinez", "Gil", "https://media1.tenor.com/images/7032aa9adfd7783a30c3b12ed1e62d5f/tenor.gif?itemid=12151523"],
        ["Phyllis", "Lapin", "Pre-Vance", "https://media2.giphy.com/media/117GU54VvZUhlS/giphy.gif"],
        ["Kelly", "Kapoor", "Diwali", "https://media.giphy.com/media/zMQcrvqjkC9d6/200.gif"],
        ["Toby", "Flenderson", "The worst", "https://media.giphy.com/media/wrKbZmYC2IQ92/giphy.gif"],
        ["Creed", "Bratton", "BOBODDY", "https://i.makeagif.com/media/12-09-2015/cm3ryq.gif"],
        ["Ryan", "Howard", "Arsonist", "http://24.media.tumblr.com/tumblr_m8qe8xH76Y1qjz8hno9_r1_250.gif"],
        ["Danny", "Cordray", "More handsome than Ryan", "https://66.media.tumblr.com/30db844bb83c85d7382c62f5bef361da/tumblr_nabpwuA8gd1txh8a8o4_250.gif"],
        ["Darryl", "Philbin", "Warehouse","https://media.giphy.com/media/ZZtQCUtUBOUpi/giphy.gif"],
        ["Erin", "Hannon", "Real first name: Kelly", "https://media1.tenor.com/images/3f5ca71e4a484718a4692e8f28c52f5b/tenor.gif?itemid=11932383"], 
        ["Gabe", "Lewis", "Getting attacked by a skeleton", "https://i.redd.it/iq6f623xk5i11.gif"],
        ["Holly", "Flax", "Anti-matter Jan", "https://66.media.tumblr.com/16c2af7f05b593f69be09f68deb39bf9/tumblr_nowlc3WbyZ1rynk4uo8_250.gif"],
        ["Nellie", "Bertram", "Uslurps Andy's job", "https://media1.giphy.com/media/6aEBfY1zwdF3G/giphy.gif"],
        ["Clark", "Green", "Babyface boring character in season 9", "https://cdn-images-1.medium.com/max/1600/1*DG3UouTe1mTgurE9LHea7g.gif"],
        ["Pete", "Miller", "Plop", "https://media.giphy.com/media/z4Qq8XD7Kwyhq/giphy.gif"],
        ["Todd", "Packer", "Every disgusting frat boy rolled into one disgusting person", "https://media.giphy.com/media/Hf0VGD0h6s1tm/giphy.gif"],
        ["David", "Wallace", "Corporate", "https://i.redd.it/8n7e05kxtdi21.gif"],
        ["Karen", "Filippelli", "The wrong girlfriend", "https://media1.tenor.com/images/85842331eb9ff64a6af0a191d0b6fb7b/tenor.gif?itemid=7375916"],
        ["Charles", "Miner", "He's aware of the effect he has on women", "https://media.giphy.com/media/U5LdUaqNIl9GU/giphy.gif"],
        ["Jo", "Bennett", "Author of Take a Good Look", "https://media.giphy.com/media/12iQizf0Dfdw5y/giphy.gif"],
        ["Robert", "Lipton", "He holds political office", "https://t1.daumcdn.net/cfile/tistory/015A6039514E9D6C34"],
        ["Nate", "Nickerson", "Hard of hearing", "http://i.imgur.com/d7TELUJ.gif"],
        ["Deangelo", "Vickers", "Quickly hospitalized", "https://thumbs.gfycat.com/AppropriateLinearGrouse-size_restricted.gif"],
        ["Cathy", "Simms", "Let's seduce Jim!", "https://media.giphy.com/media/mycruCgRdF4Jy/giphy.gif"],
        ["David", "Brent", "British Michael", "https://i.makeagif.com/media/12-01-2015/dZc6vP.gif"],
        ["Bob", "Vance", "Keep your food cold", "https://media.giphy.com/media/R94tA7YxGzVxS/giphy.gif"],
        ["Cece", "Halpert", "Baby #1", "https://49.media.tumblr.com/50555306ff1675332cb6e6f83e68b7dc/tumblr_nz9yo6TrNF1sjpwazo1_250.gif"],
        ["Philip", "Halpert", "Baby #2", "https://66.media.tumblr.com/a09b088a2b8132084dd3cac79a5318ab/tumblr_msy9t76pKk1qm2l53o1_250.gif"]
    ],
    
}
