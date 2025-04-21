import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useAuth } from '../context/AuthContext';

const HomeScreen = () => {
    const { user, logout } = useAuth();

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.greeting}>Welcome!</Text>
            </View>

            <View style={styles.content}>
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Your Profile</Text>
                    <Text style={styles.cardText}>Name: {user?.name}</Text>
                    <Text style={styles.cardText}>Email: {user?.email}</Text>
                </View>

                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Recent Activity</Text>
                    <Text style={styles.cardText}>You logged in at {new Date().toLocaleTimeString()}</Text>
                </View>
            </View>
            <TouchableOpacity style={styles.logoutButton} onPress={logout}>
                <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
    },
    header: {
        padding: 20,
        backgroundColor: '#007BFF',
    },
    greeting: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 5,
    },
    welcomeText: {
        fontSize: 16,
        color: '#e6e6e6',
    },
    content: {
        padding: 20,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333',
    },
    cardText: {
        fontSize: 14,
        color: '#666',
        marginBottom: 5,
    },
    logoutButton: {
        marginHorizontal: 20,
        backgroundColor: '#f44336',
        borderRadius: 8,
        padding: 15,
        alignItems: 'center',
    },
    logoutText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default HomeScreen;