// https://stackoverflow.com/a/950146
// survey-html-form
// audio-keyboard-response
// html-keyboard-response
// instructions
function loadScript(url, callback) {
    // Adding the script tag to the head as suggested before
    var head = document.head;
    var script = document.createElement("script");
    script.type = "module";
    script.src = url;

    // Then bind the event to the callback function.
    // There are several events for cross browser compatibility.

    script.onreadystatechange = callback;
    //script.onload = callback;

    // Fire the loading
    head.appendChild(script);
}
loadScript(
    "https://cdn.jsdelivr.net/gh/denisfitz57/HopeSpellingTask@main/SpellingTask.js",
    function() {
        console.log("Here!");
    }
);