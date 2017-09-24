import React from 'react';
import {Route} from 'react-router';
import './App.css';
import SearchPage from './SearchPage';
import ShelfPage from './ShelfPage';

class BooksApp extends React.Component {
  state = {
    bookShelfDict: {
      a1: 'currentlyReading',
      a2: 'currentlyReading',
      a3: 'wantToRead',
      a4: 'wantToRead',
      a5: 'read',
      a6: 'read',
      a7: 'read'
    },

    shelfs: [
      {id: 'currentlyReading', title: 'Currently Reading'},
      {id: 'wantToRead', title: 'Want to Read'},
      {id: 'read', title: 'Read'}
    ],

    books: [
      {
        id: 'a1',
        imageLinks: {
          thumbnail:
            'http://books.google.com/books/content?id=PGR2AwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73-GnPVEyb7MOCxDzOYF1PTQRuf6nCss9LMNOSWBpxBrz8Pm2_mFtWMMg_Y1dx92HT7cUoQBeSWjs3oEztBVhUeDFQX6-tWlWz1-feexS0mlJPjotcwFqAg6hBYDXuK_bkyHD-y&source=gbs_api'
        },
        title: 'To Kill a Mockingbird',
        authors: ['Harper Lee']
      },
      {
        id: 'a2',
        imageLinks: {
          thumbnail:
            'http://books.google.com/books/content?id=yDtCuFHXbAYC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72RRiTR6U5OUg3IY_LpHTL2NztVWAuZYNFE8dUuC0VlYabeyegLzpAnDPeWxE6RHi0C2ehrR9Gv20LH2dtjpbcUcs8YnH5VCCAH0Y2ICaKOTvrZTCObQbsfp4UbDqQyGISCZfGN&source=gbs_api'
        },
        title: 'Ender’s Game',
        authors: ['Orson Scott Card']
      },
      {
        id: 'a3',
        imageLinks: {
          thumbnail:
            'http://books.google.com/books/content?id=uu1mC6zWNTwC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73pGHfBNSsJG9Y8kRBpmLUft9O4BfItHioHolWNKOdLavw-SLcXADy3CPAfJ0_qMb18RmCa7Ds1cTdpM3dxAGJs8zfCfm8c6ggBIjzKT7XR5FIB53HHOhnsT7a0Cc-PpneWq9zX&source=gbs_api'
        },
        title: '1776',
        authors: ['David McCullough']
      },
      {
        id: 'a4',
        imageLinks: {
          thumbnail:
            'http://books.google.com/books/content?id=wrOQLV6xB-wC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72G3gA5A-Ka8XjOZGDFLAoUeMQBqZ9y-LCspZ2dzJTugcOcJ4C7FP0tDA8s1h9f480ISXuvYhA_ZpdvRArUL-mZyD4WW7CHyEqHYq9D3kGnrZCNiqxSRhry8TiFDCMWP61ujflB&source=gbs_api'
        },
        title: 'Harry Potter and the Sorcerer’s Stone',
        authors: ['J.K. Rowling']
      },
      {
        id: 'a5',
        imageLinks: {
          thumbnail:
            'http://books.google.com/books/content?id=pD6arNyKyi8C&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE70Rw0CCwNZh0SsYpQTkMbvz23npqWeUoJvVbi_gXla2m2ie_ReMWPl0xoU8Quy9fk0Zhb3szmwe8cTe4k7DAbfQ45FEzr9T7Lk0XhVpEPBvwUAztOBJ6Y0QPZylo4VbB7K5iRSk&source=gbs_api'
        },
        title: 'The Hobbit',
        authors: ['J.R.R. Tolkien']
      },
      {
        id: 'a6',
        imageLinks: {
          thumbnail:
            'http://books.google.com/books/content?id=1q_xAwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE712CA0cBYP8VKbEcIVEuFJRdX1k30rjLM29Y-dw_qU1urEZ2cQ42La3Jkw6KmzMmXIoLTr50SWTpw6VOGq1leINsnTdLc_S5a5sn9Hao2t5YT7Ax1RqtQDiPNHIyXP46Rrw3aL8&source=gbs_api'
        },
        title: 'Oh, the Places You’ll Go!',
        authors: ['Seuss']
      },
      {
        id: 'a7',
        imageLinks: {
          thumbnail:
            'http://books.google.com/books/content?id=32haAAAAMAAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72yckZ5f5bDFVIf7BGPbjA0KYYtlQ__nWB-hI_YZmZ-fScYwFy4O_fWOcPwf-pgv3pPQNJP_sT5J_xOUciD8WaKmevh1rUR-1jk7g1aCD_KeJaOpjVu0cm_11BBIUXdxbFkVMdi&source=gbs_api'
        },
        title: 'The Adventures of Tom Sawyer',
        authors: ['Mark Twain']
      }
    ]
  };

  componentDidMount() {
    const serialized = localStorage.getItem('my-read-db');
    if (serialized) {
      this.setState(JSON.parse(serialized));
    }
  }

  componentDidUpdate() {
    localStorage.setItem('my-read-db', JSON.stringify(this.state));
  }

  getBooksInShelf = shelfId => {
    const {books, bookShelfDict} = this.state;
    return books.filter(book => bookShelfDict[book.id] === shelfId);
  };

  getShelfByBook = bookId => this.state.bookShelfDict[bookId] || 'none';

  moveBookToShelf = (book, shelfId) => {
    this.setState(prevState => {
      const newDict = {...prevState.bookShelfDict};
      let newBooks = [...prevState.books];

      if (shelfId === 'none') {
        if (prevState.bookShelfDict[book.id]) {
          if (window.confirm('Are you sure to remove this book?')) {
            delete newDict[book.id];
            newBooks = newBooks.filter(b => b.id !== book.id);
          } else {
            return {};
          }
        }
      } else {
        newDict[book.id] = shelfId;
        if (newBooks.find(b => b.id === book.id) == null) {
          newBooks = [...newBooks, book];
        }
      }

      return {
        bookShelfDict: newDict,
        books: newBooks
      };
    });
  };

  render() {
    const {shelfs} = this.state;
    return (
      <div className="app">
        <Route
          path="/search"
          render={() => (
            <SearchPage
              shelfs={shelfs}
              getShelfByBook={this.getShelfByBook}
              moveBookToShelf={this.moveBookToShelf}
            />
          )}
        />
        <Route
          exact
          path="/"
          render={() => (
            <ShelfPage
              shelfs={shelfs}
              getBooksInShelf={this.getBooksInShelf}
              moveBookToShelf={this.moveBookToShelf}
            />
          )}
        />
      </div>
    );
  }
}

export default BooksApp;
