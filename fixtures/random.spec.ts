import { test as baseTest } from '@playwright/test';

export const randomEmail = () => {
    return Math.random().toString().slice(2) + '@email.com';
}

export const randomPhone = () => {
    return Math.random().toString().slice(2, 6);
}