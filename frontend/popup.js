$(document).ready(function(){
  
  var removeWarn = function(){
    $('#search_query').removeClass('warning');
    $('small').hide();    
  };

  $('button').on('click', function(){
    if(!$('#search_query').val()){
      $('#search_query').addClass('warning');
      $('small').show();
      return false;
    }
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
  })
  
});