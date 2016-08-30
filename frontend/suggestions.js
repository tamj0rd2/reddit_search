/*jslint browser: true indent:2 maxlen: 80*/
/*global $, jQuery, alert, console*/

//implement autocomplete functionality

var main = function() {
  'use strict';

  //get the value in the search box
  $("#subreddit").keyup(function() {

    $("#sub_feed").empty();

    //continuously get the value in the search field
    var val = $("input#subreddit").val();

    //search only if the length of val in the input box is 4 or greater

    if (val.length > 2) {

      $.ajax( {
        url: "https://www.reddit.com/search.json?q="+val+"&type=sr",
        dataType: "json",
        type: "GET",
        success: function(json) {

          //sub contains an array of objects. get subreddit names

          var sub = json.data.children;
          for (var i = 0; i < sub.length; i++) {

            //the array is wrapped in an object. So searching for all objects

            if (typeof sub[i] === "object") {
              for (var key in sub[i]) {
                if (sub[i].hasOwnProperty(key)) {
                  if (key === "data") {
                    for (var k in sub[i][key]) {

                      //searches for the key display_name

                      if (k === "display_name") {

                        //append the datalist element with the various suggestions
                        $("#sub_feed").append("<option value='"+sub[i][key][k]+"'>");
                      }
                    }
                  }
                }
              }
            }
          }
        }
      });
    }
    else {

      //if suggestions are less than 4 at any time do not display any suggestions
      $("#sub_feed").empty();
    }
  });
};

$(document).ready(main);
