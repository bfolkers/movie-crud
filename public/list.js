$(function() {
  $.get('/movies')
    .then(function (data, status) {
      console.log(data)
    })
    .catch(function (data, status) {
      console.log(status);
    })
})
