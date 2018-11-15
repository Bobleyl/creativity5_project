/*global $*/
$(document).ready(function(){
  $("#postComment").click(function(){
      var myobj = {Name:$("#name").val(),Class:$("#comment").val(),Pay:$("#pay").val()};
      jobj = JSON.stringify(myobj);
      $("#json").text(jobj);
      var url = "comment";
      $.ajax({
        url:url,
        type: "POST",
        data: jobj,
        contentType: "application/json; charset=utf-8",
        success: function(data,textStatus) {
            $("#done").html(textStatus);
        }
      })
  });
  $("#getComments").click(function() {
    var URL = "comment?q="+$("#query").val();
    $.getJSON(URL, function(data) {
      console.log(data);
      var everything = "<ul>";
      for(var comment in data) {
        com = data[comment];
        everything += "<li> Name: " + com.Name + " -- Course: " + com.Class + " -- Pay: " + com.Pay +" an hour</li>";
      }
      everything += "</ul>";
      $("#comments").html(everything);
    })
  });
  $("#getRates").click(function() {
    var URL = "rate?q="+$("#payquery").val();
    $.getJSON(URL, function(data) {
      console.log(data);
      var everything = "<ul>";
      for(var comment in data) {
        com = data[comment];
        everything += "<li> Name: " + com.Name + " -- Course: " + com.Class + " -- Pay: " + com.Pay +" an hour</li>";
      }
      everything += "</ul>";
      $("#comments").html(everything);
    })
  });
  $("#getAll").click(function() {
    var URL = "comment?q="+$("#query").val();
    $.getJSON(URL, function(data) {
      console.log(data);
      var everything = "<ul>";
      for(var comment in data) {
        com = data[comment];
        everything += "<li> Name: " + com.Name + " -- Course: " + com.Class + " -- Pay: " + com.Pay +" an hour</li>";
      }
      everything += "</ul>";
      $("#comments").html(everything);
    })
  });
  $("#deleteComments").click(function(){
      $.ajax({
        url: "delete",
        type: "DELETE",
        success: function(data,textStatus) {
            $("#done").html(textStatus);
            $("#json").text("");
            $("#comments").text("");
        }
      })
  });
});