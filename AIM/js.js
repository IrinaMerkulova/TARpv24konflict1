// =========================
// PROJECTLIBRE INTERACTIVE JS
// =========================

const plFacts = [
    "ProjectLibre on tasuta alternatiiv Microsoft Projectile.",
    "Seda kasutatakse projektijuhtimises üle maailma.",
    "Toetab MS Project faile.",
    "On avatud lähtekoodiga tarkvara.",
    "Aitab hallata suuri projekte ja ressursse."
];

// создаём кнопку динамически (чтобы выглядело уникально)
const btn = document.createElement("button");
btn.innerText = "💡 Näita fakti ProjectLibre kohta";
btn.className = "pl-button";

const factBox = document.createElement("p");
factBox.className = "pl-fact";

document.addEventListener("DOMContentLoaded", () => {
    const section = document.querySelector(".pl-section");

    section.appendChild(btn);
    section.appendChild(factBox);

    btn.addEventListener("click", () => {
        const random = plFacts[Math.floor(Math.random() * plFacts.length)];
        factBox.textContent = random;
    });
});