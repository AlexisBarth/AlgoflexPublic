import UserSettings from './UserSettings';
import React from 'react';
import '@testing-library/jest-dom';

const currentUser = { uid: 1 };
interface Context {
    currentUser: { uid: number } | null;
}
const AuthContext = React.createContext<Context>({ currentUser: null });

describe('user settings edit', () => {
    test('render userSettings', () => {
        <AuthContext.Provider value={{ currentUser }}>
                <UserSettings />
        </AuthContext.Provider>
    })
})