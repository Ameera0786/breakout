// Set up
let canvas = document.getElementById("myCanvas");
let game = document.querySelector("#game")
let replay = document.querySelector("#replay")
let ctx = canvas.getContext("2d");
let innerWidth = canvas.width
let innerHeight = canvas.height
let game_status = document.querySelector("#status")

// paddle_x= left end of paddle
// paddle_x +width = right end
// Paddle
let paddle_width = 100
let paddle_height = 15
let paddle_y = innerHeight - 20
let paddle_x = innerWidth / 2 - paddle_width / 2
let paddle_speed = 10

// Ball
let negative = Math.random()
let x = Math.random() * innerWidth
let y = Math.random() * innerHeight


let x_speed = 2.5
let y_speed = 2.5
let radius = 10
if (negative < 0.5) {
  x_speed = -x_speed
}

// Game
let count = 0

// Obstacles
let obstacle_width = 50
let obstacle_height = 20
let obstacle_x = 5
let obstacle_y = 10
let distance_y = 60
let obstacles_arr1 = []
let obstacles_arr2 = []
let obstacles_arr3 = []
for (i = 0; i < innerWidth / 60; i++) {
  obstacles_arr1.push("true")
  obstacles_arr2.push("true")
  obstacles_arr3.push("true")
}
let all_obstacles = []

// Animates the ball
function animate() {
  // Clears page
  ctx.clearRect(0, 0, innerWidth, innerHeight)

  // Begins movement
  ctx.beginPath()

  // Puts both rows of obstacles in 1 array to make it easier to remove
  all_obstacles.push(...obstacles_arr1)
  all_obstacles.push(...obstacles_arr2)
  all_obstacles.push(...obstacles_arr3)

  // Creates ball
  ctx.arc(x, y, radius, 0, Math.PI * 2, false)
  ctx.fillStyle = "green"
  ctx.fill()

  // Calls functions
  paddle()
  obstacle()

  // Checks if ball is touching an obstacle
  if (y <= distance_y * 2 - 10 && y >= 2 * obstacle_height + 50) {
    for (let i = 0; i < obstacles_arr3.length; i++) {
      if (obstacles_arr3[i] == "true") {
        if (x + radius >= obstacle_x + distance_y * i && x + radius <= obstacle_x + distance_y * i + obstacle_width) {
          y_speed = -y_speed
          obstacles_arr3.splice(i, 1, "removed")
        }
      }
    }
  }
  if (y <= distance_y && y >= obstacle_height + 30) {
    for (let i = 0; i < obstacles_arr2.length; i++) {
      if (obstacles_arr2[i] == "true") {
        if (x + radius >= obstacle_x + distance_y * i && x + radius <= obstacle_x + distance_y * i + obstacle_width) {
          y_speed = -y_speed
          obstacles_arr2.splice(i, 1, "removed")
        }
      }
    }
  }
  if (y <= obstacle_height + obstacle_y) {
    for (let i = 0; i < obstacles_arr1.length; i++) {
      if (obstacles_arr1[i] == "true") {
        if (x + radius >= obstacle_x + distance_y * i && x + radius <= obstacle_x + distance_y * i + obstacle_width) {
          y_speed = -y_speed
          obstacles_arr1.splice(i, 1, "removed")
        }
      }
    }
  }

  // Ends game- Winner
  if (obstacles_arr1.includes("true") == false && obstacles_arr2.includes("true") == false && obstacles_arr3.includes("true") == false) {
    game_status.innerHTML = "Status: Won"
    y_speed = 0
    x_speed = 0
    paddle_speed = 0
  }
  // Touches sides
  if (x + radius >= innerWidth || x - radius < 0) {
    x_speed = -x_speed
  }

  // Touches top
  if (y - radius < 0) {
    y_speed = -y_speed
  }

  // Touches bottom
  if (y + radius >= innerHeight) {
    game_status.innerHTML = "Status: Lost"
    y_speed = 0
    x_speed = 0
    paddle_speed = 0
  }

  // Bounces off paddle
  if (y + radius >= (paddle_y) && y + radius < innerHeight) {
    if (x < (paddle_x + paddle_width) && x > paddle_x) {
      y_speed = -y_speed
    }
  }

  // Moves ball certain distance
  x += x_speed
  y += y_speed

  // Animates
  requestAnimationFrame(animate)
}

// Creates paddle
function paddle() {
  ctx.fillStyle = "red"
  ctx.fillRect(paddle_x, paddle_y, paddle_width, paddle_height)
}

