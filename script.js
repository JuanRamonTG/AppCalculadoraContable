document.getElementById("salaryForm").addEventListener("submit", function(event) {
    event.preventDefault();
    
    // Obtén el sueldo
    let salary = parseFloat(document.getElementById("salary").value);

    if (isNaN(salary) || salary <= 0) {
        alert("Por favor, ingresa un salario válido.");
        return;
    }
    
    // Calcular el descuento ISSS (máximo $30)
    let isss = Math.min(salary * 0.03, 30);

    // Calcular el descuento AFP
    let afp = salary * 0.0725;

    // Calcular renta
    let renta = 0;
    let sueldoGravado = salary - isss - afp;

    if (sueldoGravado > 2038.1) {
        renta = (sueldoGravado - 2038.1) * 0.30 + 288.57;
    } else if (sueldoGravado > 895.24) {
        renta = (sueldoGravado - 895.24) * 0.20 + 60;
    } else if (sueldoGravado > 472) {
        renta = (sueldoGravado - 472) * 0.10 + 17.67;
    }

    // Calcular descuentos patronales
    let afpPatronal = salary * 0.0875; // 8.75%
    let isssPatronal = salary > 1000 ? 75 : salary * 0.075; // ISSS patronal con límite de $75

    // Cálculos Totales
    let isssTotal = isss + isssPatronal;
    let afpTotal = afp + afpPatronal;
    let totalDeductions = isss + afp + renta;
    let netSalary = salary - totalDeductions;

    // Mostrar resultados
    document.getElementById("afp").textContent = afp.toFixed(2);
    document.getElementById("isss").textContent = isss.toFixed(2);
    document.getElementById("renta").textContent = renta.toFixed(2);
    document.getElementById("afpPatronal").textContent = afpPatronal.toFixed(2);
    document.getElementById("isssPatronal").textContent = isssPatronal.toFixed(2);
    document.getElementById("isssTotal").textContent = isssTotal.toFixed(2);
    document.getElementById("afpTotal").textContent = afpTotal.toFixed(2);
    document.getElementById("totalDeductions").textContent = totalDeductions.toFixed(2);
    document.getElementById("netSalary").textContent = netSalary.toFixed(2);

    // Mostrar el formulario de resultados
    document.getElementById("resultForm").style.display = "block";
});

// Generar archivo Excel
document.getElementById("generateExcelBtn").addEventListener("click", function() {
    // Obtener los datos de los resultados
    const nombre = document.getElementById("name").value;
    const apellido = document.getElementById("surname").value;
    const cargo = document.getElementById("position").value;
    const sueldo = document.getElementById("salary").value;
    const afp = document.getElementById("afp").textContent;
    const isss = document.getElementById("isss").textContent;
    const renta = document.getElementById("renta").textContent;
    const afpPatronal = document.getElementById("afpPatronal").textContent;
    const isssPatronal = document.getElementById("isssPatronal").textContent;
    const isssTotal = document.getElementById("isssTotal").textContent;
    const afpTotal = document.getElementById("afpTotal").textContent;
    const totalDeductions = document.getElementById("totalDeductions").textContent;
    const netSalary = document.getElementById("netSalary").textContent;

    // Crear una hoja de trabajo de Excel
    const wb = XLSX.utils.book_new();
    const ws_data = [
        ["Nombre", "Apellido", "Cargo", "Sueldo", "AFP", "ISSS", "Renta", "AFP Patronal", "ISSS Patronal", "ISSS Total", "AFP Total", "Descuentos Totales", "Salario Líquido"],
        [nombre, apellido, cargo, sueldo, afp, isss, renta, afpPatronal, isssPatronal, isssTotal, afpTotal, totalDeductions, netSalary]
    ];

    const ws = XLSX.utils.aoa_to_sheet(ws_data);
    XLSX.utils.book_append_sheet(wb, ws, "Resultados");

    // Descargar el archivo Excel
    XLSX.writeFile(wb, "resultados_salarios.xlsx");
});
