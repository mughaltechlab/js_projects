
var con = console;

var stageWidth = 400;
var stageHeight = 400;


var cameraTarget = new THREE.Vector3(0,0,100)
var camera = new THREE.PerspectiveCamera(70, stageWidth/stageHeight, 1, 20000);
// camera.rotation.x = Math.PI;
// camera.rotation.y = Math.PI;
// camera.position.z = 0;
camera.lookAt(cameraTarget);

var scene = new THREE.Scene();


var lightWhite =  new THREE.PointLight(0xffffff, 1, 2000);
scene.add(lightWhite);

var lightGreen =  new THREE.PointLight(0x00ff00, 2, 2000);
scene.add(lightGreen);

var lightRed =  new THREE.PointLight(0xff0000, 1, 1000);
scene.add(lightRed);

var group = new THREE.Object3D();
scene.add( group );

var renderer = new THREE.WebGLRenderer();
renderer.setSize(stageWidth, stageHeight);
// document.body.appendChild( renderer.domElement );
document.querySelector('.container').appendChild(renderer.domElement);



function getSeed() { return 0.01 + Math.random() * 0.05; }
var zGap = 30;
var xMods = [getSeed(), getSeed(), getSeed()];
var yMods = [getSeed(), getSeed(), getSeed()];
var xCurve = 0;

var positions = [];

var gap = false;
var shape = 3;
var rotation = 0;
var red = 0xff, green = 0x80, blue = 0x60

function addLine(index) {

  var i0 = index, i1 = index + 1;

  function getOscillation(seed, offset) {
    // stack sine waves for cool motion
    return (Math.sin(seed[0] * offset) + Math.cos(seed[1] * offset) + Math.sin(seed[2] * offset)) * 200; // * amplitude
  }
  var x0 = getOscillation(xMods, i0);
  var x1 = getOscillation(xMods, i1);
  var y0 = getOscillation(yMods, i0);
  var y1 = getOscillation(yMods, i1);
  var z0 = i0 * zGap;
  var z1 = i1 * zGap;

  // this creates a line down the centre, for debugging camera path etc.
  // the camera path is not a smooth line, it is jagged.
  // var material = new THREE.LineBasicMaterial({color: 0xff0000});
  // var geometry = new THREE.Geometry();
  // geometry.vertices.push(
  //   new THREE.Vector3(x0,y0,z0),
  //   new THREE.Vector3(x1,y1,z1)
  // );
  // var line = new THREE.Line(geometry, material);
  // group.add( line );

  // rarely create a gap... then on doing so fluctuate the shape sides and colours... 
  if (gap === false && Math.random() > 0.99) { 
    gap = 1 + ~~(Math.random() * 5);
    shape = 3 + ~~(Math.random() * 5);
    rotation = Math.random() * 0.1;
    red = ~~(0x40 + Math.random() * 0xd0);
    green = ~~(0x20 + Math.random() * 0x80);
    blue = ~~(0x10 + Math.random() * 0x60);
  } else if ( gap > 0 ) {
    gap--;
    if (gap === 0) gap = false;
  }

  

  if (gap === false) {

    var colour = red << 16 | (index / lines * green) << 8 | blue;

    function createHole(x,y,z) {
      var g = new THREE.TorusGeometry( 20, 2, 4, shape );
      var m = new THREE.MeshPhongMaterial( { color: colour } );
      var torus = new THREE.Mesh(g, m);
      torus.position.x = x;
      torus.position.y = y;
      torus.position.z = z;
      torus.rotation.z = index * rotation;
      return torus;
    }

    group.add(createHole(x0,y0,z0));
    // if(index % 10 == 0) {
    //   for ( var j = 0; j < shape; j++) {
    //     var angle = j / shape * Math.PI * 2;
    //     createHole(x0 + Math.sin(angle) * 40, y0 + Math.cos(angle) * 40, z0 );
    //   }
    // }

    if (Math.random() > 0.9) { // every now and drop some spacejunk.
      // var weirdos = 1 + ~~(Math.random() * 19);
      var angle = Math.random() * Math.PI * 2;
      var distance = 40 + Math.random() * 300
      var weirdo = createHole(x0 + Math.sin(angle) * distance, y0 + Math.cos(angle) * distance, z0 );  
      group.add(weirdo);
      weirdo.rotation.x = Math.random() * Math.PI * 2;
      weirdo.rotation.z = Math.random() * Math.PI * 2;
    }
  }


  positions[index] = {x:x0,y:y0,z:z0};

}

