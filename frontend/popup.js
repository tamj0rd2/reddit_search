$(document).ready(function(){
  
  //Declaring a function to be used when the 'invalid form' warning should be removed.
  var removeWarn = function(){
    $('.query_group').removeClass('has-error');
    $('small').hide();    
  };

  $('button').on('click', function(){
    //The user should see a warning if they leave the search query are empty.
    if(!$('#search_query').val()){
      $('.query_group').addClass('has-error');
      $('small').show();
      return false;
    }
    //When the user leaves out the google domain area and the subreddit area empty, 'google.com' should be the 
    else if (!$('#subreddit').val() && !$('#google_domain').val()){
      window.location.href = 'https://www.google.com/#q=site:www.reddit.com ' + $('#search_query').val();        
      removeWarn();       
    }
    else if (!$('#google_domain').val()){
      window.location.href = 'https://www.google.com/#q=site:www.reddit.com%2F' + $('#subreddit').val() + '+' + $('#search_query').val();        
      removeWarn();          
    }
    else if (!$('#subreddit').val()){
      window.location.href = 'https://www.' + $('#google_domain').val() + '/#q=site:www.reddit.com ' + $('#search_query').val();          
      removeWarn();   
    }
    else{
      window.location.href = 'https://www.' + $('#google_domain').val() + '/#q=site:www.reddit.com%2F' + $('#subreddit').val() + '+' + $('#search_query').val();
      removeWarn();        
    }
  });
  
});