# Compound Interest Calculator

A web application built with Next.js that calculates compound interest by consuming an external API. This project provides a user-friendly interface to input financial data and displays detailed results, including a monthly breakdown of investments and interest accumulation.


## Features

- **Compound Interest Calculation**: Compute total value, invested amount, and interest earned over time.
- **Monthly Breakdown**: View detailed monthly progress including interest amounts and accumulated totals.
- **Currency Formatting**: Results formatted in Brazilian Real (BRL) for clarity.
- **Error Handling**: Displays user-friendly error messages for API failures.

## Technologies Used

- **Next.js**: React framework for server-side rendering and static site generation.
- **React**: UI library for building interactive components.
- **TypeScript**: Adds static typing for improved code quality (used in type annotations).
- **HTML/CSS**: Structure and styling of components (Tailwind CSS suggested by class names).
- **Internationalization API**: Formats currency values using `Intl.NumberFormat`.

## API Integration

The application fetches data from an external API endpoint hosted on Render:
- **Endpoint**: `https://cotacao.onrender.com/calculation`
- **Method**: `GET`
- **Parameters**:
  - `initial_value`: Initial investment amount.
  - `annual_interest`: Annual interest rate (percentage).
  - `months`: Investment duration in months.
  - `monthly_contribution`: Monthly contribution amount.

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/calculator.git
   cd calculator

Install dependencies:

```bash
Copy
npm install
# or
yarn install
Run the development server:

bash
Copy
npm run dev
# or
yarn dev
Open http://localhost:3000 in your browser.

Usage
Input Fields:

Initial Value: Starting capital (e.g., 1000).

Annual Interest: Yearly interest rate (e.g., 8 for 8%).

Months: Investment duration in months (e.g., 12).

Monthly Contribution: Monthly added amount (e.g., 100).

Submit the Form:

Click "Calculate" to see results displayed in two tables:

Summary: Total value, invested amount, and total interest.

Monthly Details: Interest accumulation and growth per month.

Project Structure
Key files/folders:

src/app/page.tsx: Main component with form handling and API integration.

src/app/global.css: Styling (if using CSS modules or Tailwind).

Contributing
Contributions are welcome! Follow these steps:

Fork the repository.

Create a feature branch (git checkout -b feature/amazing-feature).

Commit changes (git commit -m 'Add amazing feature').

Push to the branch (git push origin feature/amazing-feature).

Open a Pull Request.

License
Distributed under the MIT License. See LICENSE for details.
