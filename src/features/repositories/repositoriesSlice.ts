import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import API, { APIError, SerializableAPIError } from '../../lib/api';

export type Repository = {
  id: string;
  name: string;
  title: string;
}

export interface RepositoriesState {
  itemsByUser: {
    [username: string]: {
      networkStatus: 'loading' | 'idle';
      networkError: SerializableAPIError | null;
      items: Repository[]
    };
  };
}

const initialState: RepositoriesState = {
  itemsByUser: {},
};

export const fetchRepositories = createAsyncThunk(
  'repositories/fetch',
  async (username: string, { rejectWithValue }) => {
    try {
      return await API.get(`/users/${username}/repos`);
    } catch (e) {
      return rejectWithValue({
        kind: e.kind,
        data: e.data,
        message: e.message,
      });
    }
  },
);

/* eslint-disable no-param-reassign */
export const repositoriesSlice = createSlice({
  name: 'repositories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRepositories.pending, (state, action) => {
        const username = action.meta.arg;
        state.itemsByUser[username] = {
          networkStatus: 'loading',
          networkError: null,
          items: [],
        };
      })
      .addCase(fetchRepositories.fulfilled, (state, action) => {
        const username = action.meta.arg;
        state.itemsByUser[username] = {
          networkStatus: 'idle',
          networkError: null,
          items: action.payload,
        };
      })
      .addCase(fetchRepositories.rejected, (state, action) => {
        const username = action.meta.arg;
        state.itemsByUser[username] = {
          networkStatus: 'idle',
          networkError: action.payload as APIError,
          items: [],
        };
      });
  },
});
/* eslint-enable no-param-reassign */

export const isUserRepositoriesLoading = (username: string) => (
  (state: RootState): boolean => state.repositories.itemsByUser[username]?.networkStatus === 'loading'
);
export const selectUserRepositories = (username: string) => (
  (state: RootState): Repository[] => state.repositories.itemsByUser[username]?.items ?? []
);

export default repositoriesSlice.reducer;
