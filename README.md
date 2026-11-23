# Explore Colombia

Explore Colombia is a travel discovery web application that helps users explore destinations and places of interest across Colombia.

**[Visit the live application](https://explore-colombia.mooo.com/)**

The application combines destination information with interactive features, external APIs, and a backend service that supports user authentication, saved places, and shared visitor experiences.

## Features

- **Explore destinations:** Browse destinations across Colombia.
- **Discover places:** Explore attractions and points of interest within each destination.
- **Search:** Find destinations and attractions by name.
- **Save destinations and attractions:** Bookmark places and access them from a personal saved list.
- **User authentication:** Register, sign in, and access protected features.
- **Shared experiences:** Read, create, edit, and delete visitor experiences. Users must save an item before sharing an experience.
- **Weather information:** View current weather conditions for destinations.
- **Interactive maps:** View locations on a map and discover nearby places.
- **Responsive design:** Adapted for desktop and mobile screens.

## Technologies

- React
- JavaScript
- Vite
- React Router
- CSS
- Lucide React

## APIs

The application uses the following external APIs:

- [Geoapify](https://www.geoapify.com/) — Geocoding, location data, nearby places, and maps.
- [Open-Meteo](https://open-meteo.com/) — Current weather information.
- Explore Colombia Backend API — User authentication, saved items, and shared experiences.

## Getting Started

### Prerequisites

- Node.js
- npm
- A Geoapify API key
- A running instance of the Explore Colombia backend

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Nadine-Langeslag/explore-colombia-frontend.git
   ```

2. Navigate to the project directory:

   ```bash
   cd explore-colombia-frontend
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

### Environment Variables

Create a `.env.local` file in the project root and configure the following variables:

```env
VITE_GEOAPIFY_API_KEY=your_api_key_here
VITE_API_URL=http://localhost:3000/api
```

Replace `your_api_key_here` with your Geoapify API key.

For production, configure `VITE_API_URL` to point to the deployed backend:

```env
VITE_API_URL=https://api.explore-colombia.mooo.com/api
```

Keep API keys and other private credentials out of version control. Never commit your private environment files.

### Run the Development Server

Start the application locally:

```bash
npm run dev
```

Vite will start the development server. The frontend requires the backend to be running for authentication, saved items, and experiences.

### Build for Production

```bash
npm run build
```

### Run ESLint

```bash
npm run lint
```

## Project Structure

```text
src/
├── components/
├── contexts/
├── data/
├── images/
├── pages/
├── utils/
├── App.jsx
└── main.jsx
```

## Image Credits

Photograph sources, photographers, and applicable licenses are documented in [IMAGE_CREDITS.md](./IMAGE_CREDITS.md).

## Project Status

Explore Colombia is a full-stack project developed as part of the TripleTen Full Stack Web Development program.

The application includes a React frontend, external API integrations, and a backend API with authentication, saved items, and shared visitor experiences.
