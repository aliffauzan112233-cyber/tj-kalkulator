const display = document.getElementById("display");

/* ================= INPUT ================= */

function appendValue(value) {
    if (display.value === "0" || display.value === "") {
        display.value = value;
    } else {
        display.value += value;
    }
}

/* ================= CLEAR ================= */

function clearDisplay() {
    display.value = "";
}

/* ================= DELETE LAST ================= */

function clearLast() {
    display.value = display.value.slice(0, -1);
}

/* ================= CALCULATE ================= */

function calculate() {
    try {
        if (display.value.trim() === "") return;
        const result = eval(display.value);
        display.value = result;
    } catch (error) {
        display.value = "Error";
    }
}

/* ================= KEYBOARD SUPPORT ================= */

document.addEventListener("keydown", function (e) {
    const key = e.key;

    if (!isNaN(key) || ["+", "-", "*", "/", "."].includes(key)) {
        appendValue(key);
    }

    if (key === "Enter") {
        calculate();
    }

    if (key === "Backspace") {
        clearLast();
    }

    if (key === "Escape") {
        clearDisplay();
    }
});