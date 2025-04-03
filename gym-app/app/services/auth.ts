import AsyncStorage from '@react-native-async-storage/async-storage';

export interface AuthData {
  access_token: string;
  refresh_token: string;
  email: string;
  user_id: string;
}

export class AuthService {
  private static instance: AuthService;
  private static readonly AUTH_KEY = '@auth_data';

  private constructor() {}

  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  public async setAuthData(data: AuthData): Promise<void> {
    try {
      await AsyncStorage.setItem(AuthService.AUTH_KEY, JSON.stringify(data));
    } catch (error) {
      console.error('Error storing auth data:', error);
      throw new Error('Failed to store authentication data');
    }
  }

  public async getAuthData(): Promise<AuthData | null> {
    try {
      const data = await AsyncStorage.getItem(AuthService.AUTH_KEY);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Error retrieving auth data:', error);
      return null;
    }
  }

  public async clearAuthData(): Promise<void> {
    try {
      await AsyncStorage.removeItem(AuthService.AUTH_KEY);
    } catch (error) {
      console.error('Error clearing auth data:', error);
      throw new Error('Failed to clear authentication data');
    }
  }

  public async isAuthenticated(): Promise<boolean> {
    const data = await this.getAuthData();
    return !!data?.access_token;
  }
} 