// Creates all obstacles 
function obstacle() {
  ctx.fillStyle = "blue"

  // Makes 2 rows
  // innerWidth/(obstacle_width+obstacle_y) means full x axis / length of box and spacing between 
  // obstacle_x + (distance_y * i)) means x location, starting location + distance_y * number of boxes
  // Allows for correct spacing
  for (let i = 0; i < (innerWidth / (obstacle_width + obstacle_y)); i++) {
    if (obstacles_arr1[i] == "true") {
      ctx.fillRect(obstacle_x + (distance_y * i), obstacle_y, obstacle_width, obstacle_height)
    }
  }
  for (let i = 0; i < (innerWidth / (obstacle_width + obstacle_y)); i++) {
    if (obstacles_arr2[i] == "true") {
      ctx.fillRect(obstacle_x + (distance_y * i), obstacle_y + 30, obstacle_width, obstacle_height)
    }
  }
  for (let i = 0; i < (innerWidth / (obstacle_width + obstacle_y)); i++) {
    if (obstacles_arr3[i] == "true") {
      ctx.fillRect(obstacle_x + (distance_y * i), 2 * obstacle_y + 50, obstacle_width, obstacle_height)
    }
  }
}



// Allows paddle to be moved
window.addEventListener("keydown", (event) => {
  if (x != innerHeight) {
    // If paddle isn't touching the left side
    if (paddle_x > 0) {
      if (event.key == "ArrowLeft" || event.key == "a") {
        paddle_x = paddle_x - paddle_speed
        ctx.beginPath()
        ctx.moveTo(paddle_x, paddle_y)
      }

      // If paddle isn't touches the right side
    } if (paddle_x + paddle_width < innerWidth) {
      if (event.key == "ArrowRight" || event.key == "d") {
        paddle_x = paddle_x + paddle_speed
        ctx.beginPath()
        ctx.moveTo(paddle_x, paddle_y)
      }
    }
  }

})


// Starts game, can only start game once. If already started, warns
game.addEventListener("click", () => {
  count += 1
  if (count > 1) {
    alert("")
  } else {
    game_status.innerHTML = "Status: Playing"
    animate()
  }
})

// Reloads game
replay.addEventListener("click", () => {
  location.reload()
})





// https://www.w3schools.com/jsref/jsref_concat_array.asp

// INFORMATION
  // RECTANGLE
    // ctx.fillrect(x,y,width,height), creates a square at coordinates
    // x,y with a width and height and fills it in black
    // ctx.fillStyle=color-Changes color from black to desired color
    // ctx.fill()- fills in with color

  // BASIC MOVEMENT
    // ctx.beginPath- Begins movement
    // ctx.moveTo(x,y)- ctx.beginPath moves to that coordinate
    // ctx.lineTo(x,y)-Creates line from "Move.To" to x,y coordinates on line to
    // ctx.strokeStyle="#fa34a3"- gives stroke color
    // ctx.stroke-shows outline/line

  // ARC
    // ctx.arc(x,y,r,startAngle,endangle,true/false)- x,y location r= radius,
    // Start at an angle of 0 and end at angle of Math.pi * 2 = 2p= 360 degrees,
    // True/false= direction, if false, it's clockwise
    // DrawCounterClockwise= direction arc is made

  // For Loop
    // for loop can be used to create multiple shapes at the same time at different locations
    // Random location = x,y =
    // x = Math.random()*canvas.innerWidth
    // y=Math.random()*canvas.innerHeight
    // in order to animate/move things, MAKE FUNCTION
    // requestAnimationFrame()- Created function, creates a loop in the function
    // use variables if you wanna change things
    // ctx.clearRect(0,0,innerWidth,innerHeight)- Gets rid of the fill, prevents big line
    // Object will move off screen eventually
    // Make condition
    // Velocity will be 1, speed is 1, positive
    // if x value = or > than innerWidth, make speed negative to move other way.
    // x= center
    // To make edge be included
    // do if x + radius = or > than innerWidth, speed=-speed
    // To make sure that left side doesn't go off either
    // x-radius<0 should make speed positive

  // this
    // this.x = x- gives several objects with x variable
    // this.draw- function(){
    // -Anonymous function, will draw whatever is in it
    // }
    // this.update = function(){
    // Prevent clearRect from removing
    // }
    // "this" allows several things to have same thing
    // use for loop to choose how many
    // Make array to hold all of the objects created
    // In for loop, array will push a new object
    // In animation, make another for loop and update the array at index i

  // Collisions
    // Use Pythagorean Theorem