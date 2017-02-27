$(function() {
  var currentMovies;
  $.get('/movies')
    .then(function(data, status) {
      currentMovies = data;
    })
    .catch(function (data, status) {
      console.log(status);
    });

  $('.add-movie-button').on('click', function(event) {
    event.preventDefault();
    var movie = {};
    movie.id = currentMovies.length + 1;
    movie.title = $('.input-title').val();
    movie.director = $('.input-director').val();
    movie.year = $('.input-year').val();
    movie['your rating'] = $('.input-rating').val();
    movie['poster url'] = $('.input-url').val();

    $.post('/movies', movie)
      .then(function(data, status) {
        console.log(data);
      })
      .catch(function(data, status) {
        console.log(status);
      });

    window.location.href = 'list.html';
  })
})
