import { defineStore } from 'pinia'

import type { IUser } from '@/interfaces/user'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
    /**
     ref() становятся свойствами состояния
     computed() становятся геттерами
     function() становятся действиями
    */
    const user = ref<IUser>({
        id: 0,
        username: '',
        password: '',
        age: 0,
        email: ''
    })

    function setUser(name: IUser['username'], password: IUser['password']): void{
        user.value = {username: name, password: password, age: 36, id: 10, email: ''}
    }
    return {user, setUser}

    // state: () => ({
    //     user: {
    //         id      : 0,
    //         name    : '',
    //         age     : 0,
    //         password: ''
    //     }
    // }),

    // actions: {
    //     async login(username: IUser['name'], password: IUser['password']) {
    //         try {
    //             const user = new Promise((resolve) => {resolve({id: 10, name: 'hhh', age: 36, password: 'hhh'})})
    //             return await user.then((thenUser) => {
    //                 this.user = thenUser
    //                 console.log('thenUser', thenUser)
    //             });
    //         } catch (error) {
    //             console.error('Err login:', error);
    //         }
    //     }
    // }
})
