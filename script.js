var toppings;
var heldTopping;
var table;
var pizza;
var gameOverImage;
var cameraImage;
var resumeImage;
var postData;
var getData;

function setup() {
  createCanvas(1000, 1000);
  table = loadImage("assets/images/table.jpg");
  pizza = new Topping("assets/images/pizza.png", -100, 0);
  cameraImage = new Topping("assets/images/camera.png", 10, 500);
  resumeImage = new Topping("assets/images/resume.png", 80, 410);
  toppings = [];
  heldTopping = null;
  toppings.push(new Topping("assets/images/bellpepper.png", 450, 10));
  toppings.push(new Topping("assets/images/paneer.png", 400, 100));
  toppings.push(new Topping("assets/images/mushroom3.png", 600, 10));
  toppings.push(new Topping("assets/images/bacon1.png", 575, 160));
  toppings.push(new Topping("assets/images/bacon2.png", 400, 250));
  toppings.push(new Topping("assets/images/cheese.png", 480, 320));
  toppings.push(new Topping("assets/images/ham.png", 500, 300));
  toppings.push(new Topping("assets/images/lettuce.png", 415, 430));
  toppings.push(new Topping("assets/images/pineapple.png", 520, 380));
}

function draw() {
  var toppingIsHovered = false;
  for (let index = toppings.length - 1; index >= 0; index--) {
    if (toppings[index].isHovered()) {
      toppingIsHovered = true;
      break;
    }
  }
  if (cameraImage.isHovered() && heldTopping === null) {
    cursor(HAND);
  }
  else if (resumeImage.isHovered() && heldTopping === null){
	cursor(HAND);
  }
  else if (toppingIsHovered || heldTopping !== null) {
    cursor(MOVE);
  } else {
    cursor(ARROW);
  }
  

  if (heldTopping !== null) {
    heldTopping.move(mouseX - pmouseX, mouseY - pmouseY);
  }

  image(table, 0, 0);
  pizza.draw();
  for (let index = 0; index < toppings.length; index++) {
    toppings[index].draw();
  }
  cameraImage.draw();
  resumeImage.draw();
  if (heldTopping !== null) {
    heldTopping.draw();
  }
}

function mousePressed() {
  if (mouseButton === LEFT && cameraImage.isHovered()) {
    //saveCanvas("pizza", "png");
    postData = '{"toppings":[';
    for (let index = 0; index < toppings.length; index++) {
      postData = postData + toppings[index].getDetails();
      if (index != toppings.length - 1) postData = postData + ",";
    }
    postData = postData + "]}";
    console.log(postData);

    httpPost("saving.pl", "text", postData);
  } 
  else if (mouseButton === LEFT && resumeImage.isHovered()) {
	
	var all_saves;
	var list_url = "show_all.pl";
	httpGet(list_url,"text",function(response) {
		all_saves = response;
		console.log(all_saves);
		alert("Saved files available: "+all_saves);
		var save_no = prompt("Which saved file do you want to see: ");
		var url = "receive.pl?GETDATA="+save_no;
		httpGet(url,"text",true,function(response) {
			getData = response;
			console.log(getData);
			var obj = JSON.parse(getData);
			console.log(obj.toppings.length);
			toppings = [];
			for (let index = 0; index < obj.toppings.length; index++){
				toppings.push(new Topping(obj.toppings[index].path,parseInt(obj.toppings[index].x) , parseInt(obj.toppings[index].y)));
			}
			});
		});
		
  } 
  
  else if (mouseButton === LEFT) {
    for (let index = toppings.length - 1; index >= 0; index--) {
      if (toppings[index].isHovered()) {
        heldTopping = toppings[index];
        toppings.splice(index, 1);
        break;
      }
    }
  }
}

function mouseReleased() {
  if (mouseButton === LEFT && heldTopping !== null) {
    toppings.push(heldTopping);
    toppings.push(
      new Topping(heldTopping.getPath(), heldTopping.getX(), heldTopping.getY())
    );
    heldTopping = null;
  }
}
