// Once the api loads call enable the search box.

function handleAPILoaded() {
	$('#search-button').attr('disabled', false);
	search();
}

// Search for a given string.

function search() {
	var q = "Anna Kendrick";
	var request = gapi.client.youtube.search.list({
		q: q,
		part: 'snippet'
	});

	request.execute(function(response) {
		var str = response.result;

		for (var i = 0; i < str.items.length; i++) {
			var box = '';
			box += "<li>";
			box += "<img src='"+str.items[i].snippet.thumbnails.default.url+"'>";
			box += "<a class='title_string' target='_blank' href='http://www.youtube.com/watch?v=" + str.items[i].id.videoId + "'>";
			box += str.items[i].snippet.title + "</a>";
			box += "</li>";
			$('.twitter_box').append(box);
		}
		pageUp(str.nextPageToken, q);
	});
}

function pageUp(token, q) {

	var nextPage = gapi.client.youtube.search.list({
		q: q,
		pageToken: token,
		part: 'snippet'
	});
	nextPage.execute(function(response) {
		var str = response.result;

		for (var i = 0; i < str.items.length; i++) {
			var box = '';
			box += "<li>";
			box += "<img src='"+str.items[i].snippet.thumbnails.default.url+"'>";
			box += "<a class='title_string' target='_blank' href='http://www.youtube.com/watch?v=" + str.items[i].id.videoId + "'>";
			box += str.items[i].snippet.title + "</a>";
			box += "</li>";
			$('.twitter_box').append(box);
		}
	});
}