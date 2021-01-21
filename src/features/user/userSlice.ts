import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { SessionInfo, UserCredentials } from 'typescript-axios'
import { User, signIn } from '../../api/swaggerAPI'
import { AppThunk } from '../../app/store'

interface UserState {
  user: SessionInfo
  isLoading: boolean
  error: string | null
}

const userInitialState = {
  user: {},
  isLoading: false,
  error: null,
} as UserState

function startLoading(state: UserState) {
  state.isLoading = true
}

function loadingFailed(state: UserState, action: PayloadAction<string>) {
  state.isLoading = false
  state.error = action.payload
}

const userSlice = createSlice({
  name: 'user',
  initialState: userInitialState,
  reducers: {
    getUserStart: startLoading,
    getUserSuccess(state, { payload }: PayloadAction<User>) {
      const { user } = payload
      state.isLoading = false
      state.error = null
      state.user = user
    },
    getUserFailure: loadingFailed,
  },
})

export const {
  getUserStart,
  getUserSuccess,
  getUserFailure,
} = userSlice.actions

export default userSlice.reducer

export const fetchUser = (user: UserCredentials): AppThunk => async (
  dispatch
) => {
  try {
    dispatch(getUserStart())
    const userResponse = await signIn(user)
    dispatch(getUserSuccess(userResponse))
  } catch (err) {
    dispatch(getUserFailure(err.toString()))
  }
}