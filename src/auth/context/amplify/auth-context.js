'use client';

import { createContext } from 'react';

// ----------------------------------------------------------------------

const defaultAuthContext = {
    user: null,
    method: 'amplify',
    loading: true,
    authenticated: false,
    unauthenticated: true,
    login: () => { },
    logout: () => { },
    register: () => { },
    newPassword: () => { },
    forgotPassword: () => { },
    confirmRegister: () => { },
    resendCodeRegister: () => { },
};

export const AuthContext = createContext(defaultAuthContext);
