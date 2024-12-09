# Travel Planner

Welcome to the **Travel Planner** project! This web application is designed to make trip planning easy, interactive, and efficient. Users can explore popular destinations, plan trips, search for country details, and more. The project is built using **HTML**, **CSS**, **JavaScript**, and **Bootstrap**, and integrates APIs to enhance functionality.

## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Setup Instructions](#setup-instructions)
- [Pages Overview](#pages-overview)
- [API Usage](#api-usage)
- [License](#license)

## Features
- **Home Page**: Displays popular travel destinations with cards and appealing visuals.
- **Plan Trip Page**:
  - Users can fill out a form to plan trips.
  - Data is dynamically added to a table.
  - Includes validation for dates and inputs.
- **Search Country Page**:
  - Users can search for country details using the [REST Countries API](https://restcountries.com/).
  - Displays information like flag, capital, region, population, currency, and languages.
- Responsive and mobile-friendly design.

## Technologies Used
- **HTML5**: Structure of the web pages.
- **CSS3**: Styling, including animations and responsiveness.
- **JavaScript**: Dynamic interactions and API integration.
- **Bootstrap 5**: Layout and UI components.
- **REST Countries API**: For country information.

## Setup Instructions
1. Clone this repository to your local machine:
   ```bash
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```bash
   cd <repository-directory>
   ```

3. Open `index.html` in your browser to view the application.

4. If hosting on GitHub Pages:
   - Push the project to a GitHub repository.
   - Go to the repository settings.
   - Under **Pages**, select the branch and root folder to host the project.

## Pages Overview

### Home Page (`index.html`)
- Features a hero section with a welcome message.
- Displays a grid of popular destinations with images and captions.

### Plan Trip Page (`planTrip.html`)
- Includes a form to plan trips.
- Form fields: Destination city, number of people, start date, end date, and travel type.
- Trip data is displayed in a table with a delete button for each row.
- Input validation for dates and required fields.

### Search Country Page (`searchCountry.html`)
- Includes a search bar to find country details.
- Fetches data from the REST Countries API.
- Displays country details in a table format with fields such as:
  - Flag
  - Country name
  - Capital
  - Region
  - Population
  - Currency
  - Languages

## API Usage
The project uses the [REST Countries API](https://restcountries.com/) to fetch details about countries. Example usage:

```javascript
fetch('https://restcountries.com/v3.1/name/Azerbaijan?fullText=true')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));
```

## License
This project is licensed under the MIT License. Feel free to use and modify it as per your needs.

---

Enjoy planning your trips with **Travel Planner**!
