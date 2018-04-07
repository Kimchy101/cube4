// three.js logo vars are generated for later use...
var logoCanvas = $(".icon")[0];
var logoRenderer = new THREE.WebGLRenderer({canvas: logoCanvas, alpha: true, antialias: true});
var scene = new THREE.Scene();
var logoCam;

var cubeMesh, cubeWireMesh;

var animateLvl = 0;

function animate()
{    
    updateThreeJs();
    
    updateLogoStyle();

    updateTime();

    animateTicker();

    requestAnimationFrame(animate);
}

function startScene()
{   
    const CUBE_LENGTH = 50;
    const WIRE_LENGTH = Math.sqrt(3) * CUBE_LENGTH;
    
    // pretty standard threejs configs...
    logoCam = new THREE.PerspectiveCamera(35, // fov
        logoCanvas.getAttribute("width") / logoCanvas.getAttribute("height"), //asspect ratio
        0.1, 3000); // near & far// var logoRenderer = new THREE.WebGLRenderer({canvas: do})

    logoRenderer.setClearColor(0x000000, 0);
    logoRenderer.setPixelRatio(1);
    logoRenderer.setSize(500, 500);

    updateLogoStyle();

    let material = new THREE.MeshLambertMaterial({color: 0x643c3c});
    let materialWireFrame = new THREE.MeshNormalMaterial({wireframe: true});
    
    cubeMesh = new THREE.Mesh(new THREE.CubeGeometry(CUBE_LENGTH, CUBE_LENGTH, CUBE_LENGTH), material);
    cubeWireMesh = new THREE.Mesh(new THREE.CubeGeometry(WIRE_LENGTH, WIRE_LENGTH, WIRE_LENGTH), materialWireFrame);

    cubeMesh.position.setZ(-500); cubeWireMesh.position.setZ(-700);

    scene.add(new THREE.AmbientLight(0xffffff, 0), new THREE.PointLight(0xffffff, 3), cubeMesh, cubeWireMesh);
}   

function updateThreeJs()
{
    switch (animateLvl)
    {
        case(0): startScene(); animateLvl++; break;
        case(1): growCube(); break;
        case(2): loopCubeAnimation(); break;
        default: alert("animateLvl error"); break;
    }

    // render and set cubemesh pos...
    logoRenderer.render(scene, logoCam);
    cubeMesh.position.z = -300 + (-Math.cos(time * 2) - 1) * 100;

    updateLogoStyle();
}

function updateLogoStyle()
{
    let a = window.innerWidth < 600;
    let b = window.innerHeight < 600;
    let pxRes;

    if (!a && !b) { pxRes = 500; }
    else if (a && !b) { pxRes = window.innerWidth - 100; }
    else if (!a && b) { pxRes = (window.innerHeight * 0.85) - 100; }
    else if (a && b) { pxRes = (Math.min(window.innerHeight, window.innerWidth) * 0.85) - 100; }

    pxRes += "px"; 

    logoCanvas.style.width = pxRes;
    logoCanvas.style.height = pxRes;
}

function growCube()
{
    var timeMod = time * 2; // speeds up animation...
    cubeWireMesh.position.z = -300 + ((-Math.cos(timeMod) - 1) * 100) * 2;
    
    if (timeMod > Math.PI) // finished growth
    {
        cubeWireMesh.position.z = -300;
        animateLvl = 2;
    }
}

function loopCubeAnimation()
{
    rotate(cubeMesh, 0, 1, 1);
    rotate(cubeWireMesh, 1, 0, 1);
}

function rotate(mesh, x, y, z)
{
    mesh.rotation.x += dt * x;
    mesh.rotation.y += dt * y;
    mesh.rotation.z += dt * z;
}

function hillCurve(mid, end, height)
{
    let curveTime = time % end;
    var hillResult;
    
    if (curveTime < mid) 
        hillResult = height / mid * curveTime;
    else 
        hillResult =  height * (curveTime - end) / (mid - end);

    return hillResult;
}

requestAnimationFrame(animate);