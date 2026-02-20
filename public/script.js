const display = document.getElementById("display");

function appendValue(value) {
    // Hindari operator ganda di awal
    if (display.value === "" && ['+', '*', '/', '.'].includes(value)) return;
    
    // Logika ganti operator jika ditekan berurutan
    const lastChar = display.value.slice(-1);
    if (['+', '-', '*', '/'].includes(lastChar) && ['+', '-', '*', '/'].includes(value)) {
        display.value = display.value.slice(0, -1) + value;
        return;
    }

    display.value += value;
}

function clearDisplay() {
    display.value = "";
}

function clearLast() {
    display.value = display.value.slice(0, -1);
}

async function calculate() {
    try {
        const expression = display.value;
        if (!expression) return;

        // Hitung ekspresi
        let result = new Function('return ' + expression)();

        // Fix Floating Point (Pembulatan agar 0.1 + 0.2 = 0.3)
        if (!Number.isInteger(result)) {
            result = parseFloat(result.toFixed(8));
        }

        display.value = result;

        // Simpan ke database/backend
        await fetch("/save", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ expression, result })
        });

    } catch (error) {
        display.value = "Error";
        setTimeout(clearDisplay, 1500);
    }
}