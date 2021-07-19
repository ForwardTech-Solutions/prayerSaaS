  /**
  * returns true if there is a bad word in the string
  *
  * @function checkForBadWords
  * @param {string} text  - string to validate
  * @return {boolean} - true if there is a bad word
  */
  export function checkForBadWords(text) {

    //check email for bad words
    var badStrings = [  "fuck",
                      "fucking",
                      "fucked",
                      "shit",
                      "shitty",
                      "shitting",
                      "fag",
                      "nigger",
                      "nigga",
                      "piss",
                      "pissed",
                      "pussy",
                      //"porn",
                      "dick",
                      "dicked",
                      "penis",
                      "vagina",
                      "cunt",
                      "slut",
                      "slutty",
                      "whore",
                      "bitch",
                      "bitches",
                      "dumbass",
                      //"idiot",
                      "bastard",
                      "douche",
                      //"suck",
                      "faggot",
                    ];

    
      var badWords = [
        "ass",
        "cum",
        "cumming",
        "cock",
      ]





    //check if the text contains any of the bad strings
    for (var i = 0; i < badStrings.length; i++) {
      if (text.indexOf(badStrings[i]) > -1) {
        return true
      }
    }

    //check if the text contains any of the bad words as whole words
    for (var i = 0; i < badWords.length; i++) {
      if (text.indexOf(" " + badStrings[i] + " ") > -1) {
        return true
      }
    }
  




    return false
    
  }