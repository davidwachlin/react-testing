import { getUser } from './getUser';

describe('When everything is OK', () => {
  test('should return a response', async () => {
    // In a real project, you would use Axios and mock the get method
    const result = await getUser();
  });
});
