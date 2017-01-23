function setNews() {
	$('.news_title').html( NEWSAPI_SOURCE );
	$('.technews_title').html( NEWSAPI_TECH_SOURCE );
	setInterval(
		function () {
			$.get( 'https://newsapi.org/v1/articles?source='+NEWSAPI_SOURCE+'&sortBy=top&apiKey='+NEWSAPI_API_KEY, 
				function( data ) {
					let newsContent = '';
					for (var i = 0; i < 3; i++) {
						if(data.articles[i]){
							newsContent += '&#8226; ' + data.articles[i].title.substring(0,60);
							if(data.articles[i].title.length > 60){
								newsContent += '...';
							}
							newsContent += '<br/>';
						}
					}
					$('#news_content').html( newsContent );
				}
			);
			
			$.get( 'https://newsapi.org/v1/articles?source='+NEWSAPI_TECH_SOURCE+'&sortBy=top&apiKey='+NEWSAPI_API_KEY, 
				function( data ) {
					let newsContent = '';
					for (var i = 0; i < 3; i++) {
						if(data.articles[i]){
							newsContent += '&#8226; ' + data.articles[i].title.substring(0,60);
							if(data.articles[i].title.length > 60){
								newsContent += '...';
							}
							newsContent += '<br/>';
						}
					}
					$('#technews_content').html( newsContent );
				}
			);
		}, 10000);
}
 
