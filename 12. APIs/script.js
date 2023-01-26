const city = "Warrington";
const countryCode = "GB";
const apiKey = "5535ef8ca0e0e33a597c83028393f925";

geoCoordinates = `http://api.openweathermap.org/geo/1.0/direct?q=${city},${countryCode}&limit=5&appid=${apiKey}`;
// http://api.openweathermap.org/geo/1.0/direct?q=London,GB&limit=5&appid=d2a36e51d2d734ca7a9fd9403af33309