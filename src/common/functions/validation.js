  /**
  * returns true if there is a bad word in the string
  *
  * @function checkForBadWords
  * @param {string} text  - string to validate
  * @return {boolean} - true if there is a bad word
  */
  export function checkForBadWords(text) {

    //check email for bad words
    var badWords = [  "fuck",
                      "shit",
                      "ass",
                      "fag",
                      "nigger",
                      "nigga",
                      "piss",
                      "pussy",
                      "porn",
                      "cum",
                      "dick",
                      "penis",
                      "vagina",
                      "cunt",
                      "slut",
                      "whore",
                      "bitch",
                      "dumbass",
                      "idiot",
                      "bastard",
                      "douche",
                      "suck",
                      "faggot"
                    ];



      //check if the text contains any of the bad words
    for (var i = 0; i < badWords.length; i++) {
      if (text.indexOf(badWords[i]) > -1) {
        return true
      }
    }
    return false
    
  }