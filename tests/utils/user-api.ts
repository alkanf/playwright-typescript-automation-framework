/// <reference types="node" />
import { APIRequestContext, APIResponse,} from "@playwright/test"

const apiBaseUrl = process.env.API_BASE_URL ?? "https://api.realworld.show/api/";

export interface UserData {
    username : string,
    email : string,
    password : string;
}

export async function registerUser(
  request: APIRequestContext,
  user: UserData,
): Promise<APIResponse> {
  return request.post(
    new URL("users", apiBaseUrl).toString(),
    {
      data: {
        user,
      },
    },
  );
}