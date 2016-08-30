$(document).ready(function(){
  var removeWarn = function(){
    $('#search_query').removeClass('warning');
    $('small').hide();
  };
  $('a').on('click', function(){
    if(!$('#search_query').val()){
      $('#search_query').addClass('warning');
      $('small').fadeIn(100);
      return false;
    }
    else if (!$('#subreddit').val() && !$('#google_domain').val()){
      $('#searchButton').attr('href', 'https://www.google.com/#q=site:www.reddit.com ' + $('#search_query').val());
      removeWarn();
    }
    else if (!$('#google_domain').val()){
      $('#searchButton').attr('href', 'https://www.google.com/#q=site:www.reddit.com%2F' + $('#subreddit').val() + '+' + $('#search_query').val());
      removeWarn();
    }
    else if (!$('#subreddit').val()){
      $('#searchButton').attr('href', 'https://www.' + $('#google_domain').val() + '/#q=site:www.reddit.com ' + $('#search_query').val());
      removeWarn();
    }
    else{
      $('#searchButton').attr('href', 'https://www.' + $('#google_domain').val() + '/#q=site:www.reddit.com%2F' + $('#subreddit').val() + '+' + $('#search_query').val());
      removeWarn();
    }
  });
});
