import { axiosDefault } from "./axios";
import { RegisterResponse } from "./interfaces/login-register/RegisterResponse";
import { LoginResponse } from "./interfaces/login-register/LoginResponse";
import { RegisterRequest } from "./interfaces/login-register/RegisterRequest";
import { LoginRequest } from "./interfaces/login-register/LoginRequest";
import { User } from "./interfaces/user/User";
import { AxiosInstance } from "axios";
import { UserInfoResponse } from "./interfaces/user/UserInfoResponse";
import { Category } from "./interfaces/category/Category";
import { CategoryResponse } from "./interfaces/category/CategoryResponse";
import { CategoryListResponse } from "./interfaces/category/CategoryListResponse";
import { TransactionListResponse } from "./interfaces/transaction/TransactionListResponse";
import { ItemsInCategoryResponse } from "./interfaces/item/ItemsInCategoryResponse";
import { CountriesAndCategoriesResponse } from "./interfaces/transaction/CountriesAndCategoriesResponse";
import { UserItemsResponse } from "./interfaces/item/UserItemsResponse";
import { Transaction } from "./interfaces/transaction/Transaction";
import { TransactionResponse } from "./interfaces/transaction/TransactionResponse";
import { CreateTransactionRequest } from "./interfaces/transaction/CreateTransactionRequest";

//add try catch inside these functions instead of in the implementation!!!
export const register = (data: RegisterRequest) => {
  const { fName, lName, ...rest } = data;
  return axiosDefault.post<RegisterResponse>("/auth/register", {
    first_name: fName,
    last_name: lName,
    ...rest
  });
};

export const login = async (data: LoginRequest) => {
  return axiosDefault.post<LoginResponse>("/auth/login", data, {
    withCredentials: true
  });
};

export const logout = async () => {
  return axiosDefault.post("/auth/logout", {}, {
    withCredentials: true
  });
};
//axios instance will always be of axiosprivate with the interceptors
export const getUserInfo = async (id: number, axios:AxiosInstance) => {
  return await axios.get<User>(`/users/${id}`)
}
export const deleteUser = async (id: number, axios:AxiosInstance) => {
  return await axios.delete<User>(`/users/${id}`)
}
export const updateUser = async (id: number, user: User, axios:AxiosInstance) => {
  return await axios.put<UserInfoResponse>(`/users/${id}`, user);
};
export const getCategories = async (axios:AxiosInstance) => {
  return await axios.get<CategoryListResponse>(`/categories`);
};
export const getItemsInCategory = async (id: string, axios:AxiosInstance) => {
  return await axios.get<ItemsInCategoryResponse>(`/categories/${id}`);
};
export const createCategory = async (category:Omit<Category, 'id'>, axios:AxiosInstance) => {
  return await axios.post<CategoryResponse>(`/categories`, category);
};
export const updateCategory = async (categoryId: number, category:Category, axios:AxiosInstance) => {
  return await axios.post<CategoryResponse>(`/categories/${categoryId}`, category);
};
export const getRecentTransactions = async (axios:AxiosInstance) => {
  return await axios.get<TransactionListResponse>(`/transactions/recent`);
};
//for the transaction creation selects in form
//not sure if I should split the get for countries and categories
export const getCountriesAndCategories = async (axios:AxiosInstance) => {
  return await axios.get<CountriesAndCategoriesResponse>(`/countries/categories`);
};
export const getUserItems = async (axios:AxiosInstance) => {
  return await axios.get<UserItemsResponse>(`/items`);
};
export const createTransaction = async (transaction: CreateTransactionRequest, axios:AxiosInstance) => {
  return await axios.post<TransactionResponse>(`/transactions`, transaction);
};