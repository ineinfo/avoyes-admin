'use client';

import { createContext } from 'react';

// ----------------------------------------------------------------------

export const AuthContext = createContext({
    user: null,
    loginData: [],
    method: 'jwt',
    loading: false,
    authenticated: false,
    unauthenticated: true,
    login: () => { },
    register: () => { },
    logout: () => { },
});