// the tunnel is not infinite at this point in time. that's for another day.
for ( var i = 0, lines = 1000; i < lines; i++) {
  addLine(i)
}

// this was a debug item for checking camera position. it's now used as a camera dolly 
var g = new THREE.TorusGeometry( 15, 5, 5, 20 );
var m = new THREE.MeshPhongMaterial( { color: 0x309000 } );
var tracker = new THREE.Mesh( g, m );
tracker.rotation.x = 0;
tracker.rotation.y = Math.PI;
// group.add(tracker);


var zPos = 0;
var dx1 = 0; 
var dy1 = 0;

function render(t) {
  requestAnimationFrame( render );

  mouseActual.x -= (mouseActual.x - mouse.x) * 0.1;
  mouseActual.y -= (mouseActual.y - mouse.y) * 0.1;


  var dx = 0; // dx and dy are x and y movement, used to calculate tangent of a curve for camera
  var dy = 0;
  var dz = 4; // dz is just constant movement on z axis.

  zPos += dz;

  var zFloat = zPos / zGap;
  var i0 = Math.floor(zFloat);  // this position
  var i1 = i0 + 1;              // next position
  var perc = zFloat - i0;       // interpolation between this position and next position.

  var tPos = positions[i0], nPos = positions[i1];
  if (tPos != undefined && nPos != undefined) { // otherwise we have reached the end... of the tunnel. 
    dx = nPos.x - tPos.x;
    dy = nPos.y - tPos.y;
    tracker.position.x = tPos.x + dx * perc;
    tracker.position.y = tPos.y + dy * perc;
  }
  
  tracker.position.z = zPos;// + Math.sin(zPos * 0.001) * 40;


  dx1 -= (dx1 - dx) * 0.1; // double damping on the camera rotation.
  dy1 -= (dy1 - dy) * 0.1;

  var angleX = -Math.atan(dy1 / dz) / 2;
  var angleY = Math.PI + Math.atan(dx1 / dz) / 2;

  tracker.rotation.x -= (tracker.rotation.x - angleX) * 0.05;
  tracker.rotation.y -= (tracker.rotation.y - angleY) * 0.05;

  // con.log( tracker.rotation.x,  tracker.rotation.y);


  camera.position.x = tracker.position.x + mouseActual.x;
  camera.position.y = tracker.position.y + mouseActual.y;
  camera.position.z = tracker.position.z;

  camera.rotation.x = tracker.rotation.x;
  camera.rotation.y = tracker.rotation.y;

  // camera.lookAt(tracker.position);

  lightWhite.position.z = tracker.position.z - 100;

  lightGreen.position.x = tracker.position.x;
  lightGreen.position.y = tracker.position.y - 200;
  lightGreen.position.z = tracker.position.z;

  lightRed.position.x = tracker.position.x - 200;
  lightRed.position.y = tracker.position.y + 200;
  lightRed.position.z = tracker.position.z;



  renderer.render( scene, camera );
}

var interaction = false;
var mouse = {x:0,y:0};
var mouseActual = {x:0,y:0};
window.addEventListener("mousemove", function(e) {
  if (interaction){
    mouse.x = (e.x - stageWidth / 2) / 4;
    mouse.y = (e.y - stageHeight / 2) / 4;
  }
});
window.addEventListener("mousedown", function(e) {
  interaction = !interaction;
  if (interaction == false) mouse.x = mouse.y = 0;
});



render(0);