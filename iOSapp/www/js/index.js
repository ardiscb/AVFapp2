//Courtney Ardis
//AVF 1302
//Demo App 2

var onDeviceReady = function(){
    $("#getLocationBtn").click(function(){
        navigator.geolocation.getCurrentPosition(onSuccess, error);
    });
    $("#capture").click(function() {
        imageCapture();
    });
    $("#network").click(function() {
        connectionStatus();
    });
    onReady();
}

//Cordova ready
document.addEventListener("deviceready", onDeviceReady, false);

//Geolocation
var onSuccess = function(position){
    console.log("in success");
    // var city = $("#city").attr("value");
    // var state = $("#state").attr("value");
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    var accuracy = position.coords.accuracy;
    console.log(latitude);
    console.log(longitude);
    $("#geo").append(
        "<img width='100%' height='100%' src='http://maps.googleapis.com/maps/api/staticmap?center=" + latitude + "," + longitude + "&zoom=10&size=600x300&maptype=roadmap&markers=color:green|" + latitude + "," + longitude + "&sensor=false'/>" + 
        '<p>Latitude: ' + latitude + '</p>' +
        '<p>Longitude: ' + longitude + '</p>' +
        '<p>Accuracy: ' + accuracy + 'm</p>'
    );
    console.log("after append");
}
var error = function(error){
    alert("Geolocation Error Message: " + error.message + " Error Code: " + error.code);
}
//onReady function - does everything else
var onReady = function(position){
    $('#home').on('pageinit', function(){
        //code needed for home page goes here

    });
    $('#contactsPage').on('pageinit', function(){
        console.log("in Contacts page");
        console.log("Right before Add Contact click event");

        $('#addContact').on('click', function(){
        var contact = navigator.contacts.create(); //set variable to create contact method   
        contact.displayName = $("#firstName").attr("value") + " " + $("#lastName").attr("value");
        contact.nickname = $("#firstName").attr("value") +  " " + $("#lastName").attr("value");
        //sets name 
        var fullName = new ContactName();
            fullName.givenName = $("#firstName").attr("value");
            fullName.familyName = $("#lastName").attr("value");
            fullName.formatted = contact.displayName;
            contact.name = fullName;
        //sets email
        contact.emails = [new ContactField("email", $("#email").attr("value"))];
        contact.phoneNumbers = [new ContactField("mobile", $("#phone").attr("value"))];
        //saves the contact
        contact.save(function(){
            console.log('in save');
            $("#firstName").attr("value", "");
            $("#lastName").attr("value", "");
            $("#email").attr("value", "");
            $("#phone").attr("value", "");
            alert("Contact saved succesfully!");
        });
        console.log("after save, in click even for add contact");
        });
    });
    
    //Twitter Page
    $('#twitterPage').on('pageinit', function(){
        console.log("I've gotten to the twitter page");
        // if(networkState != Connection.UNKNOWN) || (networkState != Connection.NONE){
            console.log("Starting JSON");
            $.ajax({
            type: "GET",
            url: "http://search.twitter.com/search.json?q=mobile%20development&callback=?",
            dataType: "json",
            success: function(data, response){      
                console.log(data); 
                console.log("In the success function");     
                for (i=0, j=data.results.length; i<j; i++){
                    $("" +
                        "<li id='tweets'>" +                
                        "<img src='" + data.results[i].profile_image_url + "' />" +             
                        "<a href='' id='twitterA'>" + data.results[i].from_user + "</a>" +              
                        "<p id='twitterP'>" + data.results[i].text + "</p>" +               
                        "</li><hr />"           
                    ).appendTo("#twitterFeed");     
                }   
            },
            error: function(status, results){
                console.log(status, results);
            }
            });
        // }else{
        //     console.log("in else");
        //     alert("Please connect to a network and try again. Example: Wi-Fi");
        // }
    }); 
    
    //GitHub Job Listing Page
    $('#githubPage').on('pageinit', function(){
        console.log("I've gotten to the github page");
        console.log("Starting JSON");
        $.ajax({
            type: "GET",
            url: "https://jobs.github.com/positions.json?description=javascript&location=sf&full_time=true",
            dataType: "json",
            success: function(data, response){      
                console.log(data);      
                for (i=0, j=data.length; i<j; i++){
                    $("" +
                        "<li>" +
                        "<p>Position Title: " + data[i].title + "</p>" +                
                        "<p>Location: " + data[i].location + "</p>" +              
                        "<p>Company: " + data[i].company + "</p>" + 
                        // "<a href=''>" + data[i].company_url + "</a>" +             
                        "<p>Job Description: " + data[i].description + "</p>" +
                        "<p>How to Apply:" + data[i].how_to_apply + "</p>" +               
                        "</li><hr />"           
                    ).appendTo("#githubJobs");     
                }   
            },
            error: function(status, results){
                console.log(status, results);
            }
        });
    });
};

// Native device feature: Capture
// Called when capture operation is finished
var captureImg = function(mediaFiles) {
    for (var i = 0, j = mediaFiles.length; i < j; i += 1) {
    // Store photo
    // Upload file to twitter
    }       
};

// Called if error occurs
// Also uses native feature: notification
var captureError = function(error) {
    var errorMsg = 'An error occurred during capture: ' + error.code + '. Restart app and try again.';
    navigator.notification.alert(errorMsg, null, 'Oops!');
};

// Starts device capture
var imageCapture = function(){
    navigator.device.capture.captureImage(captureImg, captureError, {limit: 1});
};
//END Capture

// Native device feature: Connection
var connectionStatus = function() {
    // Using depreciated navigator.network.connection because otherwise it doesn't work on Android emulator
    // Source: https://issues.apache.org/jira/browse/CB-1807
    // Error in phonegap 2.2.0
    // Descripton states that using this will result in the correct data type for the emulator
    var networkState = navigator.network.connection.type;

    var states = {};
    states[Connection.UNKNOWN]  = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI]     = 'WiFi connection';
    states[Connection.CELL_2G]  = 'Cell 2G connection';
    states[Connection.CELL_3G]  = 'Cell 3G connection';
    states[Connection.CELL_4G]  = 'Cell 4G connection';
    states[Connection.NONE]     = 'No network connection';
    
    alert('Connection type: ' + states[networkState]);
};

// Native device feature: Notification
// onConnectMsg alert dismissed
var alertDismissed = function() {
    //return to index.html
};

var onConnectMsg = function(networkState) {
    if (networkState != Connection.NONE || Connection.UNKNOWN){
        navigator.notification.alert(
            'You are now connected!',  // message
            alertDismissed,            // callback
            'Network Connection',      // title
            'OK'                       // buttonName
        );
    }else{
        navigator.notification.alert(
            'Unable to find connection status',  // message
            alertDismissed,                      // callback
            'Network Connection',                // title
            'OK'                                 // buttonName
        );
    }
};
//END Connection native feature
