/**
 * Main entry point for the library management system
 * Demonstrates ES6 modules, async operations, and coordination of different modules
 */

import { books, filterBooksByStatus, groupBooksByGenre, bookTitleGenerator, createBookSummary } from './data.js';
import libraryManager, { LibraryManager, createBookFormatter, memoize } from './library.js';
import { displayStatistics, displayBooks, displaySearchResults, showBookAnalysis, formatAvailability } from './ui.js';

/**
 * TODO: Implement main application function and variable scoping demonstration
 * runLibraryDemo(): Coordinate all modules, handle null default export, show library features
 * demonstrateScoping(): Show let/const behavior, block scoping, temporal dead zone awareness
 */
async function runLibraryDemo() {
    console.log('🚀 Starting Library Management System Demo');
    console.log('='.repeat(50));

    try {
        // Handle case where default export might be null
        // Display library statistics and demonstrate book operations
        // Show filtering, grouping, search, and analysis features
        const library = libraryManager || new LibraryManager(books);
        library.addBooks(...books);
        showBookAnalysis(library.books);
        displayStatistics(library.getStatistics());
        displayBooks(library.books);
        displaySearchResults(library.books, { title: 'The Great Gatsby', author: 'F. Scott Fitzgerald' });
        formatAvailability(library.books[0]);
        demonstrateScoping();
        demonstrateErrorHandling(library);
        showGeneratorExample();

        
        
    } catch (error) {
        console.error('Application error:', error.message);
    } finally {
        console.log('\n✅ Demo completed!');
    }
}

function demonstrateScoping() {
    console.log('\n🔍 === VARIABLE SCOPING DEMO ===');
    // Show const/let behavior, block scoping, temporal dead zone
    
    // Block scoping with let
    {
        let blockScoped = 'I am block scoped';
        console.log('Inside block:', blockScoped);
    }
    
    // Temporal Dead Zone demonstration
    try {
        console.log(tdzVar); 
    } catch (error) {
        console.log('TDZ Error caught:', error.message);
    }
    let tdzVar = 'I am hoisted but in TDZ until declaration';
    console.log('After declaration:', tdzVar);
    
}

/**
 * TODO: Implement error handling and generator demonstrations  
 * demonstrateErrorHandling(library): Show try/catch, optional chaining, nullish coalescing
 * showGeneratorExample(): Use bookTitleGenerator to iterate through titles
 */
function demonstrateErrorHandling(library) {
    console.log('\n⚠️  === ERROR HANDLING DEMO ===');
    
    // Test safe property access, array methods on potentially undefined values
    
    // Optional chaining
    const safeAccess = library?.books?.[0]?.title;
    console.log('Optional chaining result:', safeAccess);
    
    const nullLibrary = null;
    const safeNullAccess = nullLibrary?.books?.[0]?.title;
    console.log('Optional chaining with null:', safeNullAccess);
    
    // Nullish coalescing
    const defaultTitle = library?.books?.[0]?.title ?? 'Unknown Title';
    console.log('Nullish coalescing:', defaultTitle);
    
    const emptyString = '';
    const result = emptyString ?? 'Default Value';
    console.log('Nullish coalescing (empty string):', result);
    
    // Try/catch with array methods on potentially undefined
    try {
        const undefinedArray = undefined;
        const mapped = undefinedArray?.map(book => book.title) ?? [];
        console.log('Safe array method with optional chaining:', mapped);
    } catch (error) {
        console.error('Error caught:', error.message);
    }
    
    // Try/catch for actual errors
    try {
        const invalidIndex = library.books[999];
        console.log('Accessing invalid index:', invalidIndex?.title ?? 'Not found');
    } catch (error) {
        console.log('Error accessing invalid index:', error.message);
    }
}

function showGeneratorExample() {
    console.log('\n🔄 === GENERATOR DEMO ===');
    
    const generator = bookTitleGenerator(books);
    console.log('Generator created, iterating through titles:');
    
    let result = generator.next();
    let count = 0;
    while (!result.done && count < 5) {
        console.log(`  ${count + 1}. ${result.value}`);
        result = generator.next();
        count++;
    }
    
    console.log('\nUsing for...of loop:');
    const generator2 = bookTitleGenerator(books);
    for (const title of generator2) {
        console.log(`  - ${title}`);
        if (title.includes('Gatsby')) break;
    }
}

/**
 * TODO: Start the application and demonstrate array destructuring
 * Call runLibraryDemo() when module loads
 * Show destructuring with first book, second book, and rest pattern
 */
// Start application and show destructuring example
console.log('\n📖 === DESTRUCTURING DEMO ===');
const [firstBook, secondBook, ...remainingBooks] = books;
// Display destructured results
console.log('First book:', firstBook);
console.log('Second book:', secondBook);
console.log(`Remaining books (${remainingBooks.length}):`, remainingBooks.map(book => book.title).join(', '));

runLibraryDemo();