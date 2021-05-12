//Timeline:
//  Choose experimental file (or pull name from URL, ?task='xx')
//  Load experimental sequence
//  Iterate through trials in experimental sequence
//  Write diagnostic data to unique file

//Load the experimental file based on the URLSearchParams,
//Gate progress against finding a valid file name

//This GET request will work locally only if you are running a local web
//server to handle the request, JS by default doesn't let you get local files
//as that could be a major security issue.
function myKeyFilter() {
    //to prevent subjects from editing their response
    var e = event || window.event; // get event object
    var key = e.keyCode || e.which; // get key cross-browser

    if (key == 8 || key == 39 || key == 37) {
        //if it is not a number ascii code
        //Prevent default action, which is inserting character
        if (e.preventDefault) e.preventDefault(); //normal browsers
        e.returnValue = false; //IE
    }
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i
        [array[i], array[j]] = [array[j], array[i]];
    }
}
var sequence = [
    "Realtor",
    "Trailer",
    "Tiresome",
    "Miracle",
    "Conscience",
    "Bouquet",
    "Carriage",
    "Predominantly",
    "Accommodation",
    "Immortalize",
    "Necessitate",
    "Cupboard",
    "Peculiar",
    "Faucet",
    "Analysis",
];
shuffle(sequence);
//Go through the file sequence and add an audio-keyboard-response object for each file
var experimentTimeline = [];
var urlvar = jsPsych.data.urlVariables();
var getIdTrial = {
    type: "survey-text",
    questions: [{
        prompt: "Enter the ID you have been given.",
        placeholder: urlvar.subjectID,
    }, ],
    preamble: "",
    button_label: "Click to enter ID",
};
experimentTimeline = experimentTimeline.concat(getIdTrial);

var instructionScreen = {
    type: "instructions",
    pages: [
        "Listen to each word and do your best to type what you heard. You can't change what you type so be careful",
    ],
    show_clickable_nav: true,
};

experimentTimeline = experimentTimeline.concat(instructionScreen);

var trialIndex = 0;
for (trialIndex = 0; trialIndex < sequence.length; trialIndex++) {
    var soundTrial = {
        type: "audio-keyboard-response",
        stimulus: "Sp_" + sequence[trialIndex].toLowerCase() + ".wav",
        autoplay: true,
        choices: [],
        trial_ends_after_audio: true,
        response_allowed_while_playing: true,
    };
    experimentTimeline = experimentTimeline.concat(soundTrial);
    var form_trial = {
        type: "survey-html-form",
        preamble: "<p> Please spell the word you just heard </p>",
        html: '<p> I heard: <input id="word-response-box" name="word" type="text" spellcheck="false" autocomplete="off" onKeyDown="myKeyFilter()" /></p>',
        autofocus: "word-response-box",
    };
    experimentTimeline = experimentTimeline.concat(form_trial);
}

var sequenceFinishedText = {
    type: "html-keyboard-response",
    stimulus: "Thanks for participating! Hit any key to finish.",
};

experimentTimeline = experimentTimeline.concat(sequenceFinishedText);

jsPsych.init({
    timeline: experimentTimeline,
    preload: sequence,
    on_finish: function() {
        window.close();
    },
});