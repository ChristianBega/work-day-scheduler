// Creating variables to store references to html elements
var timeBlock = $(".time-block");

$(document).ready(function () {
  // Created a event listener to listen if user clicks save
  $(".saveBtn").on("click", function () {
    var time = $(this).parent().attr("id");
    var value = $(this).siblings(".description").val();
    // Setting description to local storage
    localStorage.setItem(time, value);
  });
  // individual targeted time blocks
  $(".time-block").each(function () {
    var id = $(this).attr("id");
    console.log(id);
    // var description = $(this).children(".description").val();
    // backticks = template literals
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
  getItem();
  // TODO: Add code to display the current date in the header of the page.
  $("#currentDay").text(dayjs().format("dddd, MMM D"));
});

// Get an ID of an element jquery - https://www.tutorialrepublic.com/faq/how-to-get-the-id-of-an-element-using-jquery.php
