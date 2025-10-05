// seedBooks.js - Place this file in your backend root directory (same level as server.js)

const mongoose = require('mongoose');
const Book = require('./models/Book'); // Adjust the path based on your project structure
const User = require('./models/User'); // Make sure you have this model
require('dotenv').config();

const sampleBooks = [
  {
    title: "The Midnight Library",
    author: "Matt Haig",
    year: 2020,
    genre: "Fiction",
    description: "A dazzling novel about all the choices that go into a life well lived, from the internationally bestselling author of Reasons to Stay Alive and How To Stop Time."
  },
  {
    title: "Atomic Habits",
    author: "James Clear",
    year: 2018,
    genre: "Self-Help",
    description: "An Easy & Proven Way to Build Good Habits & Break Bad Ones. Tiny changes, remarkable results."
  },
  {
    title: "The Silent Patient",
    author: "Alex Michaelides",
    year: 2019,
    genre: "Thriller",
    description: "A shocking psychological thriller of a woman's act of violence against her husband—and of the therapist obsessed with uncovering her motive."
  },
  {
    title: "Educated",
    author: "Tara Westover",
    year: 2018,
    genre: "Biography",
    description: "A memoir about a young girl who, kept out of school, leaves her survivalist family and goes on to earn a PhD from Cambridge University."
  },
  {
    title: "Where the Crawdads Sing",
    author: "Delia Owens",
    year: 2018,
    genre: "Fiction",
    description: "A mystery novel set in the marshes of North Carolina, following the story of Kya, the 'Marsh Girl.'"
  },
  {
    title: "Sapiens",
    author: "Yuval Noah Harari",
    year: 2015,
    genre: "History",
    description: "A Brief History of Humankind. From the Stone Age to the Silicon Age, this book explores the entire span of human history."
  },
  {
    title: "The Alchemist",
    author: "Paulo Coelho",
    year: 1988,
    genre: "Fiction",
    description: "A magical tale about following your dreams and listening to your heart."
  },
  {
    title: "1984",
    author: "George Orwell",
    year: 1949,
    genre: "Science Fiction",
    description: "A dystopian social science fiction novel and cautionary tale about the dangers of totalitarianism."
  },
  {
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    year: 1960,
    genre: "Fiction",
    description: "A gripping tale of racial injustice and childhood innocence told through the eyes of young Scout Finch."
  },
  {
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    year: 1925,
    genre: "Fiction",
    description: "A story of the fabulously wealthy Jay Gatsby and his love for the beautiful Daisy Buchanan."
  },
  {
    title: "Harry Potter and the Philosopher's Stone",
    author: "J.K. Rowling",
    year: 1997,
    genre: "Fantasy",
    description: "The first book in the Harry Potter series, introducing the magical world of Hogwarts."
  },
  {
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    year: 1937,
    genre: "Fantasy",
    description: "The prelude to The Lord of the Rings, following Bilbo Baggins on an unexpected journey."
  },
  {
    title: "Pride and Prejudice",
    author: "Jane Austen",
    year: 1813,
    genre: "Romance",
    description: "A romantic novel of manners that chronicles the character development of Elizabeth Bennet."
  },
  {
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    year: 1951,
    genre: "Fiction",
    description: "The story of teenage rebellion and alienation told by Holden Caulfield."
  },
  {
    title: "The Lord of the Rings",
    author: "J.R.R. Tolkien",
    year: 1954,
    genre: "Fantasy",
    description: "An epic high fantasy trilogy about the quest to destroy the One Ring."
  },
  {
    title: "Think and Grow Rich",
    author: "Napoleon Hill",
    year: 1937,
    genre: "Self-Help",
    description: "A personal development and self-improvement book based on interviews with successful individuals."
  },
  {
    title: "The Da Vinci Code",
    author: "Dan Brown",
    year: 2003,
    genre: "Thriller",
    description: "A mystery thriller following symbologist Robert Langdon as he investigates a murder."
  },
  {
    title: "The Hunger Games",
    author: "Suzanne Collins",
    year: 2008,
    genre: "Science Fiction",
    description: "A dystopian novel set in a future where teenagers fight to the death in a televised event."
  },
  {
    title: "The Girl with the Dragon Tattoo",
    author: "Stieg Larsson",
    year: 2005,
    genre: "Thriller",
    description: "A gripping mystery novel featuring journalist Mikael Blomkvist and hacker Lisbeth Salander."
  },
  {
    title: "Life of Pi",
    author: "Yann Martel",
    year: 2001,
    genre: "Fiction",
    description: "A fantasy adventure novel about an Indian boy who survives a shipwreck with a Bengal tiger."
  },
  {
    title: "The Book Thief",
    author: "Markus Zusak",
    year: 2005,
    genre: "Historical Fiction",
    description: "Set during World War II in Germany, narrated by Death, following a young girl who steals books."
  },
  {
    title: "The Chronicles of Narnia",
    author: "C.S. Lewis",
    year: 1950,
    genre: "Fantasy",
    description: "A series of seven fantasy novels set in the magical land of Narnia."
  },
  {
    title: "Thinking, Fast and Slow",
    author: "Daniel Kahneman",
    year: 2011,
    genre: "Psychology",
    description: "A groundbreaking tour of the mind explaining the two systems that drive the way we think."
  },
  {
    title: "The Kite Runner",
    author: "Khaled Hosseini",
    year: 2003,
    genre: "Fiction",
    description: "A powerful story of friendship, betrayal, and redemption set in Afghanistan."
  },
  {
    title: "Gone Girl",
    author: "Gillian Flynn",
    year: 2012,
    genre: "Thriller",
    description: "A psychological thriller about a woman who goes missing on her fifth wedding anniversary."
  },
  {
    title: "The Subtle Art of Not Giving a F*ck",
    author: "Mark Manson",
    year: 2016,
    genre: "Self-Help",
    description: "A counterintuitive approach to living a good life by focusing on what truly matters."
  },
  {
    title: "The Fault in Our Stars",
    author: "John Green",
    year: 2012,
    genre: "Young Adult",
    description: "A touching story of two teenagers who meet at a cancer support group."
  },
  {
    title: "Brave New World",
    author: "Aldous Huxley",
    year: 1932,
    genre: "Science Fiction",
    description: "A dystopian novel set in a futuristic World State of genetically modified citizens."
  },
  {
    title: "The Road",
    author: "Cormac McCarthy",
    year: 2006,
    genre: "Fiction",
    description: "A post-apocalyptic novel about a father and son's journey through a devastated America."
  },
  {
    title: "The 7 Habits of Highly Effective People",
    author: "Stephen Covey",
    year: 1989,
    genre: "Self-Help",
    description: "A business and self-help book outlining principles for personal and professional effectiveness."
  },
  {
    title: "The Handmaid's Tale",
    author: "Margaret Atwood",
    year: 1985,
    genre: "Science Fiction",
    description: "A dystopian novel set in a totalitarian society where women are subjugated."
  },
  {
    title: "Animal Farm",
    author: "George Orwell",
    year: 1945,
    genre: "Fiction",
    description: "An allegorical novella reflecting events leading up to the Russian Revolution."
  },
  {
    title: "The Power of Now",
    author: "Eckhart Tolle",
    year: 1997,
    genre: "Self-Help",
    description: "A guide to spiritual enlightenment and living in the present moment."
  },
  {
    title: "Becoming",
    author: "Michelle Obama",
    year: 2018,
    genre: "Biography",
    description: "The memoir of former First Lady Michelle Obama describing her journey from childhood to the White House."
  },
  {
    title: "The Martian",
    author: "Andy Weir",
    year: 2011,
    genre: "Science Fiction",
    description: "A science fiction novel about an astronaut stranded alone on Mars and his struggle to survive."
  },
  {
    title: "The Girl on the Train",
    author: "Paula Hawkins",
    year: 2015,
    genre: "Thriller",
    description: "A psychological thriller about a woman who becomes entangled in a missing person investigation."
  },
  {
    title: "Dune",
    author: "Frank Herbert",
    year: 1965,
    genre: "Science Fiction",
    description: "A science fiction epic set on the desert planet Arrakis, the only source of the spice melange."
  },
  {
    title: "The Shining",
    author: "Stephen King",
    year: 1977,
    genre: "Horror",
    description: "A horror novel about a family's winter stay at an isolated hotel with a violent past."
  },
  {
    title: "The Help",
    author: "Kathryn Stockett",
    year: 2009,
    genre: "Historical Fiction",
    description: "A story about African American maids working in white households in Jackson, Mississippi, during the 1960s."
  },
  {
    title: "A Thousand Splendid Suns",
    author: "Khaled Hosseini",
    year: 2007,
    genre: "Fiction",
    description: "A powerful portrait of life in Afghanistan over the past three decades through the stories of two women."
  },
  {
    title: "The Godfather",
    author: "Mario Puzo",
    year: 1969,
    genre: "Crime",
    description: "A crime novel about the Corleone family, chronicling their rise and near fall within organized crime."
  },
  {
    title: "The Secret",
    author: "Rhonda Byrne",
    year: 2006,
    genre: "Self-Help",
    description: "A self-help book based on the law of attraction and the power of positive thinking."
  },
  {
    title: "Ready Player One",
    author: "Ernest Cline",
    year: 2011,
    genre: "Science Fiction",
    description: "A science fiction novel set in a dystopian 2045 where people escape to a virtual reality universe."
  },
  {
    title: "The Giver",
    author: "Lois Lowry",
    year: 1993,
    genre: "Young Adult",
    description: "A dystopian novel about a seemingly perfect society that is revealed to be anything but."
  },
  {
    title: "The Old Man and the Sea",
    author: "Ernest Hemingway",
    year: 1952,
    genre: "Fiction",
    description: "A short novel about an aging Cuban fisherman who struggles with a giant marlin."
  },
  {
    title: "Outliers",
    author: "Malcolm Gladwell",
    year: 2008,
    genre: "Psychology",
    description: "A non-fiction book that examines the factors that contribute to high levels of success."
  },
  {
    title: "The Bell Jar",
    author: "Sylvia Plath",
    year: 1963,
    genre: "Fiction",
    description: "A semi-autobiographical novel about a young woman's mental breakdown and recovery."
  },
  {
    title: "Lean In",
    author: "Sheryl Sandberg",
    year: 2013,
    genre: "Business",
    description: "A book about women, work, and the will to lead, encouraging women to pursue their ambitions."
  },
  {
    title: "The Curious Incident of the Dog in the Night-Time",
    author: "Mark Haddon",
    year: 2003,
    genre: "Fiction",
    description: "A mystery novel narrated by a 15-year-old boy with autism who investigates the death of a neighbor's dog."
  },
  {
    title: "The Color Purple",
    author: "Alice Walker",
    year: 1982,
    genre: "Fiction",
    description: "An epistolary novel about a young African American woman's struggle for empowerment in the South."
  }
];

