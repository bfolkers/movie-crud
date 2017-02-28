$(function() {
  var selectedEditID;
  var selectedEditObject;
  var currentMovies;
  $.get('/movies')
    .then(function (data, status) {
      currentMovies = data;
      for (var i in data) {
        $('.movie-table-entries').append('<tr class="movie-' + data[i].id.toString()
            + '"><td><a href="" class="movie-link">' + data[i].title + '</a></td><td>'
            + data[i].director + '</td><td>' + data[i].year + '</td><td>'
            + data[i]["your rating"] + '</td><td><button id="' +
            + data[i].id.toString() + '-delete" class="delete-button btn btn-default">'
            + 'Delete Movie</button></td><td><button id="' + data[i].id.toString()
            + '-edit" class="edit-button btn btn-default">Edit</button></td></tr>');
      }
    })
    .catch(function (data, status) {
      console.log(status);
    })

  $(document).on('click', '.movie-link', function(event) {
    event.preventDefault();
    var id = $(this).parent().parent().attr('class').slice(6);
    selectedEditID = id;
    selectedEditObject = currentMovies.find(function(element) {
      return (element.id === Number(selectedEditID));
    });
    $('.list-main-pane *').remove();
    $('.list-main-pane').append('<section class="row"><div class="col-lg-4 col-md-4 col-sm-4 col-xs-4"><img class="movie-poster" src="' + selectedEditObject['poster url'] + '" alt="movie-poster"></div><div class="col-lg-8 col-md-8 col-sm-8 col-xs-8"><table class="table table-striped table-hover "><tbody><tr><td>Title</td><td>' + selectedEditObject.title + '</td></tr><tr><td>Director</td><td>' + selectedEditObject.director + '</td></tr><tr><td>Year</td><td>' + selectedEditObject.year + '</td></tr><tr><td>My Rating</td><td>' + selectedEditObject["your rating"] + '</td></tr></tbody></table><a href="list.html" class="btn btn-default">Back</a></div></section>');
    $('.input-title').val(selectedEditObject.title);
    $('.input-director').val(selectedEditObject.director);
    $('.input-year').val(selectedEditObject.year);
    $('.input-rating').val(selectedEditObject['your rating']);
    $('.input-url').val(selectedEditObject['poster url']);
  })

  $('.new-movie-button').on('click', function() {
    $('.list-main-pane *').remove();
    $('.list-main-pane').append('<form class="add-movie-form form-horizontal"><fieldset><legend>Add a Movie</legend><div class="form-group"><label for="inputTitle" class="col-lg-2 col-md-2 col-sm-2 control-label">Title</label><div class="col-lg-4 col-md-4 col-sm-4"><input type="text" class="input-title form-control" id="inputTitle" placeholder="Title"></div></div><div class="form-group"><label for="inputDirector" class="col-lg-2 col-md-2 col-sm-2 control-label">Director</label><div class="col-lg-4 col-md-4 col-sm-4"><input type="text" class="input-director form-control" id="inputDirector" placeholder="Director"></div></div><div class="form-group"><label for="inputYear" class="col-lg-2 col-md-2 col-sm-2 control-label">Year</label><div class="col-lg-2 col-md-2 col-sm-2"><input type="text" class="input-year form-control" id="inputYear" placeholder="Year"></div></div><div class="form-group"><label for="inputRating" class="col-lg-2 col-md-2 col-sm-2 control-label">My Rating</label><div class="col-lg-2 col-md-2 col-sm-2"><input type="text" class="input-rating form-control" id="inputRating" placeholder="My Rating"></div></div><div class="form-group"><label for="inputURL" class="col-lg-2 col-md-2 col-sm-2 control-label">Poster URL</label><div class="col-lg-4 col-md-4 col-sm-4"><input type="text" class="input-url form-control" id="inputURL" placeholder="Poster URL"></div></div><div class="form-group"><div class="col-lg-10 col-md-10 col-sm-10 col-lg-offset-2 col-md-offset-2 col-sm-offset-2"><!-- <button type="reset" class="btn btn-default">Clear</button> --><button class="add-movie-button btn btn-primary">Add Movie</button></div></div></fieldset></form></div></section>');
  })

  $(document).on('click', '.add-movie-button', function(event) {
    event.preventDefault();
    if ($('.input-title').val() === '' ||
        $('.input-director').val() === '' ||
        $('.input-year').val() === '' ||
        $('.input-rating').val() === '' ||
        $('.input-url').val() === '') {
          alert('All fields must have a value');
          return;
        }
    var movie = {};
    movie.title = $('.input-title').val();
    movie.director = $('.input-director').val();
    movie.year = $('.input-year').val();
    movie['your rating'] = $('.input-rating').val();
    movie['poster url'] = $('.input-url').val();

    $.post('/movies', movie)
      .then(function(data, status) {
        location.reload();
      })
      .catch(function(data, status) {
        console.log(status);
      });
  })

  $(document).on('click', '.delete-button', function() {
    var id = $(this).parent().parent().attr('class').slice(6);
    console.log(id);
    deleteURL = '/movies/' + id;
    $(this).parent().parent().remove();
    $.ajax({
      url: deleteURL,
      type: 'DELETE',
      success: function(result) {
        console.log(result);
      }
    })
  })

  $(document).on('click', '.edit-button', function() {
    var id = $(this).parent().parent().attr('class').slice(6);
    selectedEditID = id;
    selectedEditObject = currentMovies.find(function(element) {
      return (element.id === Number(selectedEditID));
    });
    $('.list-main-pane *').remove();
    $('.list-main-pane').append('<section class="row"><div class="col-lg-4 col-md-4 col-sm-4 col-xs-4"><img class="movie-poster" src="' + selectedEditObject['poster url'] + '" alt="movie-poster"></div><div class="col-lg-8 col-md-8 col-sm-8 col-xs-8"><form class="edit-movie-form form-horizontal"><fieldset><legend>Edit a Movie</legend><div class="form-group"><label for="inputTitle" class="col-lg-2 col-md-2 col-sm-2 control-label">Title</label><div class="col-lg-4 col-md-4 col-sm-4"><input type="text" class="input-title form-control" id="inputTitle" placeholder="Title"></div></div><div class="form-group"><label for="inputDirector" class="col-lg-2 col-md-2 col-sm-2 control-label">Director</label><div class="col-lg-4 col-md-4 col-sm-4"><input type="text" class="input-director form-control" id="inputDirector" placeholder="Director"></div></div><div class="form-group"><label for="inputYear" class="col-lg-2 col-md-2 col-sm-2 control-label">Year</label><div class="col-lg-2 col-md-2 col-sm-2"><input type="text" class="input-year form-control" id="inputYear" placeholder="Year"></div></div><div class="form-group"><label for="inputRating" class="col-lg-2 col-md-2 col-sm-2 control-label">My Rating</label><div class="col-lg-2 col-md-2 col-sm-2"><input type="text" class="input-rating form-control" id="inputRating" placeholder="My Rating"></div></div><div class="form-group"><label for="inputURL" class="col-lg-2 col-md-2 col-sm-2 control-label">Poster URL</label><div class="col-lg-4 col-md-4 col-sm-4"><input type="text" class="input-url form-control" id="inputURL" placeholder="Poster URL"></div></div><div class="form-group"><div class="col-lg-10 col-md-10 col-sm-10 col-lg-offset-2 col-md-offset-2 col-sm-offset-2"><!-- <button type="reset" class="btn btn-default">Clear</button> --><button class="edit-movie-button btn btn-primary">Edit Movie</button></div></div></fieldset></form></div></section>');
    $('.input-title').val(selectedEditObject.title);
    $('.input-director').val(selectedEditObject.director);
    $('.input-year').val(selectedEditObject.year);
    $('.input-rating').val(selectedEditObject['your rating']);
    $('.input-url').val(selectedEditObject['poster url']);
  })

  $(document).on('click', '.edit-movie-button', function(event) {
    event.preventDefault();
    if ($('.input-title').val() === '' ||
        $('.input-director').val() === '' ||
        $('.input-year').val() === '' ||
        $('.input-rating').val() === '' ||
        $('.input-url').val() === '') {
          alert('All fields must have a value');
          return;
        }
    var editedMovie = selectedEditObject;
    console.log(selectedEditObject);
    editedMovie.title = $('.input-title').val();
    editedMovie.director = $('.input-director').val();
    editedMovie.year = $('.input-year').val();
    editedMovie['your rating'] = $('.input-rating').val();
    editedMovie['poster url'] = $('.input-url').val();

    $.ajax({
      type: 'PUT',
      url: '/movies/' + selectedEditID + '/edit',
      data: editedMovie
    })
    location.reload();
  })
})
