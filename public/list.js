$(function() {
  var selectedEditID;
  var selectedEditObject;
  var currentMovies;
  $.get('/movies')
    .then(function (data, status) {
      currentMovies = data;
      for (var i in data) {
        $('.movie-table-entries').append('<tr class="movie-' + data[i].id.toString()
            + '"><td>' + data[i].title + '</td><td>'
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
    console.log(selectedEditObject);
    $('.list-main-pane *').remove();
    $('.list-main-pane').append('<section class="row"><div class="col-lg-4 col-md-4 col-sm-4 col-xs-4"><img class="movie-poster" src="' + selectedEditObject['poster url'] + '" alt="movie-poster"></div><div class="col-lg-8 col-md-8 col-sm-8 col-xs-8"><form class="edit-movie-form form-horizontal"><fieldset><legend>Edit a Movie</legend><div class="form-group"><label for="inputTitle" class="col-lg-2 col-md-2 col-sm-2 control-label">Title</label><div class="col-lg-4 col-md-4 col-sm-4"><input type="text" class="input-title form-control" id="inputTitle" placeholder="Title"></div></div><div class="form-group"><label for="inputDirector" class="col-lg-2 col-md-2 col-sm-2 control-label">Director</label><div class="col-lg-4 col-md-4 col-sm-4"><input type="text" class="input-director form-control" id="inputDirector" placeholder="Director"></div></div><div class="form-group"><label for="inputYear" class="col-lg-2 col-md-2 col-sm-2 control-label">Year</label><div class="col-lg-2 col-md-2 col-sm-2"><input type="text" class="input-year form-control" id="inputYear" placeholder="Year"></div></div><div class="form-group"><label for="inputRating" class="col-lg-2 col-md-2 col-sm-2 control-label">My Rating</label><div class="col-lg-2 col-md-2 col-sm-2"><input type="text" class="input-rating form-control" id="inputRating" placeholder="My Rating"></div></div><div class="form-group"><label for="inputURL" class="col-lg-2 col-md-2 col-sm-2 control-label">Poster URL</label><div class="col-lg-4 col-md-4 col-sm-4"><input type="text" class="input-url form-control" id="inputURL" placeholder="Poster URL"></div></div><div class="form-group"><div class="col-lg-10 col-md-10 col-sm-10 col-lg-offset-2 col-md-offset-2 col-sm-offset-2"><!-- <button type="reset" class="btn btn-default">Clear</button> --><button class="edit-movie-button btn btn-primary">Edit Movie</button></div></div></fieldset></form></div></section>');
    $('.input-title').val(selectedEditObject.title);
    $('.input-director').val(selectedEditObject.director);
    $('.input-year').val(selectedEditObject.year);
    $('.input-rating').val(selectedEditObject['your rating']);
    $('.input-url').val(selectedEditObject['poster url']);
  })

  $(document).on('click', '.edit-movie-button', function() {
    var editedMovie = selectedEditObject;
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
  })
})
