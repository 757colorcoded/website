
var MeetupEvent = function () {
    var url, title, description, dateTime, humanDateTime, location = "TBD";
    var init = () => {
        var container = $("#meetup-event");
        container.find("h1").html(title);
        container.find("p.meetup-description").html(description);
        container.find("time").html(humanDateTime);
        container.find(".meetup-url").attr("href", url);
        container.find("span.address").html(location);
    };
    var setEvent = (e) => {
        url = e.event_url;
        title = e.name;
        description = e.description;
        dateTime = new Date(e.time);
        humanDateTime = dateTime.toLocaleString("en-US", { timeZoneName: "short" });
        location = e.venue.name;
        init();
    };
    return { setEvent: setEvent };
}();

$(function () {
    $.ajax({
        url: "https://api.757colorcoded.org/events",
        method: "GET",
        success: function (data) { MeetupEvent.setEvent(data.results[0]); },
        error: function (error) { console.log("The requested failed!"); }
    });
});
