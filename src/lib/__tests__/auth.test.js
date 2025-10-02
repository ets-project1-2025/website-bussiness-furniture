// src/lib/__tests__/auth.test.js
// Pengujian untuk fungsi autentikasi

import { expect, describe, it, beforeEach, afterEach, vi } from 'vitest';
import { login, logout, getCurrentUser } from '../auth';
import { createSupabaseClient } from '../supabase';

// Mock Supabase
vi.mock('../supabase', () => ({
  createSupabaseClient: vi.fn(() => ({
    auth: {
      signInWithPassword: vi.fn(),
      signOut: vi.fn(),
      getUser: vi.fn()
    }
  }))
}));

describe('Authentication Functions', () => {
  let mockSupabase;

  beforeEach(() => {
    vi.clearAllMocks();
    mockSupabase = {
      auth: {
        signInWithPassword: vi.fn(),
        signOut: vi.fn(),
        getUser: vi.fn()
      }
    };
    createSupabaseClient.mockReturnValue(mockSupabase);
  });

  describe('login', () => {
    it('should call Supabase signInWithPassword with correct credentials', async () => {
      const mockCredentials = { email: 'test@example.com', password: 'password123' };
      const mockResponse = { data: { user: { id: 'user123' } }, error: null };

      mockSupabase.auth.signInWithPassword.mockResolvedValue(mockResponse);

      await login(mockCredentials.email, mockCredentials.password);

      expect(mockSupabase.auth.signInWithPassword).toHaveBeenCalledWith({
        email: mockCredentials.email,
        password: mockCredentials.password
      });
    });

    it('should throw error when login fails', async () => {
      const mockCredentials = { email: 'test@example.com', password: 'wrongpassword' };
      const mockError = new Error('Invalid credentials');

      mockSupabase.auth.signInWithPassword.mockResolvedValue({ error: mockError });

      await expect(login(mockCredentials.email, mockCredentials.password))
        .rejects
        .toThrow('Invalid credentials');
    });
  });

  describe('logout', () => {
    it('should call Supabase signOut', async () => {
      await logout();

      expect(mockSupabase.auth.signOut).toHaveBeenCalled();
    });

    it('should handle logout error', async () => {
      const mockError = new Error('Logout failed');
      mockSupabase.auth.signOut.mockRejectedValue(mockError);

      await expect(logout())
        .rejects
        .toThrow('Logout failed');
    });
  });

  describe('getCurrentUser', () => {
    it('should return user when authenticated', async () => {
      const mockUser = { id: 'user123', email: 'test@example.com' };
      mockSupabase.auth.getUser.mockResolvedValue({ data: { user: mockUser }, error: null });

      const user = await getCurrentUser();

      expect(user).toEqual(mockUser);
    });

    it('should return null when not authenticated', async () => {
      mockSupabase.auth.getUser.mockResolvedValue({ data: { user: null }, error: null });

      const user = await getCurrentUser();

      expect(user).toBeNull();
    });

    it('should throw error when getting user fails', async () => {
      const mockError = new Error('Failed to get user');
      mockSupabase.auth.getUser.mockResolvedValue({ error: mockError });

      await expect(getCurrentUser())
        .rejects
        .toThrow('Failed to get user');
    });
  });
});