var app = new Vue ({

    el: "#Rock-Paper-Scissors",
    
    data: {

        displayInstructions: true,
        startGame: false,

        numberOfGames: 0,
        oneGameHeader: false,
        currentGameNumber: 1,
        displayCurrentGameNumber: false,

        computerGuess: '',
        userGuess: '',

        userScore: 0,
        computerScore: 0,

        currentWinner: '',
        winnerMessage: '',

        nextRoundButton: false,
        currentRoundResults: false,
        finalResultsButton: false,
        finalResults: false,
        finalResultsMessage: "",
    },

    methods: {
      
      setGameNumber: function(number) {
        
        this.numberOfGames = number;
        this.hideInstructionsStartGame();
      },
    
      hideInstructionsStartGame: function() {

        this.displayInstructions = false;
        this.startGame = true;
        
        if (this.numberOfGames !== 1) {
            this.displayCurrentGameNumber = true;
        } else {
            this.displayCurrentGameNumber = false;
            this.oneGameHeader = true;
        }
      },

      determineRoundWinner: function(userGuess) {

        this.computerGuess = this.getComputerGuess();
        this.userGuess = userGuess;

        // Calculate Winner
        if (this.computerGuess === this.userGuess) 
        {
            this.currentWinner = "TIE";

        } else if (this.computerGuess === "ROCK") {
            
            if (this.userGuess === "PAPER") {
                this.currentWinner = "USER";
            } else {
                this.currentWinner = "COMP";
            }

        } else if (this.computerGuess === "PAPER") {

            if (this.userGuess === "SCISSORS") {
                this.currentWinner = "USER";
            } else {
                this.currentWinner = "COMP";
            }

        } else if (this.computerGuess === "SCISSORS") {

            if (this.userGuess === "ROCK") {
                this.currentWinner = "USER";
            } else {
                this.currentWinner = "COMP";
            }
        } else {
            console.log("Error. No more possible winner combinations.");
        }

        // Record Results
        if (this.currentWinner !== "TIE") {
            this.addToFinalScore(this.currentWinner);
        }
        this.setWinnerMeessage(this.currentWinner);

        // Disable Game Icons
        let icons = document.getElementsByClassName("gameIcon");
        for (let i = 0; i < icons.length; i++) {
            icons[i].setAttribute("disabled", true);
        }        
        
        // Display Results
        if (this.currentGameNumber === this.numberOfGames) {
            this.displayResults();
        } else {
            this.displayResults();
        }        
      },

      getComputerGuess: function() {
        let array = ["ROCK", "PAPER", "SCISSORS"];
        return array[Math.floor((Math.random() * array.length))];
      },

      addToFinalScore: function(winner) {
        if (winner === "COMP") {
            this.computerScore += 1;
        } else {
            this.userScore += 1;
        }
      },

      setWinnerMeessage: function(winner) {
        if (winner === "TIE") {
            this.winnerMessage = "It was a TIE!!! You and the computer both chose " + this.userGuess;
        } else if (winner === "USER") {
            this.winnerMessage = "Congratulations! You are the winner of this round! You chose " + this.userGuess 
            + " , and the computer chose " + this.computerGuess + "!";
        } else {
            this.winnerMessage = "Aw, the computer won this round. The computer chose " + this.computerGuess 
            + " , and you chose " + this.userGuess + ".";
        }
      },

      displayResults: function() {
        this.currentRoundResults = true;

        if (this.currentGameNumber === this.numberOfGames) {
            if (this.numberOfGames !== 1) {
                this.finalResultsButton = true;
            }
        } else if (this.numberOfGames > 1) {
            this.nextRoundButton = true;
        }
      },

      displayFinalResults: function() {
          this.currentRoundResults = false;
          this.finalResults = true;
         
          if (this.computerScore > this.userScore) {
            this.finalResultsMessage = "Oh no! You lost against the computer in Best of " + this.numberOfGames + " Games! Better luck next time!";
          } else if (this.userScore > this.computerScore) {
            this.finalResultsMessage = "Congratulations!!! You won against the computer in Best of " + this.numberOfGames + " Games!";
          } else {
            this.finalResultsMessage = "Its a TIE! You and and the computer have the same score! Great job!";
          }
      },

      resetRound: function() {
        this.computerGuess = '';
        this.userGuess = '';

        this.currentWinner = '';
        this.winnerMessage = '';

        this.nextRoundButton = false;
        this.currentRoundResults = false;
        this.finalResults = '';

        let icons = document.getElementsByClassName("gameIcon");
        for (let i = 0; i < icons.length; i++) {
            icons[i].removeAttribute("disabled");
        } 

        this.currentGameNumber += 1;
      },

      resetGame: function() {
        this.displayInstructions = true;
        this.startGame = false;

        this.numberOfGames = 0;
        this.oneGameHeader = false;
        this.currentGameNumber = 1;
        this.displayCurrentGameNumber = false;

        this.computerGuess = "";
        this.userGuess = "";

        this.userScore = 0;
        this.computerScore = 0;

        this.currentWinner = "";
        this.winnerMessage = "";

        this.nextRoundButton = false;
        this.currentRoundResults = false;
        this.finalResultsButton = false;
        this.finalResults = false;
        this.finalResultsMessage = "";
      },

    }

  });