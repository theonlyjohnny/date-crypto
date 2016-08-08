function checkFinish() {
  if ($($(".box").text()) == $("#final").text()) {
    console.log("They're right!")
    
  } else {
    console.log("Nope.")
    start();
  }
}

function doMath(array) {
  $("#operations").css("display", "block");
  $(".operation").on("click", function() {
    var result;
    console.log("Doing operation", $(this).text(), "on ", array[0], "and", array[1])
    switch ($(this).text()) {
      case "+":
        var result = parseInt(array[0].text) + parseInt(array[1].text)
        if (result[0] == 0) {
          result = result[1]
        }
        break;
      case "-":
        var result = array[0].text.toString() - array[1].text.toString()
        break;
      case "X":
        var result = array[0].text.toString() * array[1].text.toString()
        break;
      case "/":
        console.log(array[1], typeof array[1])
        if (array[1].text == "0") {
          console.log("can't divide by 0");
          return false;
        }
        var result = array[0].text.toString() / array[1].text.toString()
        result = Math.floor(result)
        break;
    }
    console.log(result, "result");

    // if (array[0].index < array[1].index) {
    //   console.log("Removing box #", array[0].index)
    //   $($(".box")[array[0].index]).remove()
    //   array[0].index -= 1
    // } else {
    //   console.log("Removing box #", array[1].index)
    //   $((".box")[array[1].index]).remove()
    //   array[1].index -= 1
    // }
    $($(".box")[array[0].index]).text("");
    $($(".box")[array[1].index]).text(result);
    $($(".box")[array[0].index]).remove();
    $("#operations").css("display", "none");
    $(".box").off("click");
    $(".operation").off("click");
    var result;
    if ($(".box").length == 1) {
      checkFinish()
    } else {
      setClick()
    }
  })
}

function setClick() {
  clicked = [];
  $(".box").on("click", function() {
    $(this).addClass("selected")
    console.log(clicked, "clicked.")
    console.log($(this).text())
    switch ($(this).text()) {
      case clicked[0]:
        console.log("Is already in place 0?")
        clicked.shift()
        $(this).removeClass("selected")
        break;
      case clicked[1]:
        console.log("Is already in place 1?")
        clicked.pop()
        $(this).removeClass("selected")
        break;
      default:
        clicked.push({ text: $(this).text(), index: $(this).index() })
        if (clicked.length == 2) {
          console.log("both have been clicked")
          doMath(clicked);
          clicked = [];
        }
    }
  })
}

function start() {
  var currentTime = new Date()
  var month = (currentTime.getMonth() + 1).toString()
  if (month.length < 2) {
    var month = '0' + month;
  }
  var day = (currentTime.getDate()).toString()
  if (day.length < 2) {
    var day = '0' + day;
  }
  var year = (currentTime.getFullYear()).toString()
  var year = year.slice(2, year.length);
  date = month.toString() + day.toString() + year
  var numbers = []
  for (i = 0; i < date.length; i++) {
    numbers.push(date[i]);
    $($(".box")[i]).text(date[i])
    $("#final").text(date[date.length - 1])
  }
  // console.log(numbers)
  setClick();
}
$(document).ready(function() {
  start()
})
