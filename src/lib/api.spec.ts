import API, { APIError } from './api';

describe('api utility', () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  it('should call the Github API', async () => {
    fetch.mockResponseOnce(JSON.stringify({ foo: 'bar' }));

    await API.get('/foo?bar=baz');

    expect(fetch.mock.calls.length).toEqual(1);
    expect(fetch.mock.calls[0][0]).toEqual('https://api.github.com/foo?bar=baz');
  });

  it('should return the response data', async () => {
    fetch.mockResponseOnce(JSON.stringify({ foo: 'bar' }));

    const response = await API.get('/foo');

    expect(response).toEqual({
      foo: 'bar',
    });
  });

  it('should throw network error', async () => {
    fetch.mockResponse(null, {
      status: 404,
    });

    await expect(API.get('/foo')).rejects.toThrow(APIError);
    await expect(API.get('/foo')).rejects.toHaveProperty('kind', 'NetworkError');
  });

  it('should throw validation error', async () => {
    fetch.mockResponse(JSON.stringify({
      errors: [{
        field: 'foo',
        message: 'foo is invalid',
      }],
    }), {
      status: 422,
    });

    await expect(API.get('/foo')).rejects.toThrow(APIError);
    await expect(API.get('/foo')).rejects.toHaveProperty('kind', 'ValidationError');
    await expect(API.get('/foo')).rejects.toHaveProperty('data', [{
      field: 'foo',
      message: 'foo is invalid',
    }]);
  });
});
