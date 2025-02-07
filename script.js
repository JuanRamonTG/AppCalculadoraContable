document.getElementById("salaryForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const salary = parseFloat(document.getElementById("salary").value);
    const isss = Math.min(salary * 0.03, 30);  // ISSS con techo de $30
    const afp = salary * 0.0725;  // AFP 7.25%
    const rentaImponible = salary - isss - afp;
    let renta = 0;

    // Cálculo de renta según tramos
    if (rentaImponible > 2038.10) {
        renta = (rentaImponible - 2038.10) * 0.30 + 288.57;
    } else if (rentaImponible > 895.24) {
        renta = (rentaImponible - 895.24) * 0.20 + 60.00;
    } else if (rentaImponible > 472.00) {
        renta = (rentaImponible - 472.00) * 0.10 + 17.67;
    }

    const isssPatronal = salary * 0.075; // ISSS Patronal 7.5%
    const afpPatronal = salary * 0.0875; // AFP Patronal 8.75%

    // Cálculo de totales
    const totalDeductions = isss + afp + renta;
    const netSalary = salary - totalDeductions;

    // Mostrar resultados
    document.getElementById("afp").textContent = `$${afp.toFixed(2)}`;
    document.getElementById("isss").textContent = `$${isss.toFixed(2)}`;
    document.getElementById("renta").textContent = `$${renta.toFixed(2)}`;
    document.getElementById("afpPatronal").textContent = `$${afpPatronal.toFixed(2)}`;
    document.getElementById("isssPatronal").textContent = `$${isssPatronal.toFixed(2)}`;
    document.getElementById("isssTotal").textContent = `$${(isss + isssPatronal).toFixed(2)}`;
    document.getElementById("afpTotal").textContent = `$${(afp + afpPatronal).toFixed(2)}`;
    document.getElementById("totalDeductions").textContent = `$${totalDeductions.toFixed(2)}`;
    document.getElementById("netSalary").textContent = `$${netSalary.toFixed(2)}`;

   // Mostrar el formulario de resultados
   document.getElementById('resultForm').style.display = 'block';
});
