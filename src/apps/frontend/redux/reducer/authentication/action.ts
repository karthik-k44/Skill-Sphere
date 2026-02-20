import { createAsyncThunk } from "@reduxjs/toolkit";
import { AuthenticationService } from "../../../services";
import type { LoginParams, LoginResponse, SignUpParams, SignUpResponse } from "../../../types";

const createUser = createAsyncThunk(
    'createUser',
    async (params: SignUpParams): Promise<SignUpResponse> => AuthenticationService.signUp(params),
)

const loginUser = createAsyncThunk(
    'loginUser',
    async (params: LoginParams): Promise<LoginResponse> => AuthenticationService.login(params),
)

export { createUser, loginUser };