import { message } from "antd";
import { BASE_URL } from "./constants";

export enum HttpMethod {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
  PATCH = "PATCH",
}

export async function api(
  method: string,
  path: string,
  data?: any,
  options: any = {}
): Promise<any> {
  let url = `${BASE_URL}/${path}`;
  let headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
    ...options,
  };
  let response: Response;
  if (data instanceof FormData) {
    headers = {
      ACCEPT: "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    try {
      response = await fetch(url, {
        method,
        headers,
        body: data,
      });
    } catch (error: any) {
      message.error(error.message);
      return;
    }
  } else {
    if (method === HttpMethod.GET && data instanceof URLSearchParams) {
      url = `${url}?${data.toString()}`;
    }
    try {
      response = await fetch(url, {
        method,
        headers,
        body: method === HttpMethod.GET ? undefined : JSON.stringify(data),
      });
    } catch (error: any) {
      message.error(error.message);
      return;
    }
  }
  if (response.status === 401) {
    try {
      const res = await fetch(BASE_URL + "/auth/refresh", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("refreshToken")}`,
        },
      }).then((res) => res.json());
      const { token, user } = res.data;
      if (!token) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.href = "/login";
        return null;
      }
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      return api(method, path, data, options);
    } catch (e) {
      console.log(e);
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
      return null;
    }
  }

  if (options.responseType === "blob") {
    return response.blob();
  }
  if (options.responseType === "json") {
    return response.json();
  }
  const json = await response.json();
  return json;
}
