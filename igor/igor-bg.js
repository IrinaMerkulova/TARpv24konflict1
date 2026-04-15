(function() {
    const container = document.querySelector('.igor-osa');
    if (!container) return;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.zIndex = '0';
    canvas.style.pointerEvents = 'none';

    container.prepend(canvas);

    let letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$+-*/=%\"'#&_(),.;:?!\\|{}<>[]^~";
    letters = letters.split("");

    let fontSize = 14;
    let columns = 0;
    let drops = [];

    function resize() {
        canvas.width = container.offsetWidth;
        canvas.height = container.offsetHeight;
        columns = Math.floor(canvas.width / fontSize);
        drops = [];
        for (let x = 0; x < columns; x++) {
            drops[x] = Math.random() * -100; // Juhuslik alguspunkt, et kõik ei langeks korraga
        }
    }

    window.addEventListener('resize', resize);
    resize();

    function draw() {
        // Must läbipaistev kiht, mis tekitab sümbolitele "saba"
        ctx.fillStyle = "rgba(10, 10, 10, 0.1)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Sümbolite stiil (punane tint, mida soovisid)
        ctx.fillStyle = "#e01515";
        ctx.font = fontSize + "px Courier New";

        for (let i = 0; i < drops.length; i++) {
            // Vali suvaline sümbol
            const text = letters[Math.floor(Math.random() * letters.length)];

            // Joonista sümbol
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);

            // Kui sümbol jõuab põhja, siis suuna see juhuslikult tagasi üles
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }

            drops[i]++;
        }
    }

    // Kiirus (FPS)
    setInterval(draw, 33);
})();
// ClickSpark Vanilla JS implementatsioon Igori sektsiooni jaoks
(function() {
    const container = document.querySelector('.igor-osa');
    const canvas = container.querySelector('canvas'); // Kasutame olemasolevat canvast
    const ctx = canvas.getContext('2d');

    let sparks = [];
    const sparkConfig = {
        color: '#e01515', // Sinu punane tint
        size: 15,
        radius: 25,
        count: 10,
        duration: 500
    };

    // Easing funktsioon (ease-out sarnane)
    const easeOut = t => t * (2 - t);

    container.addEventListener('click', (e) => {
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const now = performance.now();

        for (let i = 0; i < sparkConfig.count; i++) {
            sparks.push({
                x,
                y,
                angle: (2 * Math.PI * i) / sparkConfig.count,
                startTime: now
            });
        }
    });

    // Täiendame olemasolevat draw funktsiooni või loome uue animaatori
    function animateSparks(timestamp) {
        // Me ei tee ctx.clearRect siin, sest igor-bg.js draw() teeb seda juba

        sparks = sparks.filter(spark => {
            const elapsed = timestamp - spark.startTime;
            if (elapsed >= sparkConfig.duration) return false;

            const progress = elapsed / sparkConfig.duration;
            const eased = easeOut(progress);

            const distance = eased * sparkConfig.radius;
            const lineLength = sparkConfig.size * (1 - eased);

            const x1 = spark.x + distance * Math.cos(spark.angle);
            const y1 = spark.y + distance * Math.sin(spark.angle);
            const x2 = spark.x + (distance + lineLength) * Math.cos(spark.angle);
            const y2 = spark.y + (distance + lineLength) * Math.sin(spark.angle);

            ctx.strokeStyle = sparkConfig.color;
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.stroke();

            return true;
        });

        requestAnimationFrame(animateSparks);
    }

    requestAnimationFrame(animateSparks);
})();