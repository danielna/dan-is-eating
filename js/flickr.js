// 1. Call the flickr API 
// 2. Parse results from JSON into HTML elements
// 3. Run masonry over HTML to generate pinterest-style layout

var _KEY = "1684af1009448d6b66290bd7dedac4e3";
var _USERID = "80451209@N04";
var _APIURL = "https://secure.flickr.com/services/rest/?method=flickr.people.getPublicPhotos";

$.getJSON(_APIURL, 
	{
		format: "json",
		nojsoncallback: 1,
		api_key: _KEY,
		user_id: _USERID,
		extras: "description, tags"
	}, function(data) {
		var photos = data.photos;
		var tags = [];

        $.each(data.photos.photo, function() {
        	// Parse out various HTML components
        	var img_url = "http://www.flickr.com/photos/daniseating/" + this.id + "/in/photostream";
        	var img_src = "http://farm" + this.farm + ".static.flickr.com/" + this.server + "/" + this.id + "_" + this.secret + "_" + "m.jpg";
        	var imgtag = $("<img/>").attr({
        		"src": img_src,
        		"title": this.description._content
        	});

        	imgtag = $("<a>").attr({"href":img_url, "target":"_blank", "title":"View this photo on flickr"}).append(imgtag);

        	var label = $("<span>").attr({"class":"label"}).append(this.title);
        	if (jQuery.inArray(this.tags, tags) == -1 && this.tags != "")
        	{
        		tags.push(this.tags);
        	}

        	$("<div>").attr({"class":"item " + this.tags}).append(label).append("<br/>").append(imgtag).appendTo("#container");
			});

		// Build up the list of tags for filtering
    for(var i =0; i<tags.length; i++){
    	$("ul#taglist").append("<li><a href='#' id=" +  tags[i] + ">" + tags[i] + "</a>");
    }     

    // Run Masonry
    $("#container").imagesLoaded( function() { 
        $('#container').masonry({
	    	itemSelector : '.item',
	    	isAnimated: true,
		  	animationOptions: {
		    	duration: 750,
		    	easing: 'linear',
		    	queue: false
			}	
		});
    });
});
