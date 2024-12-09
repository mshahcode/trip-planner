document.addEventListener("DOMContentLoaded", () => {

    const countrySearchForm = document.getElementById('countrySearchForm');

    let data_url = "";

    countrySearchForm.addEventListener('submit', (e) => {
        e.preventDefault();

        if (!countrySearchForm.checkValidity()) {
            countrySearchForm.classList.add('was-validated');
            return;
        }

        document.getElementById('errorMessage').style.display = "none";
        loadingMessage.style.display = "block";

        const country = document.getElementById('destinationCountry').value;
        const countryTable = document.getElementById('countryTable')

        data_url = `https://restcountries.com/v3.1/name/${country}?fullText=true`;

        fetch(data_url)
            .then((response) => {
                loadingMessage.style.display = "none";
                if (!response.ok) {
                    if (response.status === 404) {
                        document.getElementById('errorMessage').innerText = "Country not found";
                    }
                    throw new Error("Country not found");
                }
                return response.json();
            })
            .then((data) => {
                loadingMessage.style.display = "none";
                addCountryRow(data);

            })
            .catch((error) => {
                document.getElementById('errorMessage').style.display = "block";
            })
        
        countrySearchForm.reset();
        countrySearchForm.classList.remove('was-validated');

    });


    function addCountryRow(data) {

        const countryBody = countryTable.querySelector('tbody');


        const newRow = document.createElement('tr');

        const currencies = data[0].currencies;
        const currencyKey = Object.keys(currencies)[0];
        const currencyValue = currencies[currencyKey].name + " (" + currencies[currencyKey].symbol + ")";

        const languages = data[0].languages;
        const languageKey = Object.keys(languages)[0];
        const languageValue = languages[languageKey];


        newRow.innerHTML = `
            <td><img src="${data[0].flags.png}"></td>
            <td>${data[0].name.common}</td>
            <td>${data[0].capital[0]}</td>
            <td>${data[0].region}</td>
            <td>${data[0].population.toLocaleString()}</td>
            <td>${currencyValue}</td>
            <td>${languageValue}</td>

        `;

        countryBody.appendChild(newRow);

    }
});