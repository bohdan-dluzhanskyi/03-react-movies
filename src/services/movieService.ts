// src/services/movieService.ts
import axios, { type AxiosResponse } from 'axios';
import { type Movie } from '../types/movie';

const BASE_URL = 'https://api.themoviedb.org/3';
const TOKEN = import.meta.env.VITE_TMDB_TOKEN as string;

if (!TOKEN) {
  // Ми не кидаємо помилку, але лог важливий під час локальної розробки
  console.warn('VITE_TMDB_TOKEN is not defined!');
}

export interface FetchMoviesParams {
  query: string;
  page?: number;
  include_adult?: boolean;
}

interface TMDBSearchResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export const fetchMovies = async (params: FetchMoviesParams): Promise<TMDBSearchResponse> => {
  const config = {
    params: {
      query: params.query,
      page: params.page ?? 1,
      include_adult: params.include_adult ?? false,
    },
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      'Content-Type': 'application/json;charset=utf-8',
    },
  };

  const response: AxiosResponse<TMDBSearchResponse> = await axios.get(
    `${BASE_URL}/search/movie`,
    config
  );

  return response.data;
};
