/**
 * Created with JetBrains WebStorm.
 * User: Jonathan Wu
 * Date: 5/8/13
 * Time: 7:05 PM
 * To change this template use File | Settings | File Templates.
 */

$('document').ready(function() {

    Eventbrite({
        'app_key': '4KKWYI4IZWRKXIXK7S',
        'user_key': ''
    }, function(eb_client) {
        // parameters to pass to the API
        var params = {
            'keywords': "hack hackathon",
            'city': "Cupertino",
            'within': "100",
            'max': "30",
            'sort_by': "date"
        };

        // make a client request, provide a callback that will handle the response data
        eb_client.event_search(params, function(response) {
            var box_contents = "";
            if (response.events !== undefined) {
                for (var i = 0; i < response.events.length; i++) {
                    if (response.events[i].event !== undefined) {
                        box_contents += generateEventBox(response.events[i].event);
                    }
                }
            }

            // Use jQuery to display the response data to the user
            $('.event_box').html(box_contents);
        });
    });

});

function generateEventBox(event) {
    var not_iso_8601 = /\d\d-\d\d-\d\d \d\d:\d\d:\d\d/;
    var date_string = not_iso_8601.test(event.start_date) ? event.start_date.replace(' ', 'T') : event.start_date;
    var date_string_2 = not_iso_8601.test(event.end_date) ? event.end_date.replace(' ', 'T') : event.end_date;
    var start_date = new Date(Date.parse(date_string));
    var end_date = new Date(Date.parse(date_string_2));
    var venue_name = 'Online'; //default location name
    var time_string = Eventbrite.prototype.utils.formatTime(start_date);
    date_string_2 = end_date.toDateString();
    date_string = start_date.toDateString();
    var start_time = getTime(event.start_date);

    var box = "";
    box += "<li class='event_content'><a class='title_string' target='_blank' href='" + event.url + "'>" + event.title + "</a>";
    if (date_string != date_string_2) {
        box += "<a class='date_string'>" + date_string + " - " + date_string_2 + "</a>";
    } else {
        box += "<a class='date_string'>" + date_string + "</a>";
    }
    box += "<a class='time_string'>" + start_time + "</a>";
    box += "</li>";

    return box;

}

function getTime(time) {
    var separate = time.split(" ");
    var split = separate[1].split(":");
    var hours = parseInt(split[0]);
    var minutes = split[1];
    var ampm;
    if (hours > 12) {
        hours -= 12;
        ampm = "pm";
    } else {
        ampm = "am";
    }
    return hours + ":" + minutes + ampm;
}