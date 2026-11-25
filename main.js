
// ---- Events ----
const EVENTS = [
    {
        date: "2026-11-08",
        title: "Thanksgiving Service",
        time: "9:00 AM",
        desc: "A morning of praise and gratitude to God for His faithfulness this year.",
        tag: "Sunday"
    },
    {
        date: "2026-11-20",
        title: "Night Vigil",
        time: "10:00 PM",
        desc: "An all-night gathering for prayer, psalms and intercession.",
        tag: "Vigil"
    },
    {
        date: "2026-12-13",
        title: "Harvest & Cantata",
        time: "10:00 AM",
        desc: "Songs, offerings and testimonies to close the year.",
        tag: "Special"
    },
    {
        date: "2026-12-31",
        title: "Crossover Service",
        time: "9:00 PM",
        desc: "Step into the new year in prayer and thanksgiving.",
        tag: "Special"
    }
];

const MONTHS = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

// ---- Upcoming Events ----
const list = document.getElementById("events");

if (list) {
    // Get today's date using local time
    const now = new Date();

    const today = [
        now.getFullYear(),
        String(now.getMonth() + 1).padStart(2, "0"),
        String(now.getDate()).padStart(2, "0")
    ].join("-");

    // Filter and sort upcoming events
    const upcoming = EVENTS
        .filter(event => event.date >= today)
        .sort((a, b) => a.date.localeCompare(b.date));

    if (upcoming.length) {
        list.innerHTML = upcoming.map(event => {
            const date = new Date(event.date + "T00:00:00");

            return `
                <article class="event">
                    <div class="date">
                        <b>${date.getDate()}</b>
                        <span>${MONTHS[date.getMonth()]}</span>
                    </div>

                    <div>
                        <h3>${event.title}</h3>
                        <p>${event.time} – ${event.desc}</p>
                    </div>

                    <span class="tag">${event.tag}</span>
                </article>
            `;
        }).join("");
    } else {
        list.innerHTML = `
            <p>No events are scheduled right now. Please check back soon.</p>
        `;
    }
}

// ---- Mobile Menu ----
const btn = document.querySelector(".menu-btn");
const menu = document.getElementById("menu");

if (btn && menu) {
    btn.addEventListener("click", () => {
        const isOpen = menu.classList.toggle("open");

        btn.setAttribute("aria-expanded", isOpen);
    });

    // Close menu after clicking a navigation link
    menu.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            menu.classList.remove("open");
            btn.setAttribute("aria-expanded", "false");
        });
    });
}

// ---- Contact Form ----
// Front-end only: connect to Formspree, EmailJS or your backend
const form = document.getElementById("contact-form");

if (form) {
    form.addEventListener("submit", event => {
        event.preventDefault();

        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        const message = document.getElementById("form-msg");

        if (message) {
            const firstName = form.elements.name.value.trim().split(" ")[0];

            message.textContent =
                `Thank you, ${firstName}. Your message has been received and we will reply soon.`;

            message.classList.add("show");
        }

        form.reset();
    });
}

// ---- Automatic Copyright Year ----
document.querySelectorAll(".year").forEach(element => {
    element.textContent = new Date().getFullYear();
});