// Connect to MongoDB and seed the database
const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/bookstore', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ Connected to MongoDB');

    // Find a user to assign as addedBy (or create a default user)
    let defaultUser = await User.findOne();
    
    if (!defaultUser) {
      console.log('⚠️  No users found. Creating a default user...');
      defaultUser = await User.create({
        name: 'Admin',
        email: 'admin@bookstore.com',
        password: '$2a$10$defaulthashedpassword' // This is a placeholder - won't work for login
      });
      console.log('✅ Default user created');
    }

    console.log(`📝 Using user: ${defaultUser.email} (ID: ${defaultUser._id})`);

    // Add the addedBy field to all books
    const booksWithUser = sampleBooks.map(book => ({
      ...book,
      addedBy: defaultUser._id
    }));

    // Clear existing books (optional - comment out if you want to keep existing data)
    await Book.deleteMany({});
    console.log('🗑️  Cleared existing books');

    // Insert sample books
    const result = await Book.insertMany(booksWithUser);
    console.log(`✅ Successfully added ${result.length} books to the database`);

    // Display some stats
    const totalBooks = await Book.countDocuments();
    
    console.log('\n📊 Database Statistics:');
    console.log(`   Total Books: ${totalBooks}`);
    
    // Display genres
    const genres = await Book.distinct('genre');
    console.log(`\n📚 Genres: ${genres.join(', ')}`);

    // Display year range
    const books = await Book.find().sort({ year: 1 });
    console.log(`\n📅 Year Range: ${books[0].year} - ${books[books.length - 1].year}`);

  } catch (error) {
    console.error('❌ Error seeding database:', error);
  } finally {
    // Close the connection
    await mongoose.connection.close();
    console.log('\n👋 Database connection closed');
    process.exit(0);
  }
};

// Run the seed function
seedDatabase();