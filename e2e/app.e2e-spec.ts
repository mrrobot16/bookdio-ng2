import { BookdioNg2Page } from './app.po';

describe('bookdio-ng2 App', function() {
  let page: BookdioNg2Page;

  beforeEach(() => {
    page = new BookdioNg2Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
