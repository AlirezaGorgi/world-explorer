document.addEventListener("DOMContentLoaded", () => {
  const countriesContainer = document.querySelector(".countries-grid");
  const searchSection = document.querySelector(".search-section");
  const detailsSection = document.querySelector(".details");
  const searchInput = document.querySelector(".search-bar__input");
  const backBtn = document.querySelector(".details-btn");
  const darkModeBtn = document.querySelector(".top-bar__btn");
  const darkModeIcon = document.querySelector(".top-bar__icon");
  const darkModeText = document.querySelector(".top-bar__btn-text");
  const regionFilters = document.querySelectorAll(".dropdown-item");
  const detailsTitle = document.querySelector(".details-title");
  const detailsImg = document.querySelector(".details-img");
  const detailsInfosLeft = document.querySelector(".details-infos-left");
  const detailsInfosRight = document.querySelector(".details-infos-right");
  const borderCountries = document.querySelector(".Border-countries");

  let selectedRegion = "All";
  let searchValue = "";

  // Fetch data
  fetch("./js/data.json")
    .then((res) => res.json())
    .then((data) => {
      function createCountryCard(country) {
        return `
          <div class="country">
            <div class="country__image">
              <img src="${country.flags.png}" alt="${
          country.name
        }" class="country__image-item"/>
            </div>
            <div class="country__content">
              <p class="country__name">${country.name}</p>
              <div class="country__desc">
                <p class="country__info">
                  Population: <span class="country__info-desc">${country.population.toLocaleString()}</span>
                </p>
                <p class="country__info">
                  Region: <span class="country__info-desc">${
                    country.region
                  }</span>
                </p>
                <p class="country__info">
                  Capital: <span class="country__info-desc">${
                    country.capital
                  }</span>
                </p>
              </div>
            </div>
          </div>
        `;
      }

      function updateCountries() {
        const countriesCards = document.querySelectorAll(".country");
        countriesCards.forEach((card) => {
          const countryName = card
            .querySelector(".country__name")
            .textContent.toLowerCase();
          const countryRegion = card
            .querySelectorAll(".country__info-desc")[1]
            .textContent.trim();
          const matchRegion =
            selectedRegion === "All" || countryRegion === selectedRegion;
          const matchSearch = countryName.startsWith(searchValue);
          card.style.display = matchRegion && matchSearch ? "block" : "none";
        });
      }

      function showCountryDetails(selectedCountry) {
        detailsTitle.textContent = selectedCountry.name;
        detailsImg.src = selectedCountry.flags.png;
        detailsImg.alt = selectedCountry.name;

        detailsInfosLeft.innerHTML = `
          <p class="country__info">Native Name: <span class="country__info-desc">${
            selectedCountry.nativeName
          }</span></p>
          <p class="country__info">Population: <span class="country__info-desc">${selectedCountry.population.toLocaleString()}</span></p>
          <p class="country__info">Region: <span class="country__info-desc">${
            selectedCountry.region
          }</span></p>
          <p class="country__info">Sub Region: <span class="country__info-desc">${
            selectedCountry.subregion
          }</span></p>
          <p class="country__info">Capital: <span class="country__info-desc">${
            selectedCountry.capital
          }</span></p>
        `;

        detailsInfosRight.innerHTML = `
          <p class="country__info">Top Level Domain: <span class="country__info-desc">${selectedCountry.topLevelDomain.join(
            ", "
          )}</span></p>
          <p class="country__info">Currencies: <span class="country__info-desc">${selectedCountry.currencies
            .map((c) => c.name)
            .join(", ")}</span></p>
          <p class="country__info">Languages: <span class="country__info-desc">${selectedCountry.languages
            .map((l) => l.name)
            .join(", ")}</span></p>
        `;

        borderCountries.innerHTML =
          '<p class="country__info">Border Countries: </p>';
        if (selectedCountry.borders && selectedCountry.borders.length > 0) {
          selectedCountry.borders.forEach((border) => {
            borderCountries.insertAdjacentHTML(
              "beforeend",
              `<span class="country__info-desc box">${border}</span>`
            );
          });
        } else {
          borderCountries.insertAdjacentHTML(
            "beforeend",
            `<span class='country__info-desc box'>No borders</span>`
          );
        }
      }

      function initDarkMode() {
        const savedMode = localStorage.getItem("theme");
        if (savedMode === "dark") {
          document.body.classList.add("dark-mode");
          darkModeIcon.classList.replace("bi-moon", "bi-sun");
          darkModeText.textContent = "Light Mode";
        }

        darkModeBtn.addEventListener("click", () => {
          document.body.classList.toggle("dark-mode");
          darkModeIcon.classList.toggle("bi-moon");
          darkModeIcon.classList.toggle("bi-sun");
          if (document.body.classList.contains("dark-mode")) {
            darkModeText.textContent = "Light Mode";
            localStorage.setItem("theme", "dark");
          } else {
            darkModeText.textContent = "Dark Mode";
            localStorage.setItem("theme", "light");
          }
        });
      }

      countriesContainer.innerHTML = data.map(createCountryCard).join("");
      initDarkMode();
      document.body.style.visibility = "visible";

      searchInput.addEventListener("input", (e) => {
        searchValue = e.target.value.toLowerCase();
        updateCountries();
      });

      regionFilters.forEach((item) => {
        item.addEventListener("click", (e) => {
          e.preventDefault();
          selectedRegion = item.dataset.region;
          searchInput.value = "";
          searchValue = "";
          const dropdownToggle = document.querySelector(
            ".search-bar__dropdown-btn"
          );
          dropdownToggle.textContent =
            selectedRegion === "All" ? "Filter by Region" : selectedRegion;
          updateCountries();
        });
      });

      document.querySelectorAll(".country").forEach((card) => {
        card.addEventListener("click", () => {
          countriesContainer.classList.add("d-none");
          detailsSection.classList.remove("d-none");
          searchSection.classList.add("d-none");
          const countryName = card.querySelector(".country__name").textContent;
          const selectedCountry = data.find((c) => c.name === countryName);
          showCountryDetails(selectedCountry);
        });
      });

      backBtn.addEventListener("click", () => {
        detailsSection.classList.add("d-none");
        countriesContainer.classList.remove("d-none");
        searchSection.classList.remove("d-none");
      });
    })
    .catch((err) => console.error("Error loading data:", err));
});
