import { parseSearch, parsePagination } from '$utils/express';

describe('parseSearch', () => {
  it('should return "undefined" with no query.search', async () => {
    const query = {};
    const output = parseSearch(query);
    expect(output).toEqual(undefined);
  });
  it('should return proper output with query.search without spaces', async () => {
    const query = {
      search: 'foo',
    };
    const output = parseSearch(query);
    expect(output).toEqual('foo');
  });
  it('should return proper output with query.search with spaces', async () => {
    const query = {
      search: 'foo bar',
    };
    const output = parseSearch(query);
    expect(output).toEqual('foo & bar');
  });
});

describe('parsePagination', () => {
  it('should return proper output with no query.page and no query.limit', async () => {
    const query = {};
    const output = parsePagination(query);
    expect(output).toEqual({
      skip: 0,
      take: 25,
      page: 1,
      limit: 25,
    });
  });
  it('should return proper output with query.page and no query.limit', async () => {
    const query = {
      page: '2',
    };
    const output = parsePagination(query);
    expect(output).toEqual({
      skip: 25,
      take: 25,
      page: 2,
      limit: 25,
    });
  });
  it('should return proper output with no query.page and query.limit', async () => {
    const query = {
      limit: '10',
    };
    const output = parsePagination(query);
    expect(output).toEqual({
      skip: 0,
      take: 10,
      page: 1,
      limit: 10,
    });
  });
  it('should return proper output with query.page and query.limit', async () => {
    const query = {
      page: '3',
      limit: '10',
    };
    const output = parsePagination(query);
    expect(output).toEqual({
      skip: 20,
      take: 10,
      page: 3,
      limit: 10,
    });
  });
});

export {};
