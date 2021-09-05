import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { FormikHelpers } from 'formik';
import { RootState } from '../../app/store';
import API, { APIError, SerializableAPIError } from '../../lib/api';
import { mapValidationErrors } from '../../lib/validation';

export type User = {
  id: string;
  login: string;
  // repos_url: string;
}

export interface UsersState {
  networkStatus: 'loading' | 'idle';
  networkError: SerializableAPIError | null;
  items: User[];
}

const initialState: UsersState = {
  networkStatus: 'idle',
  networkError: null,
  items: [],
};

export const searchUsers = createAsyncThunk(
  'users/fetch',
  async (
    { queryString, setErrors }: { queryString: string, setErrors?: FormikHelpers<{ q: string }>['setErrors'] },
    { rejectWithValue },
  ) => {
    try {
      return await API.get(`/search/users?q=${encodeURIComponent(queryString)}&per_page=5`);
    } catch (e) {
      if (setErrors && e.kind === 'ValidationError') {
        setErrors(mapValidationErrors(e.data));
      }

      return rejectWithValue({
        kind: e.kind,
        data: e.data,
        message: e.message,
      });
    }
  },
);

/* eslint-disable no-param-reassign */
export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(searchUsers.pending, (state) => {
        state.networkStatus = 'loading';
        state.networkError = null;
      })
      .addCase(searchUsers.fulfilled, (state, action) => {
        state.networkStatus = 'idle';
        state.items = action.payload.items;
      })
      .addCase(searchUsers.rejected, (state, action) => {
        state.networkError = action.payload as APIError;
        state.networkStatus = 'idle';
        state.items = [];
      });
  },
});
/* eslint-enable no-param-reassign */

export const selectUsers = (state: RootState): User[] => state.users.items;
export const selectUsersError = (state: RootState): SerializableAPIError | null => (
  state.users.networkError
);

export default usersSlice.reducer;
