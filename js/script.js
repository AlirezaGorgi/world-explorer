const detailsSection = Document.querySelector(".details");
const backbtn = Document.querySelector(".details-btn");

document.addEventListener("DOMContentLoaded", () => {
  const countriesContainer = document.querySelector(".countries-section .row");
  fetch("./js/data.json")
    .then((res) => res.json())
    .then((data) => {
      const createCountryCard = (country) => {
        return `
            <div class="col-lg-3 col-md-4 col-sm-6 col-12">
              <div class="country">
                <div class="country__image">
                  <img
                    src="${country.flags.png}"
                    alt="${country.name}"
                    class="country__image-item"
                  />
                </div>
                <div class="country__content">
                  <p class="country__name">${country.name}</p>
                  <div class="country__desc">
                    <p class="country__info">
                      Population:
                      <span class="country__info-desc">${country.population.toLocaleString()}</span>
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
      };
      countriesContainer.innerHTML = data.map(createCountryCard).join("");
      console.log(data);
    });
});
