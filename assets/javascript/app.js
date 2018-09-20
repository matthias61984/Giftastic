$(document).ready(function() {
// Set array that contains button values for initial buttons
    var initialShows = [
        "The Simpsons",
        "Futurama",
        "Teenage Mutant Ninja Turtles",
        "Care Bears",
        "Animaniacs",
        "Power Rangers",
        "Duck Tales",
        "Darkwing Duck",
        "Captain Planet"
    ]
// Function creates new button with parameter name
    function createButton(name) {
    // create new button tag, giving it bootstrap classes and a class we will use for our on-click
        var newBtn = $("<button>").text(name).addClass("btn btn-primary queryButton");
    // Set data value equal to name to store the search value, including spaces
        $(newBtn).attr("data-show", name);
    // Append button to buttonDiv
        $("#buttonDiv").append(newBtn);
    };
// Function to build initial buttons from initialShows array
    function buildInitialShows() {
        for (i = 0; i < initialShows.length; i++) {
            createButton(initialShows[i]);
        }
    }
// Call function to build initial shows on page load
    buildInitialShows();
// On click function to build new buttons from form text field
    $("#addButton").on('click', function(event) {
    // Prevent page reload on form entry
        event.preventDefault();
    // Set form value to variable
        var newInput = $("input").val();
    // Pass value to createButton()
        createButton(newInput);
    // Reset form text field value to empty
        $("input").val("");
    });
// On click fuunction to produce gifs from ajax call
    $(document).on("click", ".queryButton", function() {
    // Retrieve show's name from the data value stored in the buttons and save as variable
        var show = $(this).attr("data-show");
    // Set api qurey url, including my key and search parameters
        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=P1YYLMXHak2pgn81RtohWxOssvjOmw0m&q=" + show + "&limit=10&offset=0&rating=G&lang=en"
    // Call ajax and specify method
        $.ajax({
            url: queryURL,
            method: "GET"
        })
    // Upon response, run function
        .then(function(response) {
        // Store response array in a variable for easy notation
            var results = response.data;
        // For each of the ten responses...
            for (var i = 0; i < results.length; i++) {
            // Create a new div with class for later use
                var gifDiv = $("<div class='gif'>");
            // Set data values for both play and paused gifs, for later use
                gifDiv.attr("data-play", results[i].images.downsized.url);
                gifDiv.attr("data-pause", results[i].images.downsized_still.url);
            // Set rating equal to variable
                var rating = results[i].rating;
            // Create new p tag and add rating into text
                var p = $("<p>").text("Rating: " + rating);
            // Create new image tag
                var gifImage = $("<img>");
            // Set img tag src equal to the still gif image
                gifImage.attr("src", results[i].images.downsized_still.url);
            // Prepend gif to new div
                gifDiv.prepend(gifImage);
            // Prepend p to new div
                gifDiv.prepend(p);
            // Prepend the whole new div to gifArea
                $("#gifArea").prepend(gifDiv);
            }
        });
    });
// On click function that toggles between srcs for each gif 
    $(document).on("click", ".gif", function() {
    // Retrieve both stored data values of the clicked gif and set into variables
        var play = $(this).attr("data-play");
        var pause = $(this).attr("data-pause");
    // If the gif's src is the still image...
        if ($(this).children("img").attr("src") == pause) {
        // ...replace it with the active gif src...
            $(this).children("img").attr("src", play); 
        } else {
        // ...otherwise, replace it with the still gif src
            $(this).children("img").attr("src", pause);
        }
    });
});