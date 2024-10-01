import config from "../config/index.tsx";
import TodoItem from "../models/TodoItem.tsx";
import { callService, Method } from "./CommonService.tsx";

const APIUrlBase = config.apiHost + config.apiBase + 'todos';

async function create(data: any) {
    const request = {
        name: data.name,
    }
    return await callService(APIUrlBase, Method.Post, request);
}

async function getAll() {
    return await callService(APIUrlBase);
}

async function update(id: number, data: any) {
    const request = {
        name: data.name,
        completed: data.completed,
    }
    return await callService(APIUrlBase + `/${id}`, Method.Patch, request);
}

async function remove(id: number) {
    return await callService(APIUrlBase + `/${id}`, Method.Delete);
}

export default { create, getAll, update, remove };
