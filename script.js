$(document).ready(function() {
    var animals = [
        "dog", "cat", "rabbit", "hamster", "skunk", "goldfish",
        "bird", "ferret", "turtle", "sugar glider", "chinchilla",
        "hedgehog", "hermit crab", "gerbil", "pygmy goat", "chicken",
        "capybara", "teacup pig", "serval", "salamander", "frog"
      ];

    function populateButtons(array){
        array.forEach(element => {
            var a = $('<button>');
            a.addClass('animal-button');
            a.attr('data-type',element);
            a.text(element);
            $('#animal-buttons').append(a);
        });
    }

    $('#animal-buttons').on('click','.animal-button',function(){
        $('#animals').empty();
        var type = $(this).attr('data-type');
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + type + "&api_key=z6UQGplSPG9YPj1j8UCqJYcQSa5A9MNN&limit=10";
        $.ajax({
            url: queryURL,
            method: 'GET',
        })
        .then(function(response){
            response.data.forEach(gif => {
                var animalDiv = $(`<div class='animal-item'> `);
                var rating = gif.rating;
                var p = $('<p>').text('Rating: ' + rating);
                var animated = gif.images.fixed_height.url;
                var still = gif.images.fixed_height_still.url;
                var animalImage = $('<img>')
                animalImage.attr('src', still);
                animalImage.attr('data-still', still);
                animalImage.attr('data-animated', animated);
                animalImage.attr('data-state', 'still');
                animalImage.addClass('animal-image');
                animalDiv.append(p);
                animalDiv.append(animalImage);
                $('#animals').append(animalDiv);
            });
        });
    });

    $('#animals').on('click', '.animal-image', function(){
        var state = $(this).attr('data-state');
        if (state == 'still'){
            $(this).attr('src', $(this).attr('data-animated'));
            $(this).attr('data-state','animated')
        }else{
            $(this).attr('src', $(this).attr('data-still'));
            $(this).attr('data-state','still')
        }
    });

    $('#add-animal').on('click', function(e){
        e.preventDefault();
        var  newItem = $('input').val();
        //animals.push(newItem);
        var a = $('<button>');
        a.addClass('animal-button');
        a.attr('data-type',newItem);
        a.text(newItem);
        $('#animal-buttons').append(a);
    });

    populateButtons(animals);
    
});
