const { Post } = require("../models");

const post_data = [
  {
    title: "Bubble Slides",
    content:
      "https://us.shein.com/Men-Hollow-Out-Bubble-Slides-p-11334508-cat-2307.html?url_from=adplasx2208131179711107EUR40-41_GPM&cid=15534601883&setid=&adid=&pf=GOOGLE&gclid=CjwKCAjw5P2aBhAlEiwAAdY7dHO9UO6E6bScYYUnPDpqQBru2CcR6iIMho8tnDbyGXRDiL9eb-hVsBoCSe8QAvD_BwE",
    user_id: 1,
  },
  {
    title: "PS5",
    content:
      "https://www.walmart.com/ip/Sony-PlayStation-PS5-Video-Game-Console-Digital-Edition-with-Horizon-Forbidden-West-Game-Bundle/1023057788?wmlspartner=wlpa&selectedSellerId=12643&adid=22222222227773285379&wl0=&wl1=g&wl2=c&wl3=626829714209&wl4=pla-1818864786438&wl5=9009564&wl6=&wl7=&wl8=&wl9=pla&wl10=117584344&wl11=online&wl12=1023057788&veh=sem&gclid=CjwKCAjw5P2aBhAlEiwAAdY7dMLR9_NTL5nRHRt2yaR3pLMR17ImjC8AgAwonz06DO69aGjla_NYvBoC6j4QAvD_BwE",
    user_id: 2,
  },
  {
    title: "Heated back and neck massager",
    content:
      "https://www.amazon.com/dp/B00BOYA2M2?tag=bfmelanie-20&ascsubtag=5756557%2C2%2C33%2Cd%2C0%2C0%2Cgoogle%2C776%3A1%3B962%3A1%3B901%3A2%3B900%3A2%3B974%3A3%3B994%3A3%2C15967436%2C0%2C0",
    user_id: 2,
  },
  {
    title: "Phone Soap",
    content:
      "https://www.amazon.com/dp/B072N9949C?tag=bfmelanie-20&ascsubtag=5756557%2C14%2C33%2Cd%2C0%2C0%2Cgoogle%2C776%3A1%3B962%3A1%3B901%3A2%3B900%3A2%3B974%3A3%3B994%3A3%2C15967692%2C0%2C0",
    user_id: 3,
  },
];

const seedUsers = () => Post.bulkCreate(post_data);

module.exports = seedUsers;
