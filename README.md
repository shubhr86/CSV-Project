# CSV Reader Project

This project is a simple CSV file reader with chart generation capabilities, built using Node.js, Express, and Chart.js. Users can upload CSV files, view the data in a table format, and generate customizable charts based on the uploaded data.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [File Structure](#file-structure)
- [License](#license)

## Features

- Upload CSV files and view the data in a table.
- Select columns for generating different types of charts (Bar, Line, Pie).
- Customizable X and Y axes labels for charts.
- Responsive and user-friendly UI.

## Tech Stack

- **Backend**: Node.js, Express.js
- **Frontend**: HTML, CSS (Bootstrap), JavaScript (Chart.js)
- **Templating Engine**: EJS

## Installation

Follow these steps to set up the project on your local system.

### Prerequisites

- [Node.js](https://nodejs.org/en/download/) (v12 or higher)
- [Git](https://git-scm.com/downloads) (optional, for cloning the repository)

### Steps

1. **Clone the repository** (if using Git):
   ```bash
   git clone https://github.com/shubhr86/CSV-Project.git
   ```
   Alternatively, download the project as a ZIP file and extract it.

2. **Navigate to the project directory**:
   ```bash
   cd csv-reader
   ```

3. **Install dependencies**:
   ```bash
   npm install
   ```
   This will install all the required dependencies listed in the `package.json` file.

## Usage

1. **Start the server**:
   ```bash
   npm start
   ```
   This will start the server on `http://localhost:3000`.

2. **Open the application**:
   Open your browser and go to `http://localhost:3000` to view the app.

3. **Upload a CSV file**:
   - Click on "Upload CSV File" and select a CSV file (up to 5 MB).
   - After uploading, the file will appear in a list of uploaded files.

4. **View CSV Data**:
   - Click on a file name to view its contents in a table format.

5. **Generate Charts**:
   - Use the dropdowns to select X and Y axes from the table columns.
   - Choose a chart type (Bar, Line, or Pie) and customize the labels.
   - Click "Generate Chart" to view the chart in a modal window.

## File Structure

- **/public**: Contains static assets like CSS, JavaScript files, and images.
- **/views**: Contains EJS templates for rendering the frontend.
- **app.js**: Main entry point of the application, where Express is configured.
- **package.json**: Lists dependencies and project metadata.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

---

### Notes

1. **Validating CSV Files**: The app only accepts `.csv` files up to 5 MB.
2. **No Database**: This project does not use a database. Uploaded files and chart data are processed in memory.
3. **Deployment**: For deploying this project, you can use free hosting services like Vercel, Netlify (for static sites), or Render.

