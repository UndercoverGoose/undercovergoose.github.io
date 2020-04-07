let goose = {
  directionX: 1, // -1 = right, 1 = left
  directionY: 1, // -1 = up, 1 = down
  posX: 0,
  posY: 0,
  cornerHits: 0,
  sideHits: 0
}
if(localStorage.getItem("_goose-info") !== null) {
  goose = JSON.parse(localStorage.getItem("_goose-info"));
}

function gooseTo(x, y, d) {//transform: scaleX(-1);
  document.getElementById("dvd").style.left = `${x}px`;
  document.getElementById("dvd").style.top = `${y}px`;
  if(d === 1) {
    document.getElementById("dvd").style.transform = "scaleX(-1)";
  }else {
    document.getElementById("dvd").style.transform = null;
  }
}
function gooseLoop() {
  goose.posX = goose.posX + goose.directionX;
  goose.posY = goose.posY + goose.directionY;
  gooseTo(goose.posX, goose.posY, goose.directionX);

  let maxX = innerWidth - 32;
  let maxY = innerHeight - 32;

  if(goose.posX >= maxX) {
    goose.directionX = -1;
    goose.sideHits += 1;
  }else if(goose.posX <= 0) {
    goose.directionX = 1;
    goose.sideHits += 1;
  }
  if(goose.posY >= maxY) {
    goose.directionY = -1;
    goose.sideHits += 1;
  }else if(goose.posY <= 0) {
    goose.directionY = 1;
    goose.sideHits += 1;
  }
  if((goose.posX === 0 && goose.posY === 0) || (goose.posX === maxX && goose.posY === maxY) || (goose.posX === maxX && goose.posY === 0) || (goose.posX === 0 && goose.posY === maxY)) {
    goose.cornerHits += 1;
  }
  document.getElementById("gside").innerHTML = `Side Hits: ${goose.sideHits}`;
  document.getElementById("gcorn").innerHTML = `Corner Hits: ${goose.cornerHits}`;
  localStorage.setItem("_goose-info", JSON.stringify(goose));
}setInterval(gooseLoop, 0);
