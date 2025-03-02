// @ts-check
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

class AuthenticationManager {
    private httpClient: AxiosInstance;
    private token: string | null;

    constructor(baseURL: string) {
        this.token = null;
        this.httpClient = axios.create({
            baseURL,
        });

        // Добавляем запрос и ответ перехватчики
        this.httpClient.interceptors.request.use(
            this.requestInterceptor.bind(this),
            (error) => Promise.reject(error)
        );

        this.httpClient.interceptors.response.use(
            (response) => response,
            this.responseInterceptor.bind(this)
        );
    }

    private requestInterceptor(config: AxiosRequestConfig): AxiosRequestConfig {
        // Если токен существует, добавляем его в заголовки
        if (this.token) {
            config.headers['Authorization'] = `Bearer ${this.token}`;
        }
        return config;
    }

    private responseInterceptor(error: any) {
        // Обработка ошибок
        if (error.response && error.response.status === 401) {
            console.error('Unauthorized! Redirecting to login...');
            // Здесь вы можете добавить логику для обработки несанкционированного доступа
        }
        return Promise.reject(error);
    }

    public setToken(token: string) {
        this.token = token;
    }

    public clearToken() {
        this.token = null;
    }

    public async login(username: string, password: string): Promise<AxiosResponse> {
        try {
            const res = await this.httpClient.post('/api-auth/Auth/Login', {...payload});
            if (res.data) {
                token.save(res.data);
                await getMe();
                return res;
            }
        } catch (error) {
            console.error('Login failed:', error);
            throw error; // Перебрасываем ошибку, чтобы ее можно было обработать где-то еще
        }
    }

    public async logout(): Promise<AxiosResponse> {
        try {
            await this.httpClient.post('/logout'); // Допустим, у нас есть endpoint для выхода
            this.clearToken();
        } catch (error) {
            console.error('Logout failed:', error);
            throw error; // Перебрасываем ошибку
        }
    }

    public async fetchData(endpoint: string): Promise<AxiosResponse> {
        try {
            const response = await this.httpClient.get(endpoint);
            return response.data;
        } catch (error) {
            console.error('Fetch data failed:', error);
            throw error; // Перебрасываем ошибку
        }
    }
}

export default AuthenticationManager;



//! USAGE

import AuthenticationManager from './AuthenticationManager';

const authManager = new AuthenticationManager('https://api.example.com');

// Пример входа
async function loginUser() {
    try {
        await authManager.login('username', 'password');
        console.log('Login successful!');
    } catch (error) {
        console.error('Login error:', error);
    }
}

// Пример получения данных
async function getData() {
    try {
        const data = await authManager.fetchData('/protected-endpoint');
        console.log('Fetched data:', data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Вызов функций
loginUser().then(getData);