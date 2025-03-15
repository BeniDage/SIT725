function changeText() {
  var textArray = ["Text1", "Text2", "Text3", "Text4", "Text5"];
  var number = getRandomNumberBetween(0, textArray.length - 1);
  console.log("Index", number);
  document.getElementById("heading").innerHTML = textArray[number];
}

function getRandomNumberBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
