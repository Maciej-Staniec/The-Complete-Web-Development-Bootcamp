const city = "Warrington";
const countryCode = "GB";
const apiKey = "5535ef8ca0e0e33a597c83028393f925";

geoCoordinates = `http://api.openweathermap.org/geo/1.0/direct?q=${city},${countryCode}&limit=5&appid=${apiKey}`;

console.log(geoCoordinates);
