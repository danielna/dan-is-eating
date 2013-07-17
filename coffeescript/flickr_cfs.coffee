#  Re-writing flickr.js in coffeescript, as an exercise

ajaxParams =
    apiUrl: "https://secure.flickr.com/services/rest/?method=flickr.people.getPublicPhotos"
    options:
        format: "json"
        nojsoncallback: 1
        api_key: "1684af1009448d6b66290bd7dedac4e3"
        user_id: "80451209@N04"
        extras: "description, tags"

imageBox = (photo) ->
    @url = "http://www.flickr.com/photos/daniseating/" + photo.id + "/in/photostream"
    @src = "http://farm" + photo.farm + ".static.flickr.com/" + photo.server + "/" + photo.id + "_" + photo.secret + "_" + "m.jpg"
    @title = photo.title
    @description = photo.description._content
    @tags = photo.tags
    image_template = "
        <div class='item {{tags}}'>
            <img src='{{{src}}}' title='{{title}}}' />
            <p class='label'>
                <span>{{{title}}}</span>
            </p>
            <div class='metadata'>
                <p>{{{description}}}</p>
                <a class='goFlickr' href='{{url}}' target='_blank' title='View this photo on flickr'>flickr!</a>
            </div>
        </div>"
    @build = () ->
        renderBox = window.Handlebars.compile(image_template)
        return renderBox this
    return

$.getJSON ajaxParams.apiUrl, ajaxParams.options, (data) ->
    tags = []
    $.each data.photos.photo, () ->
        markup = new imageBox(this).build()
        $("#container").append(markup)
        if jQuery.inArray(this.tags, tags) is -1 and this.tags isnt ""
            if this.tags.indexOf("uploaded:by=flickrmobile flickriosapp:filter=nofilter") is -1
                tags.push this.tags
                return
    for tag in tags
        $("ul#taglist").append("<li><a href='javascript:;' id='.#{tag}'>#{tag}</a>")
        undefined
    $("#container").imagesLoaded( ->
        $("#container").isotope({
            itemSelector: ".item"
            animationOptions:
                duration: 750
                easing: 'linear'
                queue: false
        })
        return
    )
    return
