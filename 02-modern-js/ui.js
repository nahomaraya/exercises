/**
 * UI utilities module demonstrating template literals, destructuring, and modern JS
 */

/**
 * TODO: Implement display functions using destructuring and template literals
 * displayStatistics(statistics): Extract properties with destructuring, format with template literals
 * displayBooks(books, title): Show formatted book list, use optional chaining for availability
 */
export function displayStatistics(statistics) {
    const { totalBooks, availableBooks, checkedOutBooks } = statistics;
    console.log(`Total Books: ${totalBooks} Available Books: ${availableBooks} Checked Out Books: ${checkedOutBooks}`);
    // Use destructuring to extract statistics properties
    // Use template literals for formatted console output
}

export function displayBooks(books, title = "Books") {
    const bookList = books.map(book => {
        const availabilityStatus = book.availability?.status ?? "Unknown";
        return `- ${book.title} by ${book.author} (${availabilityStatus})`;
    }).join('\n');
    console.log(`\n${title} ===\n${bookList}`)   ;
    // Display books with formatted output using template literals
    // Handle undefined availability with optional chaining
}

/**
 * TODO: Implement search results and availability formatting
 * displaySearchResults(results, criteria): Show search results with dynamic title
 * formatAvailability(availability): Return formatted status string with optional chaining
 */
export function displaySearchResults(searchResults, searchCriteria) {
    const { title, author, genre } = searchCriteria;
    const criteriaParts = [];
    if (title) criteriaParts.push(`Title: "${title}"`);
    if (author) criteriaParts.push(`Author: "${author}"`);
    if (genre) criteriaParts.push(`Genre: "${genre}"`);
    const criteriaString = criteriaParts.length ? criteriaParts.join(', ') : 'All Books';
    console.log(`\nResults for (${criteriaString}):`);
    displayBooks(searchResults);
    // Use destructuring for search criteria
    // Create dynamic title with template literals
}

export function formatAvailability(availability) {
    const status = availability?.status ?? "unknown";
    const symbols = {
        available: "Avaialble",
        checked_out: "Checked Out",      
        unknown: "No Info"

    };
    return `${symbols[status]} ${status.charAt(0).toUpperCase() + status.slice(1)}`;
    // Use optional chaining and nullish coalescing
    // Return formatted status with appropriate symbols
}

/**
 * TODO: Create analysis function demonstrating array methods
 * showBookAnalysis(books): Use map, filter, reduce to show insights
 * Calculate most common decade, genre distribution, etc.
 */
export function showBookAnalysis(books) {
    console.log('\n🔍 === BOOK ANALYSIS ===');

    const publicationDecades = books.map(book => {
        const year = book.publicationYear;
        return Math.floor(year / 10) * 10;
    });
    const decadeCounts = publicationDecades.reduce((acc, decade) => {
        acc[decade] = (acc[decade] || 0) + 1;
        return acc;
    }, {});
    console.log('Publication Decades:', decadeCounts);
    // Use modern array methods to analyze the book collection
    // Show publication decades, genre counts, etc.
}