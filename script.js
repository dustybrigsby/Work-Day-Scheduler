$(function () {
  const hoursArr = $(".time-block");

  // Sets "click" listener on each save button
  $.each(hoursArr, function () {
    const timeSlot = $(this).attr("id");
    const textEntry = $(this).find("textarea");
    const saveBtn = $(this).find("button");

    // Saves user's text to local storage using div id as key
    saveBtn.on("click", function () {
      localStorage.setItem(timeSlot, textEntry.val());
    });
  });

  // Loops through time slots to set syle classes based on what hour it is currently
  $.each(hoursArr, function () {
    if ($(this).attr("id") === hour) {
      $(this).removeClass("past future");
      $(this).addClass("present");
      hourFound = true;
    } else if (!hourFound) {
      $(this).removeClass("present future");
      $(this).addClass("past");
    } else {
      $(this).removeClass("past present");
      $(this).addClass("future");
    }
  });

  // Gets local stored values and displays them in their time slot if they exist
  $.each(hoursArr, function () {
    const timeSlot = $(this).attr("id");
    const textEntry = $(this).find("textarea");

    if (!localStorage.getItem(timeSlot)) {
      localStorage.setItem(timeSlot, "");
    } else {
      let storedText = localStorage.getItem(timeSlot);
      $(textEntry).text(storedText);
    }
  });

  // Gets the current time from day.js and formats it
  function updateHour() {
    let hour = dayjs().format("[hour]-HH");
    // console.log(hour);
    // hour = "hour-14";
    let hourFound = false;
  }

  // Displays current day in the header
  $("#currentDay").text(dayjs().format("dddd, MMMM Do"));

  // Initial call when page is loaded
  updateHour();

  // Function called every minute to keep updating as time passes
  setInterval(updateHour, 60000);
});
