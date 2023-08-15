# share.cny.sh - Share Apple Music Tracks as Spotify Links

Welcome to **share.cny.sh**, a small but powerful application designed to make sharing Apple Music tracks as Spotify links a breeze. With this tool, you can seamlessly convert Apple Music track links into Spotify links, making it easier for you and your friends to enjoy your favorite music across platforms.

## Table of Contents
- [Introduction](#sharecnysh)
- [Features](#features)
- [Setup](#setup)
  - [Using docker-compose.yml](#using-docker-composeyml)
  - [Using Docker](#using-docker)
  - [Using npm](#using-npm)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Easy Link Conversion**: With share.cny.sh, you can quickly and effortlessly convert Apple Music track links into Spotify links. No need for manual searches or copy-pasting.
- **Flexible Setup Options**: Whether you prefer using Docker or npm, we've got you covered with multiple setup options to suit your preferences.

## Setup

You have multiple ways to set up and run share.cny.sh on your own server or machine.

### Using `docker-compose.yml`

1. Create a `docker-compose.yml` file in your project directory.
2. Add the following content to the file:

```yaml
version: "3"
services:
  share-cny-sh:
    image: ghcr.io/connyscode/share-qwq-sh:latest
    ports:
      - "<port>:<port>"
    environment:
      - PORT=<port>
      - SPOTIFY_CLIENT_ID=<your_spotify_client_id>
      - SPOTIFY_CLIENT_SECRET=<your_spotify_client_secret>
```
Replace **`<port>`**, **`<your_spotify_client_id>`**, and **`<your_spotify_client_secret>`** with your desired port number and Spotify API credentials.

## Using Docker
Open your terminal and run the following command:

```bash
docker run -e SPOTIFY_CLIENT_SECRET=<your_spotify_client_secret> -e SPOTIFY_CLIENT_ID=<your_spotify_client_id> -e PORT=<port> ghcr.io/connyscode/share-qwq-sh:latest
```

Again, replace the placeholders with your specific values.

## Using npm
To use the npm setup, make sure you have Node.js v16.x or higher installed on your system. Then follow these steps:

1. Install dependencies:
```bash
npm install
```
2. Build the project:
```bash
npm run build
```
3. Start the application:
```bash
npm run prod
```

## Usage
Once you have the application up and running, you can easily convert any given Apple Music track link to a Spotify link, assuming that the same song exists on Spotify with the same title and artist.

To convert an Apple Music track URL to a Spotify song URL, follow these steps:

1. Perform a **POST** request to the **`/convert`** endpoint of your running application.
2. Include a JSON request body with the following structure:

```json
{
    "url": "https://music.apple.com/de/album/prada/1701829489?i=1701829495&l=en-GB"
}
```

Replace the example URL with the actual Apple Music track URL you want to convert.  

### Responses
- **Status Code 200**: Successful Conversion  
  If the conversion request was successful and the URL was converted, the API will respond with a JSON object containing the following information:
  ```ts
  interface IReturn {
      "appleMusicId": string, // Apple Music Song Id
      "songTitle": string, // Apple Music Song Title
      "spotifyUrl": string, // URL to Spotify
      "redirectUrl": string // Shortened URL to Spotify
  }
  ```
- **Status Code 400**: Bad Request  
If your request body was incorrectly formatted or contained incorrect information, the API will return a 400 error.

- **Status Code 404**: Spotify Song Not Found  
If no corresponding Spotify song could be found for the given Apple Music track, a 404 error will be returned.

- **Status Code 500**: Internal Server Error  
In case of an internal error within the application, a 500 error will be returned.

## Contributing
I really welcome contributions to make share.cny.sh even better. If you find any issues or have ideas for improvements, feel free to open an issue or submit a pull request right here on GitHub.

## License
This project is licensed under the **__MIT License__**, allowing you to use, modify, and distribute the code freely.
