document.addEventListener("DOMContentLoaded", () => {
  const countriesContainer = document.querySelector(".countries-section .row");
  const searchSection = document.querySelector(".search-section");
  const detailsSection = document.querySelector(".details");
  const searchInput = document.querySelector(".search-bar__input");
  const backBtn = document.querySelector(".details-btn");
  const darkModeBtn = document.querySelector(".top-bar__btn");
  const darkModeIcon = document.querySelector(".top-bar__icon");
  const darkModeText = document.querySelector(".top-bar__btn-text");
  const detailsTitle = document.querySelector(".details-title");
  const detailsImg = document.querySelector(".details-img");
  const detailsInfosLeft = document.querySelector(".details-infos-left");
  const detailsInfosRight = document.querySelector(".details-infos-right");
  const borderCountries = document.querySelector(".Border-countries");

  fetch("./js/data.json")
    .then((res) => res.json())
    .then((data) => {
      // 2️⃣ ساخت کارت‌ها
      const createCountryCard = (country) => `
        <div class="col-lg-3 col-md-4 col-sm-6 col-12">
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
        </div>
      `;

      countriesContainer.innerHTML = data.map(createCountryCard).join("");

      const savedMode = localStorage.getItem("theme");

      if (savedMode === "dark") {
        document.body.classList.add("dark-mode");
        darkModeIcon.classList.remove("bi-moon");
        darkModeIcon.classList.add("bi-sun");
        darkModeText.textContent = "Ligth Mode";
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
      document.body.style.visibility = "visible";

      searchInput.addEventListener("input", () => {
        const searchValue = searchInput.value.toLowerCase();
        const countriesCards = document.querySelectorAll(".country");
        countriesCards.forEach((card) => {
          const countryName = card
            .querySelector(".country__name")
            .textContent.toLowerCase();

          if (countryName.includes(searchValue)) {
            card.parentElement.style.display = "block";
          } else {
            card.parentElement.style.display = "none";
          }
        });
      });

      const countriesCards = document.querySelectorAll(".country");
      countriesCards.forEach((card) => {
        card.addEventListener("click", () => {
          countriesContainer.classList.add("d-none");
          detailsSection.classList.remove("d-none");
          searchSection.classList.add("d-none");

          const getName = card.querySelector(".country__name").textContent;
          const selectedCountry = data.find(
            (country) => country.name === getName
          );

          detailsTitle.textContent = selectedCountry.name;
          detailsImg.src = selectedCountry.flags.png;
          detailsImg.alt = selectedCountry.name;

          detailsInfosLeft.innerHTML = "";
          detailsInfosLeft.insertAdjacentHTML(
            "beforeend",
            `
            <p class="country__info">
              Native Name: <span class="country__info-desc">${
                selectedCountry.nativeName
              }</span>
            </p>
            <p class="country__info">
              Population: <span class="country__info-desc">${selectedCountry.population.toLocaleString()}</span>
            </p>
            <p class="country__info">
              Region: <span class="country__info-desc">${
                selectedCountry.region
              }</span>
            </p>
            <p class="country__info">
              Sub Region: <span class="country__info-desc">${
                selectedCountry.subregion
              }</span>
            </p>
            <p class="country__info">
              Capital: <span class="country__info-desc">${
                selectedCountry.capital
              }</span>
            </p>
          `
          );

          detailsInfosRight.innerHTML = "";
          detailsInfosRight.insertAdjacentHTML(
            "beforeend",
            `
            <p class="country__info">
              Top Level Domain: <span class="country__info-desc">${selectedCountry.topLevelDomain.join(
                ", "
              )}</span>
            </p>
            <p class="country__info">
              Currencies: <span class="country__info-desc">${selectedCountry.currencies
                .map((c) => c.name)
                .join(", ")}</span>
            </p>
            <p class="country__info">
              Languages: <span class="country__info-desc">${selectedCountry.languages
                .map((l) => l.name)
                .join(", ")}</span>
            </p>
          `
          );

          // Border Countries
          borderCountries.innerHTML =
            '<p class="country__info">Border Countries: </p>';
          if (selectedCountry.borders && selectedCountry.borders.length > 0) {
            selectedCountry.borders.forEach((border) => {
              borderCountries.insertAdjacentHTML(
                "beforeend",
                `
              <span class="country__info-desc box">${border}</span>
            `
              );
            });
          } else {
            borderCountries.insertAdjacentHTML(
              "beforeend",
              `
                <span class='country__info-desc box'>   No borders</span>
                `
            );
          }
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
