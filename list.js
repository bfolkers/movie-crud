$(function() {
  $.get('http://localhost:3000/movies')
    .then(function(data, status) {
      console.log(data);
    })
  // $.get("/movies")
  //   .then(function (data) {
  //     console.log(data)
  //   })

})
