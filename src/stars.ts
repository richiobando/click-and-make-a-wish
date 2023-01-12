interface Stars {
  x: number;
  y: number;
  z: number;
  color: string;
  draw: (star: Stars) => void;
  id: number;
  radius: number;
  update: () => void;
  shooting: boolean;
  director?: Coordinates;
}
interface Coordinates {
  x: number | null;
  y: number | null;
}
//TODO if star is shootin don change z
export function shootingStars(element: HTMLCanvasElement) {
  const canvas = element;
  const ctx = canvas.getContext('2d');

  const innerWidth = window.innerWidth;
  const innerHeight = window.innerHeight;
  const color = '#fff';
  let radius = 2;
  let starsIndex: number = 0;
  let stars: Stars[] = [];
  let TWO_PI = Math.PI * 2;
  let centerX = innerWidth / 2;
  let centerY = innerHeight / 2;
  let focalLength = 100;
  let starRadius: number | null = null;
  let starX: number | null = null;
  let starY: number | null = null;
  let numStars = 200;
  let mouse: Coordinates = { x: null, y: null };
  let starX_dir = 0;
  let starY_dir = 0;
  let x = 0;
  let y = 0;
  let z = 0;
  for (let i = 0; i < numStars; i++) {
    [x, y] = randomPosition();
  }
  function draw() {
    ctx!.beginPath();
    ctx!.arc(starX, starY, starRadius, 0, TWO_PI, false);
    ctx!.fillStyle = color;
    ctx!.fill();
    ctx!.closePath();
  }
  function update() {
    starX = this.x;

    starY = this.y;

    this.z++;
    starRadius = radius * Math.abs(Math.sin(this.z / 50));

    starX += starX_dir;
    starY += starY_dir;

    draw();
  }

  function star(x: number, y: number, z: number) {
    const starObj: Stars = {
      x: x,
      y: y,
      z: z,
      color: '#fff',
      draw: draw,
      id: 0,
      radius: radius,
      update: update,
      shooting: false,
    };

    stars[starsIndex] = starObj;
    starsIndex++;
    starObj.id = starsIndex;
  }

  function randomPosition() {
    const x = - innerWidth + Math.random() * innerWidth * 2 ;
    const y = Math.random() * innerHeight;
    const z = Math.random() * innerWidth;
    star(x, y, z);
    return [x, y, z];
  }
  function directors() {
    const directorX = Math.abs(Math.sin(Math.random() * TWO_PI));
    const directorY = Math.sin(Math.random() * TWO_PI);
    return{x:directorX, y:directorY};
  }
  // begin a shootin star
  element.addEventListener('click', (e) => {
    const x = e.offsetX;
    const y = e.offsetY;
    const starObj: Stars = {
      x: x,
      y: y,
      z: 0,
      color: '#fff',
      draw: draw,
      id: 0,
      radius: radius,
      update: update,
      shooting: true,
      director:directors()
    };
    stars[starsIndex] = starObj;
    starsIndex++;
    starObj.id = starsIndex;
  });

  element.addEventListener('wheel', (e) => {
    mouse.x = e.deltaX;
    mouse.y = e.deltaY;
    y: if (e.deltaY > 0) {
      starX_dir += 2;
    }
    if (e.deltaY < 0) {
      starX_dir -= 2;
    }
  });
  canvas.width = innerWidth;
  canvas.height = innerHeight;

  function animate() {
    requestAnimationFrame(animate);
    ctx!.fillStyle = '#000f3d';
    ctx!.fillRect(0, 0, innerWidth, innerHeight);
    for (let i in stars) {
      stars[i].update();
      if (stars[i].shooting) {
        stars[i].x += -10 * stars[i]?.director.x;
        stars[i].y += -10 * stars[i]?.director.y;
        // stars[i].radius =5
        // stars[i].z =5
      }
    }
  }
  animate();
}
