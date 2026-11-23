import museoDelOroImage from "../images/places/bogota-museo-del-oro.jpg";
import museoBoteroImage from "../images/places/bogota-museo-botero.jpg";
import monserrateImage from "../images/places/bogota-monserrate.jpg";
import guadalupeImage from "../images/places/bogota-cerro-guadalupe.jpg";
import candelariaImage from "../images/places/bogota-candelaria-church.jpg";
import plazaBolivarImage from "../images/places/bogota-plaza-bolivar.jpg";

import zipaquiraCathedralImage from "../images/places/zipaquira-catedral-de-sal.jpg";
import zipaquiraTownImage from "../images/places/zipaquira-city-center.jpg";

import guatavitaTownImage from "../images/places/guatavita-town.jpg";
import guatavitaLagoonImage from "../images/places/guatavita-laguna-sagrada.jpg";

import villaDeLeyvaTownImage from "../images/places/villa-de-leyva-town-square.jpg";
import iguaqueImage from "../images/places/villa-de-leyva-iguaque.jpg";

import tatacoaImage from "../images/places/tatacoa-desert.jpg";
import villaviejaImage from "../images/places/tatacoa-villavieja.jpg";

import sanAgustinTownImage from "../images/places/san-agustin-city-center.jpg";
import estrechoImage from "../images/places/san-agustin-estrecho-del-magdalena.jpg";
import statuesImage from "../images/places/san-agustin-statues.jpg";

import raquiraImage from "../images/places/raquira-raquira.jpg";

