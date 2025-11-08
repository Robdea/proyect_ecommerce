import { Item, Transaction } from "../lib/type";
import { api } from "./client";


export async function payProcess(items: Item[]) {
    const {data} = await api.post("pays", {
        listProducts: items,
    });
    console.log("process", data);
    return data
}

export async function getSoldsById({userId}:{userId: string}) {
    const {data} = await api.get<Transaction[]>(`solds/${userId}`);
    console.log("get solds by user id", data);
    return data
}
