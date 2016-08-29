$(document).ready(function(){
    
  var removeWarn = function(){
    $('.query_group').removeClass('has-error');
    $('small').hide();    
  };

  $('button').on('click', function(){
    if(!$('#search_query').val()){
      $('.query_group').addClass('has-error');
      $('small').show();
      return false;
    }
    else if (!$('#subreddit').val()){
      window.location.href = 'https://www.google.com' + '/#q=site:www.reddit.com ' + $('#search_query').val();          
      removeWarn();   
    }
    else{
      window.location.href = 'https://www.google.com' + '/#q=site:www.reddit.com%2F' + $('#subreddit').val() + '+' + $('#search_query').val();
      removeWarn();        
    }
  });
  
});