import axios from "axios";
import { BASE_URL } from "../constant";

export const getTodos = (search) => axios.get(`${BASE_URL}/?search=${search}`);
export const addTodo = (todo) => axios.post(BASE_URL, todo);
export const toggleTodo = (id) => axios.patch(`${BASE_URL}/toggle/${id}`);
export const deleteTodo = (id) => axios.delete(`${BASE_URL}/${id}`);
export const updateTodo = (id, data) => axios.patch(`${BASE_URL}/${id}`, data);
