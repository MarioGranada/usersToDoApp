import React from 'react';
import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';

import App from './App';
import { listUsers } from './shared/services/usersToDoAPI/usersToDoAPI';

vi.mock('./shared/services/usersToDoAPI/usersToDoAPI', () => ({
  listUsers: vi.fn(),
  createUser: vi.fn(),
  updateUser: vi.fn(),
  removeUser: vi.fn(),
  getTasksByUserId: vi.fn(() => Promise.resolve({ data: [] })),
  createTask: vi.fn(),
  updateTask: vi.fn(),
}));

describe('App', () => {
  it('renders the users loaded from the API', async () => {
    listUsers.mockResolvedValue({
      data: [
        { _id: 'u1', name: 'Ada Lovelace' },
        { _id: 'u2', name: 'Alan Turing' },
      ],
    });

    render(<App />);

    // Testing Library 9 has no `name` filter for getByRole, so match by text.
    expect(screen.getByText('Users', { selector: 'h1' })).toBeInTheDocument();
    expect(await screen.findByText('Ada Lovelace')).toBeInTheDocument();
    expect(screen.getByText('Alan Turing')).toBeInTheDocument();
    expect(screen.getByText('Add User')).toBeInTheDocument();
  });
});
