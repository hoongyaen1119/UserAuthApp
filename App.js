import React from 'react';
import { StatusBar } from 'react-native';
import { AuthProvider } from './src/context/AuthContext';
import AppNavigator from './src/navigation/AppNavigator';
import 'react-native-gesture-handler';

const App = () => {
    return (
        <AuthProvider>
            <StatusBar barStyle="dark-content" backgroundColor="#fff" />
            <AppNavigator />
        </AuthProvider>
    );
};

export default App;