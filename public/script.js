// Search function for filtering table rows based on input
function searchTable() {
    const input = document.getElementById("search").value.toUpperCase();
    const rows = document.querySelectorAll("#csvTableBody tr");

    rows.forEach(row => {
        const cells = Array.from(row.getElementsByTagName("td"));
        const match = cells.some(cell => cell.textContent.toUpperCase().includes(input));
        row.style.display = match ? "" : "none";
    });
}

// Sort function for sorting table by column
let sortOrder = 1;
function sortTable(columnName) {
    const table = document.getElementById("csvTableBody");
    const rows = Array.from(table.getElementsByTagName("tr"));

    rows.sort((a, b) => {
        const aText = a.querySelector(`[data-column="${columnName}"]`).textContent.trim();
        const bText = b.querySelector(`[data-column="${columnName}"]`).textContent.trim();

        return sortOrder * aText.localeCompare(bText);
    });

    sortOrder *= -1;
    rows.forEach(row => table.appendChild(row));
}

// Variables for pagination
const rowsPerPage = 10;
let currentPage = 1;

// Render pagination controls and display specific page
function renderPaginationControls(totalRows) {
    const paginationControls = document.getElementById("paginationControls");
    paginationControls.innerHTML = '';

    const totalPages = Math.ceil(totalRows / rowsPerPage);

    for (let i = 1; i <= totalPages; i++) {
        const button = document.createElement("button");
        button.textContent = i;
        button.classList.add('pagination-button');
        button.onclick = () => displayTablePage(i);
        paginationControls.appendChild(button);
    }
}

// Display specific page of the table
function displayTablePage(pageNumber) {
    const rows = Array.from(document.querySelectorAll("#csvTableBody tr"));
    const start = (pageNumber - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    rows.forEach((row, index) => {
        row.style.display = index >= start && index < end ? "" : "none";
    });

    currentPage = pageNumber;
}

// Initialize pagination on page load
window.onload = () => {
    const totalRows = document.querySelectorAll("#csvTableBody tr").length;
    renderPaginationControls(totalRows);
    displayTablePage(currentPage);
};

// Enhanced Chart generation function with X and Y axis selection
let chartInstance;

function generateChart() {
    // Get selected options and labels
    const xAxisColumn = document.getElementById("xAxisColumn").value;
    const yAxisColumn = document.getElementById("yAxisColumn").value;
    const chartType = document.getElementById("chartType").value;

    // Populate labels and data for the selected X and Y columns
    const rows = Array.from(document.querySelectorAll("#csvTableBody tr"));
    const labels = []; // For X-axis labels
    const data = [];   // For Y-axis data

    rows.forEach(row => {
        const xCell = row.querySelector(`[data-column="${xAxisColumn}"]`);
        const yCell = row.querySelector(`[data-column="${yAxisColumn}"]`);

        if (xCell && yCell) {
            labels.push(xCell.textContent);  // Use X-axis column as labels
            data.push(parseFloat(yCell.textContent) || 0);  // Use Y-axis column as data
        }
    });

    // Destroy previous chart instance if it exists
    if (chartInstance) {
        chartInstance.destroy();
    }

    // Create new chart instance
    const ctx = document.getElementById("myChart").getContext("2d");
    chartInstance = new Chart(ctx, {
        type: chartType,
        data: {
            labels: labels,
            datasets: [{
                label: yAxisColumn,
                data: data,
                backgroundColor: "rgba(75, 192, 192, 0.2)",
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    title: {
                        display: true,
                        text: xAxisColumn
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: yAxisColumn
                    },
                    beginAtZero: true
                }
            }
        }
    });

    // Show the modal
    document.getElementById("chartModal").style.display = "block";
}

function closeChartModal() {
    document.getElementById("chartModal").style.display = "none";
}
