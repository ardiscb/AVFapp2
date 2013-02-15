//Courtney Ardis
//AVF 1302
//Demo App 2

var onDeviceReady = function(){
}

//Cordova ready
document.addEventListener("deviceready", onDeviceReady, false);

$('#home').on('pageinit', function(){
    //code needed for home page goes here

});

$('#twitterPage').on('pageinit', function(){
    console.log("I've gotten to the twitter page");
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
}); 

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