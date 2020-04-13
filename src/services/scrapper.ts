import axios from 'axios';
import cheerio from 'cheerio';
import { Service } from 'typedi';

@Service()
export default class ScrapperService {
  url = 'https://www.imdb.com/chart/top/';

  async GetMovies(): Promise<any[]> {
    try {
      const $ = await this.fetchData();
      const movieList = [];
      const movieTable = $('.lister-list > tr');
      movieTable.each((key: number, value: any) => {
        const { position, title, year } = this.parseTitleColumn($(value).find('.titleColumn'));
        const imbdRating = this.parseRankingColumn($(value).find('.ratingColumn.ratingColumn'));
        const { imdbLink, imageSrc } = this.parsePosterColumn($(value).find('.posterColumn > a'));

        movieList.push({
          position,
          title,
          year,
          imbdRating,
          imdbLink,
          imageSrc,
        });
      });

      return movieList;
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  private fetchData = async (): Promise<any> => {
    const result = await axios.get(this.url);
    return cheerio.load(result.data);
  };

  private parseTitleColumn(td: any): { position: number; title: string; year: number } {
    const parsedTd = td.text().split('\n');
    return {
      position: parsedTd[1].replace('.', '').trim(),
      title: parsedTd[2].trim(),
      year: parsedTd[3].trim().substring(1, 5),
    };
  }

  private parseRankingColumn(td: any): number {
    const parsedTd = td.text().split('\n');
    return parsedTd[1].trim();
  }

  private parsePosterColumn(td: any): { imdbLink: string; imageSrc: string } {
    const imdbLink = `https://www.imdb.com${td.attr('href')}`;
    const imageSrc = td.find('img').attr('src');
    return {
      imdbLink,
      imageSrc,
    };
  }
}
