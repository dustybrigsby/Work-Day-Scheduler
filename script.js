// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  const now = dayjs();
  const hoursArr = $(".time-block");

  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?

  $.each(hoursArr, function () {
    const timeSlot = $(this).attr("id");
    const textEntry = $(this).find("textarea");
    const saveBtn = $(this).find("button");

    saveBtn.on("click", function (e) {
      localStorage.setItem(timeSlot, textEntry.val());
    });
  });

  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?

  updateHour();
  setInterval(updateHour, 60000);

  function updateHour() {
    const hour = dayjs(now).format("[hour]-HH");
    let hourFound = false;

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
  }

  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?

  $.each(hoursArr, function (i, element) {
    const timeSlot = $(this).attr("id");
    const textEntry = $(this).find("textarea");

    if (!localStorage.getItem(timeSlot)) {
      localStorage.setItem(timeSlot, "");
    } else {
      let storedText = localStorage.getItem(timeSlot);
      $(textEntry).text(storedText);
    }
  });

  // TODO: Add code to display the current date in the header of the page.
  $("#currentDay").text(now.format("dddd, MMMM Do"));
});
