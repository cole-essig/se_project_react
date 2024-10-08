export const weatherOptions = [
  {
    day: true,
    condition: "Clear",
    url: new URL('../assets/day/clear-day.svg', import.meta.url).href,
  },
  {
    day: false,
    condition: "Clear",
    url: new URL('../assets/night/clear-night.png', import.meta.url).href,
  },
  {
    day: true,
    condition: "Cloudy",
    url: new URL('../assets/day/cloudy-day.png', import.meta.url).href,
  },
  {
    day: false,
    condition: "Cloudy",
    url: new URL('../assets/night/cloudy-night.png', import.meta.url).href,
  },
  {
    day: true,
    condition: "Fog",
    url: new URL('../assets/day/fog-day.png', import.meta.url).href,
  },
  {
    day: false,
    condition: "Fog",
    url: new URL('../assets/day/fog-night.png', import.meta.url).href,
  },
  {
    day: true,
    condition: "Rain",
    url: new URL('../assets/day/rain-day.png', import.meta.url).href,
  },
  {
    day: false,
    condition: "Rain",
    url: new URL('../assets/night/rain-night.png', import.meta.url).href,
  },
  {
    day: true,
    condition: "Snow",
    url: new URL('../assets/day/snow-day.png', import.meta.url).href,
  },
  {
    day: false,
    condition: "Snow",
    url: new URL('../assets/night/snow-night.png', import.meta.url).href,
  },
  {
    day: true,
    condition: "Storm",
    url: new URL('../assets/day/storm-day.png', import.meta.url).href,
  },
  {
    day: false,
    condition: "Storm",
    url: new URL('../assets/night/storm-night.png', import.meta.url).href,
  },
]

export const defaultWeatherOption = {
  day: {
    url: new URL('../assets/day/default-day.png', import.meta.url).href,
    condition: "Day new banner type needed"
  },
  night: {
    url: new URL('../assets/night/default-night.png', import.meta.url).href,
    condition: "Night new banner type needed"
  },
}

export const defaultClothingItems = [
    {
      _id: 0,
      name: "Cap",
      weather: "hot",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Cap.png?etag=f3dad389b22909cafa73cff9f9a3d591",
    },
    {
      _id: 1,
      name: "Hoodie",
      weather: "warm",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Hoodie.png?etag=5f52451d0958ccb1016c78a45603a4e8",
    },
    {
      _id: 2,
      name: "Jacket",
      weather: "cold",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Jacket.png?etag=f4bb188deaa25ac84ce2338be2d404ad",
    },
    {
      _id: 3,
      name: "Sneakers",
      weather: "cold",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Sneakers.png?etag=3efeec41c1c78b8afe26859ca7fa7b6f",
    },
    {
      _id: 4,
      name: "T-Shirt",
      weather: "hot",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/T-Shirt.png?etag=44ed1963c44ab19cd2f5011522c5fc09",
    },
    {
      _id: 5,
      name: "Coat",
      weather: "cold",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Coat.png?etag=298717ed89d5e40b1954a1831ae0bdd4",
    }
  ]

  export const APIkey = "462019980d3556771cecc093fc03f2f7"
  export const latitude = "32.222607"
  export const longitude = "-110.974709"