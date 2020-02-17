  var playing = false;
  var score;
  var action;
  var timeremaining;
  var correctAnswer;

  document.getElementById("startReset").onclick = function () {
      if (playing == true) {
          location.reload();
      } else {
          playing = true;
          // if  not playing ......
          // set the score to zero
          score = 0;
          document.getElementById("score_value").innerHTML = score;
          // show the item remaining box
          show("timeremaining");

          timeremaining = 60;
          document.getElementById("timeremainingvalue").innerHTML = timeremaining;

          // change the start game --> Reset Game
          document.getElementById("startReset").innerHTML = "Reset Game";

          // start Countdown
          countDown();
          // generate questions and answers
          generateQA();
      }
  }

  for (j = 1; j < 5; j++) {
      document.getElementById("box" + j).onclick = function () {
          // check for play or not
          if (playing == true) {
              if (this.innerHTML == correctAnswer) {
                  score = score + 1;
                  document.getElementById("score_value").innerHTML = score;
                  hide("wrong");
                  show("correct");
                  setTimeout(function () {
                      hide("correct");
                  }, 1000);

                  generateQA();

              } else {
                  hide("correct");
                  show("wrong");
                  setTimeout(function () {
                      hide("wrong");
                  }, 1000);

              }
          } else {

          }
      }

  }

  // ******-----> FUNCTIONS <------ *****

  // start counter
  function countDown() {
      action = setInterval(function () {
          timeremaining = timeremaining - 1;
          document.getElementById("timeremainingvalue").innerHTML = timeremaining;
          document.getElementById("timeremainingvalue").style.color = "red";
          if (timeremaining == 0) {
              stopCountDown();
              show("gameover");
              document.getElementById("gameover").innerHTML = "<div>Game over!!</div><div>Your score is <span class='colorme'>" + score + "</span></div>"
              hide("timeremaining");
              hide("correct");
              hide("wrong");
              document.getElementById("startReset").innerHTML = "Start Game";
          }
      }, 1000);
  }

  //stop counter
  function stopCountDown() {
      clearInterval(action);
  }

  // set display
  function show(Id) {
      document.getElementById(Id).style.display = "block";
  }
  // hide displays
  function hide(Id) {
      document.getElementById(Id).style.display = "none";
  }

  // get questions and answers
  function generateQA() {
      var x = 1 + Math.round(9 * Math.random());
      var y = 1 + Math.round(9 * Math.random());
      correctAnswer = x * y;

      document.getElementById("question").innerHTML =
          x + " X " + y;

      var correctPosition = 1 + Math.round(3 * Math.random());
      var id = "box" + correctPosition;
      document.getElementById(id).innerHTML = correctAnswer;

      // arrays to check correct answers
      var answers = [correctAnswer];

      for (i = 1; i < 5; i++) {
          if (i !== correctPosition) {
              var wrongAnswer
              do {
                  wrongAnswer = (1 + Math.round(9 * Math.random())) * (1 + Math.round(9 * Math.random()));
              } while (answers.indexOf(wrongAnswer) > -1)

              document.getElementById("box" + i).innerHTML = wrongAnswer;

              answers.push(wrongAnswer);
          }
      }
  }

  document.getElementById("close").onclick = function () {
      hide("gameover");
  }
