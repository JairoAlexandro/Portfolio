document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById('background-canvas');
    const ctx = canvas.getContext("2d");
    let canvasWidth = window.innerWidth;
    let canvasHeight = window.innerHeight;
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    const squares = Array.from({ length: 50 }, () => ({
        x: Math.random() * canvasWidth,
        y: Math.random() * canvasHeight,
        size: Math.random() * 30 + 10,
        dx: Math.random() * 2 - 1,
        dy: Math.random() * 2 - 1
    }));

    function resizeCanvas() {
        canvasWidth = window.innerWidth;
        canvasHeight = window.innerHeight;
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
    }

    window.addEventListener("resize", resizeCanvas);

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#f3f3f3";

        squares.forEach((square) => {
            ctx.fillRect(square.x, square.y, square.size, square.size);
        });
    }

    function update() {
        squares.forEach((square) => {
            square.x += square.dx;
            square.y += square.dy;

            if (square.x + square.size > canvasWidth || square.x < 0) {
                square.dx *= -1;
            }

            if (square.y + square.size > canvasHeight || square.y < 0) {
                square.dy *= -1;
            }
        });
    }

    function animate() {
        draw();
        update();
        requestAnimationFrame(animate);
    }

    animate();

    // Transition logic
    const transitionSquare = document.createElement("div");
    transitionSquare.classList.add("transition-square");
    document.body.appendChild(transitionSquare);

    const links = document.querySelectorAll("a[href]");
    const currentOrigin = window.location.origin;

    links.forEach(link => {
        link.addEventListener("click", (e) => {
            const href = link.href;

            // Check if the link is external
            const isExternal = link.target === "_blank" || (!href.startsWith(currentOrigin) && href.startsWith("http"));

            if (isExternal) return; // Skip external links

            // Prevent default behavior and start the transition
            e.preventDefault();
            transitionSquare.classList.add("active");

            setTimeout(() => {
                sessionStorage.setItem("transition", "true");
                window.location.href = href;
            }, 600); // Match your CSS transition duration
        });
    });

    if (sessionStorage.getItem("transition") === "true") {
        sessionStorage.removeItem("transition");
        transitionSquare.classList.add("reverse", "active");

        setTimeout(() => {
            transitionSquare.classList.remove("reverse", "active");
        }, 600); // Match your CSS transition duration
    }

    // Mobile menu toggle
    const menuButton = document.getElementById('menu-button');
    if (menuButton) {
        menuButton.addEventListener('click', () => {
            const menu = document.getElementById('mobile-menu');
            if (menu) {
                menu.classList.toggle('hidden');
            }
        });
    }
});
