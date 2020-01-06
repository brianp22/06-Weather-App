$(document).ready(function () {

    var apiKey = "e378b03ce903b1e79e273ad6019d8a90";
    var citiesArray = [];
    $("#citySearchButton").on("click", function (event) {
        var searchValue = $("#searchInput").val().trim();
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + searchValue +
            "&units=imperial&appid=" + apiKey;
        event.preventDefault();
        $("#searchHistory").empty();
        var city = $("#searchInput").val().trim();
        citiesArray.push(city);

        for (var i = 0; i < citiesArray.length; i++) {
            var b = $("<button>");
            b.addClass("city-name-btn");
            b.attr("data-name", citiesArray[i]);
            b.text(citiesArray[i]);
            $("#searchHistory").append(b);
    }

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
                console.log(queryURL);
                console.log(response);
                $(".city").html("<h1>" + response.name + "</h1>");
                $(".temperature").html("<h3>" + "Temperature: " + response.main.temp + "</h3>");
                $(".windspeed").html("<h3>" + "Wind Speed: " + response.wind.speed + "</h3>");

                var cityLat = response.coord.lat;
                var cityLon = response.coord.lon;

                $.ajax({
                    url: "http://api.openweathermap.org/data/2.5/uvi?appid=" + apiKey + "&lat=" + cityLat + "&lon=" + cityLon,
                    method: "GET"
                }).then(function (response) {
                    $(".uvindex").html("<h3>" + "UV Index: " + response.value + "</h3>");

                });
            });
    });

    function runPreviousSearch() {
        var searchValue = $(this).attr("data-name");

        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + searchValue +
            "&units=imperial&appid=" + apiKey;
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            $(".city").html("<h1>" + response.name + "</h1>");
            $(".temperature").html("<h3>" + "Temperature: " + response.main.temp + "</h3>");
            $(".windspeed").html("<h3>" + "Wind Speed: " + response.wind.speed + "</h3>");

            var latitude = response.coord.lat;
            var longitude = response.coord.lon;

            $.ajax({
                url: "http://api.openweathermap.org/data/2.5/uvi?appid=" + apiKey + "&lat=" + latitude + "&lon=" + longtitude,
                method: "GET"
            }).then(function (response) {
                $(".uvindex").html("<h3>" + "UV Index: " + response.value + "</h3>");

            });
        })
    }

    $(document).on("click", ".city-name-btn", runPreviousSearch);
});