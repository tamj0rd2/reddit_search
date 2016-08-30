//file to implement autocomplete functionality

var main= function(){
    
  //Adding autocomplete to subreddit search box

  //get the value in the search box
  $("#subreddit").keyup(function() {

    //continuously get the value in the search field
    var val = $("input#subreddit").val();
    
    //search only if the length of val in the input box is 4 or greater
    if(val.length > 3){
      $.ajax({
        url: "https://www.reddit.com/search.json?q="+val+"&type=sr",
        dataType: "json",
        type: "GET",
        complete: function(){
          console.log("complete function being executed");
        },
        error: function(){
          console.log("error fetching data");
        },
        success: function(json){
          
          //sub contains an array of objects from which we can get subreddit names
          var sub = json.data.children;
          for(var i= 0; i< sub.length; i++){
            if(typeof sub[i] === "object"){
              for(var key in sub[i]){
                if(sub[i].hasOwnProperty(key)){
                  if(key === "data"){
                    for(var k in sub[i][key]){

                      //searches for the key display_name
                      if(k === "display_name"){

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
