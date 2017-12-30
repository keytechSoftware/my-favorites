import { MyFavoritesPage } from './app.po';

describe('keytech-favorites App', () => {
  let page: MyFavoritesPage;

  beforeEach(() => {
    page = new MyFavoritesPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('kt works!');
  });
});
