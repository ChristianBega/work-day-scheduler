// Creating variables to store references to html elements
var timeBlock = $(".time-block");

// document.ready () - makes sure all html elements are loaded before calling function.
$(document).ready(function () {
  // Created a event listener to listen if user clicks save
  $(".saveBtn").on("click", function () {
    // Created a variable to store the parent id
    //           this - represents the object being clicked on
    //                .parent() - finds the parents of the object being clicked on.
    //                         .attr() - target the id of the parent element
    var time = $(this).parent().attr("id");
    // Created a variable to store the siblings with a class of .description
    //           this - represents the object being clicked on
    //                 .siblings () - finds the siblings of the object being clicked on with a class of .description
    //                                          .val () - shows the value of the input
    var value = $(this).siblings(".description").val();
    // Setting the time and value into local storage
    localStorage.setItem(time, value);
  });
  //              .each () - iterates over each element with a class of .time-block
  $(".time-block").each(function () {
    // Created a variable to store the time blocks id
    var id = $(this).attr("id");
    // backticks = template literals
    //    passing in the id variable to grab any elements with the id.
    //        .description - any element with the class of description
    //                      .val () - setting the value of the textarea
    //                                       .getItem () - grabbing the id key from local storage.
    $(`#${id} .description`).val(localStorage.getItem(`${id}`));
  });

  // Created a compare function that will compare each time block and set past, present, or future classes
  function compare() {
    // Created a variable to store the currentTime from dayjs
    var currentTime = dayjs().hour();
    // Created an empty array to store each hour value
    var hourArray = [];
    // Created two undefined variables to store new and old hour value
    var hourOld, hourNew;
    // Created a for each loop to iterate over each timeBlock
    timeBlock.each(function (index) {
      // Assigning a value to the hourOld variable (the id of each timeBlock Ex. hour-9)
      hourOld = $(this).attr("id");
      // Assigning a value to the hourNew variable (removing the hour- string from the id)
      hourNew = Number(hourOld.replace("hour-", ""));
      // Created an if statement to check if the time is past, present, or future
      if (hourNew < currentTime) {
        // If hourNew is less than currentTime add past class
        $(this).addClass("past");
      } else if (hourNew > currentTime) {
        // If hourNew is greater than currentTime add future class
        $(this).addClass("future");
      } else {
        // If hourNew not greater than or less than add present class
        $(this).addClass("present");
      }
    });
  }
  compare();
  // Grabbing the reference of currentDay and setting the text() to dayjs
  //                    .dayjs() - provides a day js object
  //                           .format () - formatting day js object
  //                                  (day month date)
  $("#currentDay").text(dayjs().format("dddd, MMM D"));
});

// Get an ID of an element jquery - https://www.tutorialrepublic.com/faq/how-to-get-the-id-of-an-element-using-jquery.php
//dayjs - https://day.js.org/
