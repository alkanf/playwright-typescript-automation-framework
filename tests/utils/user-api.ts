import { APIRequestContext, APIResponse,} from "@playwright/test"

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
    "https://api.realworld.show/api/users",
    {
      data: {
        user,
      },
    },
  );
}