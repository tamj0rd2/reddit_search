//file to implement autocomplete functionality

var main= function(){
  console.log("working");
    
  //Adding autocomplete to subreddit search box

  //get the value in the search box
  $("#subreddit").keyup(function() {
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
          //console.log(JSON.stringify(json, "", 4));
          //console.log(json.data.children.length);
          var sub = json.data.children;
          for(var i= 0; i< sub.length; i++){
            if(typeof sub[i] === "object"){
              for(var key in sub[i]){
                if(sub[i].hasOwnProperty(key)){
                  if(key === "data"){
                    for(var k in sub[i][key]){
                      if(k === "display_name"){
                        $("#sub_feed").append("<option value='"+sub[i][key][k]+"'>");
                        //console.log("\n"+"<option value='"+sub[i][key][k]+"'>"+"\n");
                      }
                    }
                  }
                }
              }
            }
          }

          //not working 
          var sub_feed_style= {
                                "background" : "white",
                                "padding" : "2px",
                                "color" : "#333"
                              };
          $("#subreddit option").css(sub_feed_style);
        }  
      });
    }
    else {
      $("#sub_feed").empty();
    }
  });
};

$(document).ready(main);
