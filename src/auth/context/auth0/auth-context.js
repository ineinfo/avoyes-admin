'use client';

import { createContext } from 'react';

// ----------------------------------------------------------------------

export const AuthContext = createContext({
    user: null,
    method: null,
    loading: false,
    authenticated: false,
    unauthenticated: true,
    loginWithRedirect: () => { },
    loginWithPopup: () => { },
    logout: () => { },
});
