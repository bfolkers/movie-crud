$(function() {
  $.get("http://localhost:3000/movies")
    .then(function (data, status) {
      console.log(data)
    })
    .catch(function (data, status) {
      console.log(status);
    })
})
