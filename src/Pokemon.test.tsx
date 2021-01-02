import React from 'react';
import Pokemon from './Pokemon';
import { screen, render } from '@testing-library/react';
import axios from 'axios';
import userEvent from '@testing-library/user-event';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('When the user enters a valid pokemon name', () => {
  test('should show the abilities of that pokemon', async () => {
    const abilities = [
      {
        ability: {
          ability: 'test ability 1',
          url: 'https://ability.com/ability1',
        },
      },
      {
        ability: {
          ability: 'test ability 2',
          url: 'https://ability.com/ability2',
        },
      },
    ];
    mockedAxios.get.mockResolvedValueOnce({ data: { abilities } });
    render(<Pokemon />);
    await userEvent.type(screen.getByRole('textbox'), 'ditto');
    await userEvent.click(screen.getByRole('button'));
    const returnedAbilities = await screen.findAllByRole('listitem');
    expect(returnedAbilities).toHaveLength(2);
  });
});

describe('when the user enters an invalid Pokemon name', () => {
  test('should show an error message on screen', async () => {
    mockedAxios.get.mockRejectedValueOnce(new Error());
    render(<Pokemon />);
    await userEvent.type(screen.getByRole('textbox'), 'invalidPokemon');
    await userEvent.click(screen.getByRole('button'));
    const message = await screen.findByText(/Something went wrong/);
    expect(message).toBeInTheDocument();
  });
});

// describe('When everything is OK', () => {
//   beforeEach(async () => {
//     render(<Pokemon />);
//   });
//   test('should render input element by label', () => {
//     screen.getByLabelText('Pokemon name:');
//   });
// });
