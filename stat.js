class Stat{
    async getStat(){
        const worldStatResponse = await fetch('https://covid19.mathdro.id/api/');
        const countryResponse = await fetch('https://covid19.mathdro.id/api/countries');
        const indiaResponse = await fetch(`https://covid19.mathdro.id/api/countries/India`);
        const indiaData = await indiaResponse.json();
        const worldStatData = await worldStatResponse.json();
        const countryName = await countryResponse.json();

        return {
            worldData: worldStatData,
            countryName: countryName,
            indiaData: indiaData
        }
    }
    async getCountryStat(country){
        console.log(country);
        const countryStatResponse = await fetch(`https://covid19.mathdro.id/api/countries/${country}`);
        const countryData = await countryStatResponse.json();
        return countryData;
    }
}
