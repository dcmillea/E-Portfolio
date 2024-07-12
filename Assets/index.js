// my template id: template_2fqot2d
// my service id: service_a0ofr3j
// user id: kvUDIvkDMJdmm7_h3

const cursorDot = document.querySelector(".cursor--dot");
const cursorOutline = document.querySelector(".cursor--outline");
console.log(cursorDot);
let isModalOpen = false;
let contrastToggle = false;

function toggleContrast() {
  contrastToggle = !contrastToggle;
  if (contrastToggle) {
    document.body.classList += " dark-theme";
  } else {
    document.body.classList.remove("dark-theme");
  }
}

function contact(event) {
  event.preventDefault();

  const loading = document.querySelector(".modal__overlay--loading");
  const success = document.querySelector(".modal__overlay--success");
  loading.classList += " modal__overlay--visible";

  emailjs
    .sendForm(
      "service_a0ofr3j",
      "template_2fqot2d",
      event.target,
      "kvUDIvkDMJdmm7_h3"
    )
    .then(() => {
      loading.classList.remove("modal__overlay--visible");
      success.classList += " modal__overlay--visible";
    })
    .catch((e) => {
      loading.classList.remove("modal__overlay--visible");
      alert(
        "The email service is temporarily unavailable. Please contact me directly on dcmillea@gmail.com"
      );
    });
}

function toggleModal() {
  isModalOpen = !isModalOpen;
  if (isModalOpen) {
    document.body.classList += " modal--open";
  } else {
    document.body.classList.remove("modal--open");
  }
}

// Custom cursor and background mover

const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let particlesArray;

let mouse = {
  x: null,
  y: null,
  radius: (canvas.height / 75) * (canvas.width / 75),
};

window.addEventListener("mousemove", function (e) {
  // for the custom cursor
  const x = e.clientX;
  const y = e.clientY;

  // for the background
  mouse.x = x;
  mouse.y = y;

  cursorOutline.style.left = `${x}px`;
  cursorOutline.style.top = `${y}px`;
  cursorDot.style.left = `${x}px`;
  cursorDot.style.top = `${y}px`;

  cursorOutline.animate(
    {
      left: `${x}px`,
      top: `${y}px`,
    },
    { duration: 500, fill: "forwards", easing: "ease" }
  );
});

window.addEventListener("mouseout", function () {
  mouse.x = undefined;
  mouse.y = undefined;
});

// Particle
class Particle {
  constructor(x, y, dirX, dirY, size, color) {
    this.x = x;
    this.y = y;
    this.dirX = dirX;
    this.dirY = dirY;
    this.size = size;
    this.color = color;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, Math.PI * 2, false);
    ctx.fillStyle = "#2563eb";
    ctx.fill();
  }

  update() {
    if (this.x > canvas.width || this.x < 0) {
      this.dirX = -this.dirX;
    }
    if (this.y > canvas.height || this.y < 0) {
      this.dirY = -this.dirY;
    }

    let dX = mouse.x - this.x;
    let dY = mouse.y - this.y;
    let distance = Math.sqrt(dX * dX + dY * dY);
    if (distance < mouse.radius + this.size) {
      if (mouse.x < this.x && this.x < canvas.width - this.size * 10) {
        this.x += 5;
      }
      if (mouse.x > this.x && this.x > this.size * 10) {
        this.x -= 5;
      }
      if (mouse.y < this.y && this.y < canvas.height - this.size * 10) {
        this.y += 5;
      }
      if (mouse.y > this.y && this.y > this.size * 10) {
        this.y -= 5;
      }
    }
    this.x += this.dirX;
    this.y += this.dirY;
    this.draw();
  }
}

function connect() {
  let opacityValue;
  for (let i = 0; i < particlesArray.length; i++) {
    for (let j = i; j < particlesArray.length; j++) {
      let distance =
        (particlesArray[i].x - particlesArray[j].x) *
          (particlesArray[i].x - particlesArray[j].x) +
        (particlesArray[i].y - particlesArray[j].y) *
          (particlesArray[i].y - particlesArray[j].y);

      if (distance < (canvas.width / 8) * (canvas.height / 8)) {
        opacityValue = 1 - distance / 14000;
        ctx.strokeStyle = `rgba(37, 99, 235, ${opacityValue})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
        ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
        ctx.stroke();
      }
    }
  }
}

function init() {
  particlesArray = [];
  let numberOfParticles = (canvas.height * canvas.width) / 12000;
  for (let i = 0; i < numberOfParticles; i++) {
    let size = Math.random() * 4.5 + 1;
    let x = Math.random() * (innerWidth - size * 2 - size * 2) + size * 2;
    let y = Math.random() * (innerHeight - size * 2 - size * 2) + size * 2;
    let dirX = Math.random() * 5 - 2.5;
    let dirY = Math.random() * 5 - 2.5;
    let color = "#2563eb70";

    particlesArray.push(new Particle(x, y, dirX, dirY, size, color));
  }
}

function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, innerWidth, innerHeight);

  for (let i = 0; i < particlesArray.length; i++) {
    particlesArray[i].update();
  }

  connect();
}

init();
animate();
