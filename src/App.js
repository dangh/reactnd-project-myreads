import React from 'react';
import {Route} from 'react-router';
import {BrowserRouter} from 'react-router-dom';
import SearchPage from './SearchPage';
import ShelfPage from './ShelfPage';
import BookStore from './BookStore';
import './App.css';

function BooksApp() {
  return (
    <BrowserRouter>
      <BookStore>
        <div className="app">
          <Route path="/search" component={SearchPage} />
          <Route exact path="/" component={ShelfPage} />
        </div>
      </BookStore>
    </BrowserRouter>
  );
}

export default BooksApp;
