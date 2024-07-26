# ONRTechnicalTest - API Data Aggregator

Este proyecto es una API Express que se conecta a varias APIs externas (PokeAPI, Rick and Morty API, y SWAPI) para obtener datos y almacenarlos en una base de datos MongoDB. La API proporciona endpoints para consultar estos datos con paginación.

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm start
```

## Rutas
### Obtener datos de PokeAPI
- Endpoint: /pokemon
- Método: GET
- Query Parameters:
  - `page` (opcional): Página de resultados a obtener (por defecto: 1).
  - `limit` (opcional): Número de resultados por página (por defecto: 20).
  
  Descripción: Obtiene datos de Pokémon desde la base de datos si están disponibles, o los consulta a la API externa si la base de datos no está actualizada.
  
  #### Ejemplo de Uso en Postman:

  1. URL: http://localhost:3000/pokemon?page=1&limit=10
  2. Método: `GET`

### Obtener datos de Rick and Morty API
- Endpoint: /rickandmorty
- Método: GET
- Query Parameters:
  - `page` (opcional): Página de resultados a obtener (por defecto: 1).
  - `limit` (opcional): Número de resultados por página (por defecto: 20).
  
  Descripción: Obtiene datos de personajes de Rick and Morty desde la base de datos si están disponibles, o los consulta a la API externa si la base de datos no está actualizada.
  
  #### Ejemplo de Uso en Postman:

  1. URL: http://localhost:3000/rickandmorty?page=1&limit=10
  2. Método: `GET`

### Obtener datos de SWAPI
- Endpoint: /sw
- Método: GET
- Query Parameters:
  - `page` (opcional): Página de resultados a obtener (por defecto: 1).
  - `limit` (opcional): Número de resultados por página (por defecto: 20).
  
  Descripción: Obtiene datos de personajes de Star Wars desde la base de datos si están disponibles, o los consulta a la API externa si la base de datos no está actualizada.
  
  #### Ejemplo de Uso en Postman:

  1. URL: http://localhost:3000/sw?page=1&limit=10
  2. Método: `GET`