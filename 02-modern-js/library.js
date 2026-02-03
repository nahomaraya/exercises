/**
 * Library management module demonstrating modern JavaScript features
 */

import { books, categoryDescriptions, uniqueAuthors, filterBooksByStatus, groupBooksByGenre } from './data.js';

/**
 * LibraryManager class demonstrating modern JavaScript class features
 */
export class LibraryManager {
    #statistics = {}; // Private field for storing statistics

    constructor(initialBooks = []) {
        this.books = [...initialBooks]; // Shallow copy using spread
        this.#updateStatistics();
        // Bind memoized searchBooks method
        this.searchBooks = memoize(this.searchBooks.bind(this));
    }

    /**
     * TODO: Implement addBooks method using rest parameters and search functionality
     * addBooks(...newBooks): Add multiple books using spread operator, update statistics
     * searchBooks({title, author, genre} = {}, caseSensitive = false): Search with destructuring and optional chaining
     */
    addBooks(...newBooks) {
        this.books.push(...newBooks);
        this.#updateStatistics();
        // Add books using spread operator and update statistics
    }

    searchBooks({ title, author, genre } = {}, caseSensitive = false) {

        return this.books.filter(book => {
            const titleMatch = title ? (caseSensitive ? book.title.includes(title) : book.title.toLowerCase().includes(title.toLowerCase())) : true;
            const authorMatch = author ? (caseSensitive ? book.author.includes(author) : book.author.toLowerCase().includes(author.toLowerCase())) : true;
            const genreMatch = genre ? (caseSensitive ? book.genre.includes(genre) : book.genre.toLowerCase().includes(genre.toLowerCase())) : true;
            return titleMatch && authorMatch && genreMatch;
        });        // Implement search logic with destructuring and optional chaining
    }

    /**
     * TODO: Implement getStatistics and updateBook methods
     * getStatistics(): Return computed statistics object with total, available, checked out counts
     * updateBook(book, updates): Use logical assignment operators (??=, ||=, &&=)
     */
    getStatistics() {
        return { ...this.#statistics };
        // Return statistics with computed property names
    }

    updateBook(book, updates) {
        Object.keys(updates).forEach(key => {
            book[key] ??= updates[key];
        });
        this.#updateStatistics();
        // Use logical assignment operators to update book properties
    }

    /**
     * TODO: Implement higher-order functions and memoization
     * createBookFormatter(formatter): Return function that applies formatter to book arrays
     * memoize(fn): Use Map to cache function results
     */
    #updateStatistics() {
        // Calculate statistics and store in private field
        this.#statistics = {
            total: this.books.length,
            available: this.books.filter(book => book.availability?.status === 'available').length,
            checkedOut: this.books.filter(book => book.availability?.status === 'checked_out').length
        };
    }
}

export const createBookFormatter = (formatter) => {
    return (bookArray) => bookArray.map(formatter);
    // Return function that applies formatter to book arrays
};

export const memoize = (fn) => {
    const cache = new Map();
    return (...args) => {
        const key = JSON.stringify(args);
        if (cache.has(key)) {
            return cache.get(key);
        }
        const result = fn(...args);
        cache.set(key, result);
        return result;
    };
    // Use Map to cache expensive function results
};

// Export default library instance
export default new LibraryManager(books);