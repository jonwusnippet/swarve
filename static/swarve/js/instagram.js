$(document).ready(function() {
	var topic = "annakendrick";
	var url = "https://api.instagram.com/v1/tags/" + topic + "/media/recent?client_id=62fbb70832aa448b9adfd13dd3d06b7d";
	setInstaData(url);

});

function setInstaData(url) {
	$.ajax({
		url: url,
		dataType: 'jsonp',

		complete: function(xhr, textStatus) {
			//called when complete
		},
		success: function(response, textStatus, xhr) {
			for(var i =0; i < response.data.length; i++){
				var box = '';
				box += "<li>";
				box += "<a href='"+response.data[i].link+"'><img src='"+response.data[i].images.standard_resolution.url+"'></a>";
				box += "<a class='title_string' target='_blank' href='"+response.data[i].link+"'>";
				box += response.data[i].caption.text + "</a>";
				box += "</li>";
				$('.blog_box').append(box);
			}
		},
		error: function(xhr, textStatus, errorThrown) {
			//called when there is an error
		}
	});
}