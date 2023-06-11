import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const genresApi = createApi({
  reducerPath: "genres",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.themoviedb.org/3/genre/movie/list?api_key=54ca32600b8d3533c486c2b7fe8c8efb",
  }),
  tagTypes: ["Genre"],
  endpoints: (builder) => ({
    getGenres: builder.query({
      query: () => "",
      providesTags: ["Genre"],
    }),
  }),
});

export const { useGetGenresQuery } = genresApi;