const places = [
  // BOGOTÁ
  {
    id: "museo-del-oro",
    destination: "bogota",
    name: "Museo del Oro",
    category: "Museum",
    description:
      "Explore one of Colombia's most important collections of pre-Hispanic goldwork. The museum holds around 30,000 gold objects and 20,000 objects made from materials such as wood, stone, clay, and bone. Discover tumbaga, an alloy of gold and copper used by ancient goldworkers.",
    image: museoDelOroImage,
  },
  {
    id: "museo-botero",
    destination: "bogota",
    name: "Museo Botero",
    category: "Art Museum",
    description:
      "Discover the work of Colombian painter and sculptor Fernando Botero, known for his distinctive use of exaggerated proportions and volume. The collection includes 123 of his own artworks and 87 works by other artists, including Monet, Degas, and Caillebotte.",
    image: museoBoteroImage,
  },
  {
    id: "monserrate",
    destination: "bogota",
    name: "Monserrate",
    category: "Mountain & Sanctuary",
    description:
      "Rising above Bogotá, Monserrate has a history that goes beyond its famous religious sanctuary. Its name comes from the Black Madonna of Montserrat in Catalonia. The original statue on the mountain was a representation of the Virgin Mary before it was replaced by the Lord of Monserrate.",
    image: monserrateImage,
  },
  {
    id: "guadalupe",
    destination: "bogota",
    name: "Guadalupe",
    category: "Mountain & Sanctuary",
    description:
      "Guadalupe is one of the mountains overlooking Bogotá. Together with Monserrate, it was a sacred place for the Muisca people before the arrival of the Spanish. These mountains were associated with balance, reflection, and closeness to the gods. Today, Guadalupe is marked by a 15-metre statue of the Immaculate Conception.",
    image: guadalupeImage,
  },
  {
    id: "la-candelaria",
    destination: "bogota",
    name: "La Candelaria",
    category: "Historic Neighbourhood",
    description:
      "Explore the historic neighbourhood of La Candelaria, named after the Church of Nuestra Señora de la Candelaria. The Augustinian order began establishing a religious presence here in the 17th century. After several changes and reconstruction, the church was inaugurated in 1703.",
    image: candelariaImage,
  },
  {
    id: "plaza-de-bolivar",
    destination: "bogota",
    name: "Plaza de Bolívar",
    category: "Historic Square",
    description:
      "Visit Bogotá's main square, where the city is traditionally said to have been officially founded on 6 August 1538. Following the Spanish colonial grid layout, the main square was surrounded by important institutions, including the cathedral, government buildings, shops, and houses.",
    image: plazaBolivarImage,
  },
  // ZIPAQUIRÁ
  {
    id: "catedral-de-sal",
    destination: "zipaquira",
    name: "Catedral de Sal",
    category: "Religious & Cultural Site",
    description:
      "Built inside an underground salt mine, the Salt Cathedral reflects Zipaquirá's long history of salt extraction. The Muisca people mined salt in this region before the arrival of the Spanish, using it as a valuable trade good. The cathedral developed from the miners' religious traditions and their devotion while working underground.",
    image: zipaquiraCathedralImage,
  },
  {
    id: "zipaquira-centro",
    destination: "zipaquira",
    name: "Historic Town Centre",
    category: "Historic Centre",
    description:
      "Known as the City of Salt, Zipaquirá was an important centre of salt extraction and trade during the Muisca period. Its historic town centre is recognised as part of Colombia's cultural heritage and offers a glimpse into the town's colonial history.",
    image: zipaquiraTownImage,
  },
  // GUATAVITA
  {
    id: "guatavita-town",
    destination: "guatavita",
    name: "Guatavita",
    category: "Historic Town",
    description:
      "The present-day town of Guatavita was relocated when the Tominé Reservoir was built. The reservoir was developed for water management, including flood prevention and improving water quality. The area also offers a connection to the history and cultural heritage of the Muisca people.",
    image: guatavitaTownImage,
  },
  {
    id: "laguna-sagrada-de-guatavita",
    destination: "guatavita",
    name: "Sacred Lagoon of Guatavita",
    category: "Cultural & Natural Site",
    description:
      "The Sacred Lagoon of Guatavita is closely connected to the Muisca legend of El Dorado. According to the traditional account, a newly appointed leader covered in gold dust travelled by raft to the centre of the lagoon and offered gold objects and emeralds to the water. The ceremony reflected the spiritual importance of water in the Muisca worldview.",
    image: guatavitaLagoonImage,
  },

  // VILLA DE LEYVA
  {
    id: "villa-de-leyva-centro-historico",
    destination: "villa-de-leyva",
    name: "Historic Centre of Villa de Leyva",
    category: "Historic Town",
    description:
      "Villa de Leyva is known for its well-preserved colonial architecture and its impressive main square, which covers approximately 14,000 square metres. Declared a national monument in 1954, the town is also notable for fossils found in the surrounding area and even in some of the stones used in the square.",
    image: villaDeLeyvaTownImage,
  },
  {
    id: "laguna-de-iguaque",
    destination: "villa-de-leyva",
    name: "Laguna de Iguaque",
    category: "Natural & Cultural Site",
    description:
      "According to Muisca tradition, the story of Bachué and her child is connected to the origin of the Muisca people. The legend begins at the sacred waters of Iguaque, where Bachué emerged with a child who would become the ancestor of the people.",
    image: iguaqueImage,
  },

  // TATACOA
  {
    id: "villavieja",
    destination: "tatacoa",
    name: "Villavieja",
    category: "Historic Town",
    description:
      "Villavieja is a small town near the Tatacoa Desert, known for its warm climate and its importance to the region's paleontological and astronomical heritage. Fossils discovered in the surrounding area include remains of ancient turtles, fish, reptiles, and large mammals.",
    image: villaviejaImage,
  },
  {
    id: "desierto-de-la-tatacoa",
    destination: "tatacoa",
    name: "Tatacoa Desert",
    category: "Natural Attraction",
    description:
      "Despite its name, the Tatacoa is not a true desert but a dry tropical forest. It is one of Colombia's largest dry regions, covering more than 330 square kilometres. Its striking landscapes include the reddish formations of El Cusco, coloured by iron oxide, and the grey formations of Los Hoyos.",
    image: tatacoaImage,
  },

  // SAN AGUSTÍN
  {
    id: "san-agustin-pueblo",
    destination: "san-agustin",
    name: "San Agustín",
    category: "Historic Town",
    description:
      "Known as the archaeological capital of Huila, San Agustín is surrounded by remarkable archaeological sites and landscapes of the Colombian Massif. The town is an ideal starting point for discovering the region's pre-Hispanic heritage, traditional culture, and connection to the Magdalena River.",
    image: sanAgustinTownImage,
  },
  {
    id: "estrecho-del-magdalena",
    destination: "san-agustin",
    name: "Estrecho del Magdalena",
    category: "Natural Attraction",
    description:
      "At this point near San Agustín, the Magdalena River passes through a narrow channel in a bed of volcanic rock, reducing its width to approximately 2.2 metres. Surrounded by vegetation and a rocky canyon, the site reveals the force of one of Colombia's most important rivers.",
    image: estrechoImage,
  },
  {
    id: "estatuas-de-san-agustin",
    destination: "san-agustin",
    name: "Parque Arqueológico de San Agustín",
    category: "Archaeological Site",
    description:
      "The archaeological sites of San Agustín contain remarkable stone sculptures created by a pre-Hispanic culture that flourished in the region. Many statues represent gods, mythical animals, and supernatural figures, and are associated with ancient funerary and ceremonial practices. The archaeological park was recognised as a UNESCO World Heritage Site in 1995.",
    image: statuesImage,
  },

  // RÁQUIRA
  {
    id: "raquira-pueblo",
    destination: "raquira",
    name: "Ráquira",
    category: "Traditional Craft Village",
    description:
      "The name Ráquira comes from the Muisca language and is associated with the meaning 'place of the pots'. The town is especially known for its pottery tradition, an important local activity involving a large part of its population. Its colourful streets and workshops reflect a craft tradition that continues to be part of everyday life.",
    image: raquiraImage,
  },
];

export default places;
