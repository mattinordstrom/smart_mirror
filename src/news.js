let NEWSAPI_API_KEY = '';
let NEWSAPI_SOURCE = 'bbc-news'; 
function setNews() {
	setInterval(
		function() { 
			$.get( 'https://newsapi.org/v1/articles?source='+NEWSAPI_SOURCE+'&sortBy=top&apiKey='+NEWSAPI_API_KEY, 
				function( data ) {
					let newsContent = '';
					for (var i = 0; i < 5; i++) {
						newsContent += '* ' + data.articles[i].title + '<br/>';
						
					}
					$('#news_content').html( newsContent );
				}
			);
		}, 10000);
}
 
