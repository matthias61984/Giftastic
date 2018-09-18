$(document).ready(function() {
// Set array that contains button values for initial buttons
    var initialShows = [
        "The Simpsons",
        "Futurama",
        "Thundercats",
        "Teenage Mutant Ninja Turtles",
        "Care Bears",
        "He-Man",
        "Animaniacs",
        "Power Rangers",
        "Duck Tales",
        "Darkwing Duck",
        "Captain Planet"
    ]
// Function to create new button
    function createButton(name) {
        var newBtn = $("<button>").text(name).addClass("btn btn-primary queryButton");
        $(newBtn).attr("data-show", name);
        $("#buttonDiv").append(newBtn);
    };
// Function to build initial buttons from initialShows array
    function buildInitialShows() {
        for (i = 0; i < initialShows.length; i++) {
            createButton(initialShows[i]);
        }
    }
    buildInitialShows();
// On click function that adds the form text value to new variable, then passes it to the createButton function
    $("#addButton").on('click', function(event) {
        event.preventDefault();
        var newInput = $("input").val();
        createButton(newInput);
        $("input").val("");
    });

    $(".queryButton").on("click", function() {
        var show = $(this).attr("data-show");
        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=P1YYLMXHak2pgn81RtohWxOssvjOmw0m&q=" + show + "&limit=10&offset=0&rating=G&lang=en"
        $.ajax({
            url: queryURL,
            method: "GET"
        })
        .then(function(response) {
            var results = response.data;
            console.log(results);
            for (var i = 0; i < results.length; i++) {
                var gifDiv = $("<div class='gif'>");
                var rating = results[i].rating;
                var p = $("<p>").text("Rating: " + rating);
                var gifImage = $("<img>");
                gifImage.attr("src", results[i].images.downsized_still.url);;
                gifDiv.prepend(gifImage);
                gifDiv.prepend(p);
                $("#gifArea").prepend(gifDiv);
            }
        });
    });
});