import { axios } from "../axios.js";
export async function post_form_data<T = any>(url: string, form_data: FormData): Promise<T> {
    const res = await axios.post(url, form_data, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });
    return res.data;
}
