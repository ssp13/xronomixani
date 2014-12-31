/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


  $(document).ready(function() {




    loadInstagram(2010);
    $(".container-fluid").scrollPagination({

      nop: 10, // The number of posts per scroll to be loaded
      offset: 0, // Initial offset, begins at 0 in this case
      error: 'No More Posts!', // When the user reaches the end this is the message that is
      // displayed. You can change this if you want.
      delay: 500, // When you scroll down the posts will load after a delayed amount of time.
      // This is mainly for usability concerns. You can alter this as you see fit
      scroll: true // The main bit, if set to false posts will not load as the user scrolls. 
      // but will still load if the user clicks.


    });

  });
  
  
  
  var instagram = {
    clientID: '6bcadf7016694ec7a8da9139c7918c8a',
    apiHost: 'https://api.instagram.com'
  };


  var min = ""
  var change = false;

  function loadInstagram(year) {
    console.log(year);
    //Get Data From Instagram
    $.ajax({
      type: "GET",
      url: instagram.apiHost + "/v1/tags/" + year + "/media/recent",
      data: {
        'client_id': instagram.clientID,
        'max_tag_id': min
      },
      dataType: "jsonp"

    }).done(function(photos) {
        console.log(photos);
        if (change)
          $('#feed').html("");
        for (i = 0; i < photos.data.length; i++) {

          var img = photos.data[i].images.low_resolution.url;

          var id = photos.data[i].id;

          $('#feed').append("<div class='post col-sm-6 col-md-3 col-lg-3'>" +
            "<div class='post_img'><a href='#'><div class='likebox'><span class='glyphicon glyphicon-heart'></span>" +
            " </div></a><img class='img-responsive' src='" + img + "' style='width:" + 1000 * Math.random(i) + "'px'></div" +
            ' <div class="media" id="details"><div class="row">' +
            '<div class="pic col-xs-3">' +
            '<a href="#" class="pull-left">' +
            '<img src="http://southparkstudios.mtvnimages.com/avatar/forum_expression/happy/695629.png" class="img-circle-details" alt="Sample Image">' +
            '  </a></div><div class="col-xs-9"><blockquote>' +
            '<p>Title goes here</p>' +
            '<footer>by Someone famous </footer>' +
            '  </blockquote>' +
            '</div></div></div></div>'
          );

        }


        $container = $('#iso');

        // Fire Isotope only when images are loaded
        $container.imagesLoaded(function() {
          $container.isotope({
            itemSelector: '.post',
            masonry: {
              isFitWidth: true,
              gutter: 20
            }
          });
        });


    })
}