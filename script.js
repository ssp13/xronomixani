var app = angular.module('plunker', ['infinite-scroll']);

var opts = {
  lines: 13, // The number of lines to draw
  length: 20, // The length of each line
  width: 10, // The line thickness
  radius: 30, // The radius of the inner circle
  corners: 1, // Corner roundness (0..1)
  rotate: 0, // The rotation offset
  direction: 1, // 1: clockwise, -1: counterclockwise
  color: '#D5CBCB', // #rgb or #rrggbb or array of colors
  speed: 1, // Rounds per second
  trail: 60, // Afterglow percentage
  shadow: false, // Whether to render a shadow
  hwaccel: false, // Whether to use hardware acceleration
  className: 'spinner', // The CSS class to assign to the spinner
  zIndex: 2e9, // The z-index (defaults to 2000000000)
  top: '50%', // Top position relative to parent
  left: '50%' // Left position relative to parent
};


jQuery(document).ready(function() {
  var instagram = {
    clientID: '6bcadf7016694ec7a8da9139c7918c8a',
    apiHost: 'https://api.instagram.com'
  };
  
  var min = ""
  var change = false;

  // function bing(year) {
  //   var filter = "&ImageFilters=%27Face%3AFace%27";
  //   var query = encodeURI("αθηνα");
  //   var url = "https://api.datamarket.azure.com/Bing/Search/v1/Image?Query=%27" + query + "%20%0A" + year + "%27";

  //   var target = document.getElementById('foo');
  //   var spinner = new Spinner(opts).spin(target);
  //   $('.megafolio-container').hide();
  //   $.ajax({
  //     type: 'POST',
  //     url: url,
  //     dataType: "json",
  //     headers: {
  //       "Authorization": "Basic OmpKYlNud2FXK2VIcVZnQXhrZzJoMHgyaEp6U0MwOWxqMHFJRG9BbW9jaVE="
  //     }
  //   }).done(function(data) {

  //     putPhotos(data.d.results);
  //     spinner.stop();

  //   });
  // }
  
  bing(2014);

  // function loadInstagram(year) {
  //   var s = {
  //     finishedMsg: 'No more pages to load.',
  //     img: 'http://i.imgur.com/qkKy8.gif'
  //   };
  //   displayOverlay = true;
  //   //Get Data From Instagram
  //   $.ajax({
  //     type: "GET",
  //     url: instagram.apiHost + "/v1/tags/" + year + "/media/recent",
  //     data: {
  //       'client_id': instagram.clientID,
  //       'max_tag_id': min
  //     },
  //     dataType: "jsonp"
  //   })
  //   .done(function(photos) {
  //     //putData(photos.data);
  //     })
  // }

  // var putPhotos = function(photos) {
  //   if (change) {
  //     $('.megafolio-container').html("");
  //   }
  //   for (i = 0; i < photos.length; i++) {
  //     // var img = photos[i].images.low_resolution.url;
  //     var img = photos[i].MediaUrl;
  //     var id = photos[i].id;
  //     $('.megafolio-container').append("<div class='mega-entry' data-src='" + img + "' onclick='goto(\"" + img + "\")'></div>");
  //   }
  //   var api = jQuery('.megafolio-container').megafoliopro({});
  //   api.megaremix([0]);
  //   $('.megafolio-container').show();
  // };

  // $("input[type=range]").on('input', function(e) {
  //   e.preventDefault();
  //   //console.log($(this).val());

  //   $(".year").text($(this).val());
  //   $('#label').val($(this).val());
  //   //loadInstagram($(this).val());
  // });

  // $("input[type=range]").on('click', function(e) {
  //   e.preventDefault();
  //   change = true;
  //   bing($(this).val());
  // });

  // loadInstagram(2014);


});

app.controller('MainCtrl', function($scope, $http) {
  
  $scope.results = [];
  
  $scope.alert = function() {
    console.log("alert");
  };
  
  var query = "αθηνα"+$scope.yearRange;

  
 
  
  function checkImage(src,good,bad){
    var img=new Image();
    img.onload=good;
    img.onerror=bad;
    img.src=src;
    console.log(src);
  }
  
  
  var getResults = function(query) {
    var url = "https://www.googleapis.com/customsearch/v1?key=AIzaSyB3ifuQyPrisdJ16RIRVosG8sk4B3Z3i5A&cx=015179405829568331691:ugbg3igpby0&searchType=image&q=" + query;
    var target = document.getElementById('foo');
    var spinner = new Spinner(opts).spin(target);
    $http({
      method: 'GET',
      url: url
    }).
    success(function(data, status, headers, config) {
      var img;console.log(data);
      var items = [];
          $('.megafolio-container').html("");

      angular.forEach(data.items, function(item) {
        console.log(data);
                  $('.megafolio-container').append("<div class='mega-entry' data-src='" + item.link + "' onclick='goto(\"" + img + "\")'></div>");
                  $('megafolio-container').append("<img src='" + item.link + "'");
                  

        
      });
      //$scope.results = data.items;
      var mega = jQuery('.megafolio-container').megafoliopro({});
      mega.megaremix([1]);
      spinner.stop();
      $('.megafolio-container').show();
    }).error(function(data, status, headers, config) {
      
    });
  };
  
  
  
  var searchEngine="";
  
  
  $scope.$watch('searchOption', function(newValue) {
    if (newValue === "microsoft") {
        searchEngine="google"
    } else if (newValue === "google") {
        searchEngine="google"
       
    }
  });

  $scope.getResults = function() {
    getResults(query);
  };
  
  $scope.$watch('yearRange', function(newValue, oldValue) {
  
   if (newValue != oldValue) {
      query = "αθηνα" + " " + newValue;
      console.log(query);
      var q=encodeURI(query);
      getResults(q);
    }
  });
  
  $scope.bings = [];
  // $http({
  //   method:'POST',
  //   url:"https://api.datamarket.azure.com/Bing/Search/v1/Image?Query=%27athens%27%271950%27",
  //   headers:{ "Authorization": "Basic OmpKYlNud2FXK2VIcVZnQXhrZzJoMHgyaEp6U0MwOWxqMHFJRG9BbW9jaVE="

  //   }
  // }).success(function(data){
  //   console.log(data.d.results);
  //   $scope.bings=data.d.results;
  // })

  function bing(year) {
    var url = "https://api.datamarket.azure.com/Bing/Search/v1/Image?Query=%27athens%27%27" + year + "%27";
    $.ajax({
      type: 'POST',
      url: url,
      dataType: "json",
      headers: {
        "Authorization": "Basic OmpKYlNud2FXK2VIcVZnQXhrZzJoMHgyaEp6U0MwOWxqMHFJRG9BbW9jaVE="
      }
    }).done(function(data) {});
  }
  //  bing(2014);

});