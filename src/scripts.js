
var MeetupEvent = function () {

    var title, description, dateTime, humanDateTime, location = "TBD";

    var run = () => {
        var container = $("#meetup-event");
        container.find("h1").html(title);
        container.find("p.meetup-description").html(description);
        container.find("time").html(humanDateTime);
        container.find("span.address").html(location);
    };

    return {
        setEvent: function(e) {
            title = e.name;
            description = e.description;
            dateTime = new Date(e.time);
            humanDateTime = dateTime.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
                + " on "
                + [dateTime.getMonth()+1, dateTime.getDate(), dateTime.getFullYear()].join('/');
            run();
        }
    };
}();

$(function () {
    $.ajax({
        url: "https://api.757colorcoded.org/events",
        method: "GET",
        success: function (data) {
            MeetupEvent.setEvent(data.results[0]);
        },
        error: function (error) {
            console.log("The requested failed!");
            console.log(error);
        }
    });
});
