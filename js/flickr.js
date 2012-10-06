    // 1. Call the flickr API 
    // 2. Parse results from JSON into HTML elements
    // 3. Run isotope over HTML to generate pinterest-style layout

    var flickr = {};

    // Should probably remove these, but... whatever.
    flickr.ajaxParams = {
        key: "1684af1009448d6b66290bd7dedac4e3",
        user_id: "80451209@N04",
        api_url: "https://secure.flickr.com/services/rest/?method=flickr.people.getPublicPhotos"
    };

    // Render the image template using handlebars.js
    flickr.imageBox = function(photo) {
        this.url = "http://www.flickr.com/photos/daniseating/" + photo.id + "/in/photostream";
        this.src = "http://farm" + photo.farm + ".static.flickr.com/" + photo.server + "/" + photo.id + "_" + photo.secret + "_" + "m.jpg";
        this.title = photo.title;
        this.description = photo.description._content;
        this.tags = photo.tags;

        var image_template =
            '<div class="item {{tags}}">' +
                '<img src="{{{src}}}" title="{{title}}}" />' +
                '<p class="label">' +
                    '<span>{{{title}}}</span>' +
                '</p>' +
                '<div class="metadata">' +
                    '<p>{{{description}}}</p>' +
                    '<a class="goFlickr" href="{{url}}" target="_blank" title="View this photo on flickr">' +
                        'flickr!' +
                    '</a>' +
                '</div>' +
            '</div>';

        this.build = function() {
            var renderBox = Handlebars.compile(image_template);
            return renderBox(this);
        };
    };

    $.getJSON(flickr.ajaxParams.api_url, 
    {
        format: "json",
        nojsoncallback: 1,
        api_key: flickr.ajaxParams.key,
        user_id: flickr.ajaxParams.user_id,
        extras: "description, tags"
	}, function(data) {
            
        var tags = [];

        $.each(data.photos.photo, function() {
            var markup = new flickr.imageBox(this).build();
            $("#container").append(markup);

            if (jQuery.inArray(this.tags, tags) == -1 && this.tags !== "") {
                tags.push(this.tags);
            }     
        });

        // Build up the list of tags for filtering
        for(var i =0; i < tags.length; i++){
            $("ul#taglist").append("<li><a href='#' id='." +  tags[i] + "''>" + tags[i] + "</a>");
        }     

        // Run isotope
        $("#container").imagesLoaded( function() { 
            $('#container').isotope({
                itemSelector : '.item',
                animationOptions: {
                    duration: 750,
                    easing: 'linear',
                    queue: false
                }
            });
        });

    });
