document.addEventListener("DOMContentLoaded", () => {
    // Crear el canvas y configurarlo
    const canvas = document.getElementById('background-canvas');
    const ctx = canvas.getContext("2d");
    let canvasWidth = window.innerWidth;
    let canvasHeight = window.innerHeight;
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    // Definir los cuadrados con sus propiedades iniciales
    const squares = Array.from({ length: 50 }, () => ({
        x: Math.random() * canvasWidth,
        y: Math.random() * canvasHeight,
        size: Math.random() * 30 + 10,
        dx: Math.random() * 2 - 1,
        dy: Math.random() * 2 - 1
    }));

    // Redimensionar el canvas al cambiar el tamaño de la ventana
    function resizeCanvas() {
        canvasWidth = window.innerWidth;
        canvasHeight = window.innerHeight;
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
    }

    window.addEventListener("resize", resizeCanvas);

    // Dibujar los cuadrados en el canvas
    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpiar el canvas
        ctx.fillStyle = "#f3f3f3"; // Color de los cuadrados

        squares.forEach((square) => {
            ctx.fillRect(square.x, square.y, square.size, square.size);
        });
    }

    // Actualizar la posición de los cuadrados
    function update() {
        squares.forEach((square) => {
            square.x += square.dx;
            square.y += square.dy;

            // Rebote en los bordes
            if (square.x + square.size > canvasWidth || square.x < 0) {
                square.dx *= -1;
            }

            if (square.y + square.size > canvasHeight || square.y < 0) {
                square.dy *= -1;
            }
        });
    }

    // Función de animación
    function animate() {
        draw();
        update();
        requestAnimationFrame(animate);
    }

    animate();
    // Parte de transición
    const transitionSquare = document.createElement("div");
    transitionSquare.classList.add("transition-square");
    document.body.appendChild(transitionSquare);

    const links = document.querySelectorAll("a[href]");
    links.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const target = e.target.getAttribute("href");

            // Activar la transición
            transitionSquare.classList.add("active");

            setTimeout(() => {
                sessionStorage.setItem("transition", "true");
                window.location.href = target;
            }, 400); 
        });
    });

    // Verificar la transición al regresar a la página
    if (sessionStorage.getItem("transition") === "true") {
        sessionStorage.removeItem("transition");
        transitionSquare.classList.add("reverse", "active");

        setTimeout(() => {
            transitionSquare.classList.remove("reverse", "active");
        }, 400); 
    }
});

// Toggle del menú
document.getElementById('menu-button').addEventListener('click', () => {
    const menu = document.getElementById('mobile-menu');
    menu.classList.toggle('hidden');
});
