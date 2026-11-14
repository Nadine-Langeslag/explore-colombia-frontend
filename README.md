# Explore Colombia

Explore Colombia is a travel discovery web application that helps users explore destinations and places of interest across Colombia.

The project combines destination information with interactive features and external APIs to make discovering places easier.

## Features

- **Explore destinations:** Browse destinations across Colombia.
- **Discover places:** Explore attractions and points of interest within each destination.
- **Search:** Find destinations and attractions by name.
- **Save destinations:** Bookmark destinations for quick access.
- **Weather information:** View current weather conditions for each destination.
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

This project uses the following external APIs:

- [Geoapify](https://www.geoapify.com/) — Geocoding, location data, nearby places, and maps.
- [Open-Meteo](https://open-meteo.com/) — Current weather information.

## Getting Started

### Prerequisites

- Node.js
- npm
- A Geoapify API key

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Nadine-Langeslag/explore-colombia-frontend.git
   ```

2. Navigate to the project directory:

   ```bash
   cd explore-colombia-frontend
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

### Environment Variables

Create a `.env` file in the root directory and add your Geoapify API key:

```env
VITE_GEOAPIFY_API_KEY=your_api_key_here
```

Replace `your_api_key_here` with your actual Geoapify API key.

**Note:** Keep your `.env` file private. Do not commit API keys or other secrets to the repository.

### Run the Development Server

Start the application locally:

```bash
npm run dev
```

Vite will open the application in your browser.

### Build for Production

To create a production build:

```bash
npm run build
```

### Run ESLint

To check the project for linting issues:

```bash
npm run lint
```

## Project Structure

```text
src/
├── components/
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

Explore Colombia is being developed as part of the TripleTen Full Stack Web Development program.

The current stage focuses on the React frontend and integration with external APIs. Backend functionality and authorization are planned for later development stages.
