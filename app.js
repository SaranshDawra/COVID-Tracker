// Initialize Stat
const stat = new Stat();

const App = (function() {
    return {
        init: function() {
            document.querySelector('.alert').style.display = 'none';
            stat.getStat()
            .then( data => {
                // Get world Stat
                const worldDataConfirmed = data.worldData.confirmed.value;
                const worldDataRecovered = data.worldData.recovered.value;
                const worldDataDeath = data.worldData.deaths.value;

                // Display World Stat
                document.querySelector('.cardWorldConfirmed').textContent = `Confirmed Cases of COVID19 are : ${worldDataConfirmed}`;
                document.querySelector('.cardWorldRecovered').textContent = `Recovered Cases of COVID19 are : ${worldDataRecovered}`;
                document.querySelector('.cardWorldDeaths').textContent = `Deaths due to COVID19 till now are: ${worldDataDeath}`;

                // Display India Stat
                const indiaDataConfirmed = data.indiaData.confirmed.value;
                const indiaDataRecovered = data.indiaData.recovered.value;
                const indiaDataDeath = data.indiaData.deaths.value;

                // Display India Stat
                document.querySelector('.cardCountryConfirmed').textContent = `Confirmed Cases of COVID19 are : ${indiaDataConfirmed}`;
                document.querySelector('.cardCountryRecovered').textContent = `Recovered Cases of COVID19 are : ${indiaDataRecovered}`;
                document.querySelector('.cardCountryDeaths').textContent = `Deaths due to COVID19 till now are: ${indiaDataDeath}`;

                // Initialize the country selection list
                let html = '';
                const countries = data.countryName.countries;
                const keys = Object.keys(countries);
                for(const key of keys){
                    if(key === 'India'){
                        html+= `<option selected>${key}</option>`;
                    }
                    else{
                        html+= `<option>${key}</option>`;
                    }
                }
                document.getElementById('selectCountry').innerHTML = html;

                document.getElementById('selectCountry').addEventListener('change', function(e){
                    const selectedCountry = document.getElementById('selectCountry').value;
                    document.getElementById('countryStat').textContent = `Country Stats: ${selectedCountry}`;
                    stat.getCountryStat(countries[selectedCountry])
                    .then( data => {
                        if(data.hasOwnProperty('error')){
                            document.querySelector('.alert').style.display = 'block';
                            document.querySelector('.countryRow').style.display = 'none';
                            setTimeout(function(){
                                document.querySelector('.alert').style.display = 'none';
                                document.getElementById('selectCountry').value = 'India';
                                document.getElementById('countryStat').textContent = 'Country Stats: India';
                                document.querySelector('.countryRow').style.display = 'flex';
                            }, 3000);
                        }
                        else{
                            const countryDataConfirmed = data.confirmed.value;
                            const countryDataRecovered = data.recovered.value;
                            const countryDataDeath = data.deaths.value;

                            // Display Selected Country Stat
                            document.querySelector('.cardCountryConfirmed').textContent = `Confirmed Cases of COVID19 are : ${countryDataConfirmed}`;
                            document.querySelector('.cardCountryRecovered').textContent = `Recovered Cases of COVID19 are : ${countryDataRecovered}`;
                            document.querySelector('.cardCountryDeaths').textContent = `Deaths due to COVID19 till now are: ${countryDataDeath}`;
                        }
                    });
                    e.preventDefault();
                });
            }
            );
        }
    }
})();

App.init();
