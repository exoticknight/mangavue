/**
 * Book = {
 *   id: String id of the book,
 *   name: String name of the book,
 *   pageCount: Number count of pages of the book,
 *   author: String author of the book,
 *   translator: String name of the translator,
 *   discription: String discribe the book,
 *   catalog: Catalog access to special page,
 *   content: Content
 * }
 *
 * Catalog = [
 *   {
 *     text: String description of the page,
 *     value: Number page number
 *   },
 *   ...
 * ]
 *
 * Content = [
 *   {
 *     pics: [
 *       {
 *         title: String,
 *         path: String url of the image,
 *         alt: String alternate text for image,
 *         style: Object style of current image,
 *         areas: [
 *           {
 *             shape: String,
 *             coords: Array<Number> coordinated of the area
 *           }
 *         ]
 *       }
 *     ]
 *   },
 *   ...
 * ]
 */

import 'whatwg-fetch'
import { Promise } from 'es6-promise'

const bookCache = {}

const store = {}

store.fetchBookIndex = () => {
  return fetch( 'res/index.json' )
    .then( res => {
      return res.json()
    })
}

store.fetchBook = book => {
  return fetch( 'res/' + book + '.json' )
    .then( res => {
      return res.json()
    })
    .then( data => {
      return bookCache[book] = data;
    })
}

store.fetchPageFromBook = ( page, book ) => {
  return new Promise( ( res, rej ) => {
    if ( bookCache[book] ) {
      res( bookCache[book].content[page-1] )
    } else {
      store.fetchBook( book ).then( () => {
        res( bookCache[book].content[page-1] )
      })
    }
  })
}

store.fetchCatalog = book => {
  return new Promise( ( res, rej ) => {
    if ( bookCache[book] ) {
      res( bookCache[book].catalog )
    } else {
      store.fetchBook( book ).then( () => {
        res( bookCache[book].catalog )
      })
    }
  })
}

export default store