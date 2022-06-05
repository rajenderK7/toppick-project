const express = require("express");
const asyncHandler = require("express-async-handler");
const Comment = require("../models/Comment");
const Post = require("../models/Post");
const User = require("../models/User");

const postApp = express.Router();

postApp.use(express.json());

const _filter = (books) => {
  let filtered = [];

  books.forEach((book) => {
    let obj = {
      book_image: book.book_image,
      title: book.title,
      author: book.author,
      description: book.description,
      buy_links: book.buy_links,
      comments: [],
    };

    filtered.push(obj);
  });

  return filtered;
};

const books = [
  {
    rank: 1,
    rank_last_week: 0,
    weeks_on_list: 1,
    asterisk: 0,
    dagger: 0,
    primary_isbn10: "1982181656",
    primary_isbn13: "9781982181659",
    publisher: "Atria/Emily Bestler",
    description:
      "The fifth book in the Terminal List series. James Reece goes after the killer of a Mossad operative attached to the C.I.A.",
    price: "0.00",
    title: "IN THE BLOOD",
    author: "Jack Carr",
    contributor: "by Jack Carr",
    contributor_note: "",
    book_image:
      "https://storage.googleapis.com/du-prd/books/images/9781982181659.jpg",
    book_image_width: 337,
    book_image_height: 500,
    amazon_product_url: "https://www.amazon.com/dp/1982181656?tag=NYTBSREV-20",
    age_group: "",
    book_review_link: "",
    first_chapter_link: "",
    sunday_review_link: "",
    article_chapter_link: "",
    isbns: [
      {
        isbn10: "1982181656",
        isbn13: "9781982181659",
      },
      {
        isbn10: "1982181680",
        isbn13: "9781982181680",
      },
    ],
    buy_links: [
      {
        name: "Amazon",
        url: "https://www.amazon.com/dp/1982181656?tag=NYTBSREV-20",
      },
      {
        name: "Apple Books",
        url: "https://goto.applebooks.apple/9781982181659?at=10lIEQ",
      },
      {
        name: "Barnes and Noble",
        url: "https://www.anrdoezrs.net/click-7990613-11819508?url=https%3A%2F%2Fwww.barnesandnoble.com%2Fw%2F%3Fean%3D9781982181659",
      },
      {
        name: "Books-A-Million",
        url: "https://du-gae-books-dot-nyt-du-prd.appspot.com/redirect?url1=https%3A%2F%2Fwww.anrdoezrs.net%2Fclick-7990613-35140%3Furl%3Dhttps%253A%252F%252Fwww.booksamillion.com%252Fp%252FIN%252BTHE%252BBLOOD%252FJack%252BCarr%252F9781982181659&url2=https%3A%2F%2Fwww.anrdoezrs.net%2Fclick-7990613-35140%3Furl%3Dhttps%253A%252F%252Fwww.booksamillion.com%252Fsearch%253Fquery%253DIN%252BTHE%252BBLOOD%252BJack%252BCarr",
      },
      {
        name: "Bookshop",
        url: "https://du-gae-books-dot-nyt-du-prd.appspot.com/redirect?url1=https%3A%2F%2Fbookshop.org%2Fa%2F3546%2F9781982181659&url2=https%3A%2F%2Fbookshop.org%2Fbooks%3Faffiliate%3D3546%26keywords%3DIN%2BTHE%2BBLOOD",
      },
      {
        name: "IndieBound",
        url: "https://du-gae-books-dot-nyt-du-prd.appspot.com/redirect?url1=https%3A%2F%2Fwww.indiebound.org%2Fbook%2F9781982181659%3Faff%3DNYT&url2=https%3A%2F%2Fwww.indiebound.org%2Fsearch%2Fbook%3Fkeys%3DIN%2BTHE%2BBLOOD%2BJack%2BCarr%26aff%3DNYT",
      },
    ],
    book_uri: "nyt://book/15be5903-78f0-5d2a-9ca7-f0e468dab5c5",
  },
  {
    rank: 2,
    rank_last_week: 1,
    weeks_on_list: 3,
    asterisk: 0,
    dagger: 0,
    primary_isbn10: "0316499374",
    primary_isbn13: "9780316499378",
    publisher: "Little, Brown",
    description:
      "The 22nd book in the Women’s Murder Club series. Lindsay Boxer returns as word gets around about a shipment of drugs and weapons.",
    price: "0.00",
    title: "22 SECONDS",
    author: "James Patterson and Maxine Paetro",
    contributor: "by James Patterson and Maxine Paetro",
    contributor_note: "",
    book_image:
      "https://storage.googleapis.com/du-prd/books/images/9780316499378.jpg",
    book_image_width: 323,
    book_image_height: 500,
    amazon_product_url: "https://www.amazon.com/dp/0316499374?tag=NYTBSREV-20",
    age_group: "",
    book_review_link: "",
    first_chapter_link: "",
    sunday_review_link: "",
    article_chapter_link: "",
    isbns: [
      {
        isbn10: "0316499374",
        isbn13: "9780316499378",
      },
      {
        isbn10: "0316499382",
        isbn13: "9780316499385",
      },
      {
        isbn10: "0316445312",
        isbn13: "9780316445313",
      },
    ],
    buy_links: [
      {
        name: "Amazon",
        url: "https://www.amazon.com/dp/0316499374?tag=NYTBSREV-20",
      },
      {
        name: "Apple Books",
        url: "https://goto.applebooks.apple/9780316499378?at=10lIEQ",
      },
      {
        name: "Barnes and Noble",
        url: "https://www.anrdoezrs.net/click-7990613-11819508?url=https%3A%2F%2Fwww.barnesandnoble.com%2Fw%2F%3Fean%3D9780316499378",
      },
      {
        name: "Books-A-Million",
        url: "https://du-gae-books-dot-nyt-du-prd.appspot.com/redirect?url1=https%3A%2F%2Fwww.anrdoezrs.net%2Fclick-7990613-35140%3Furl%3Dhttps%253A%252F%252Fwww.booksamillion.com%252Fp%252F22%252BSECONDS%252FJames%252BPatterson%252Band%252BMaxine%252BPaetro%252F9780316499378&url2=https%3A%2F%2Fwww.anrdoezrs.net%2Fclick-7990613-35140%3Furl%3Dhttps%253A%252F%252Fwww.booksamillion.com%252Fsearch%253Fquery%253D22%252BSECONDS%252BJames%252BPatterson%252Band%252BMaxine%252BPaetro",
      },
      {
        name: "Bookshop",
        url: "https://du-gae-books-dot-nyt-du-prd.appspot.com/redirect?url1=https%3A%2F%2Fbookshop.org%2Fa%2F3546%2F9780316499378&url2=https%3A%2F%2Fbookshop.org%2Fbooks%3Faffiliate%3D3546%26keywords%3D22%2BSECONDS",
      },
      {
        name: "IndieBound",
        url: "https://du-gae-books-dot-nyt-du-prd.appspot.com/redirect?url1=https%3A%2F%2Fwww.indiebound.org%2Fbook%2F9780316499378%3Faff%3DNYT&url2=https%3A%2F%2Fwww.indiebound.org%2Fsearch%2Fbook%3Fkeys%3D22%2BSECONDS%2BJames%2BPatterson%2Band%2BMaxine%2BPaetro%26aff%3DNYT",
      },
    ],
    book_uri: "nyt://book/30e66d4a-611a-5a29-b8e2-c7b2eed2bbd4",
  },
  {
    rank: 3,
    rank_last_week: 0,
    weeks_on_list: 1,
    asterisk: 0,
    dagger: 0,
    primary_isbn10: "052553900X",
    primary_isbn13: "9780525539001",
    publisher: "Riverhead",
    description:
      "A 40-year-old woman finds new meaning in past events when she goes back in time and relives her 16th birthday in 1996.",
    price: "0.00",
    title: "THIS TIME TOMORROW",
    author: "Emma Straub",
    contributor: "by Emma Straub",
    contributor_note: "",
    book_image:
      "https://storage.googleapis.com/du-prd/books/images/9780525539001.jpg",
    book_image_width: 331,
    book_image_height: 500,
    amazon_product_url: "https://www.amazon.com/dp/052553900X?tag=NYTBSREV-20",
    age_group: "",
    book_review_link: "",
    first_chapter_link: "",
    sunday_review_link: "",
    article_chapter_link: "",
    isbns: [
      {
        isbn10: "052553900X",
        isbn13: "9780525539001",
      },
      {
        isbn10: "0525539026",
        isbn13: "9780525539025",
      },
    ],
    buy_links: [
      {
        name: "Amazon",
        url: "https://www.amazon.com/dp/052553900X?tag=NYTBSREV-20",
      },
      {
        name: "Apple Books",
        url: "https://goto.applebooks.apple/9780525539001?at=10lIEQ",
      },
      {
        name: "Barnes and Noble",
        url: "https://www.anrdoezrs.net/click-7990613-11819508?url=https%3A%2F%2Fwww.barnesandnoble.com%2Fw%2F%3Fean%3D9780525539001",
      },
      {
        name: "Books-A-Million",
        url: "https://du-gae-books-dot-nyt-du-prd.appspot.com/redirect?url1=https%3A%2F%2Fwww.anrdoezrs.net%2Fclick-7990613-35140%3Furl%3Dhttps%253A%252F%252Fwww.booksamillion.com%252Fp%252FTHIS%252BTIME%252BTOMORROW%252FEmma%252BStraub%252F9780525539001&url2=https%3A%2F%2Fwww.anrdoezrs.net%2Fclick-7990613-35140%3Furl%3Dhttps%253A%252F%252Fwww.booksamillion.com%252Fsearch%253Fquery%253DTHIS%252BTIME%252BTOMORROW%252BEmma%252BStraub",
      },
      {
        name: "Bookshop",
        url: "https://du-gae-books-dot-nyt-du-prd.appspot.com/redirect?url1=https%3A%2F%2Fbookshop.org%2Fa%2F3546%2F9780525539001&url2=https%3A%2F%2Fbookshop.org%2Fbooks%3Faffiliate%3D3546%26keywords%3DTHIS%2BTIME%2BTOMORROW",
      },
      {
        name: "IndieBound",
        url: "https://du-gae-books-dot-nyt-du-prd.appspot.com/redirect?url1=https%3A%2F%2Fwww.indiebound.org%2Fbook%2F9780525539001%3Faff%3DNYT&url2=https%3A%2F%2Fwww.indiebound.org%2Fsearch%2Fbook%3Fkeys%3DTHIS%2BTIME%2BTOMORROW%2BEmma%2BStraub%26aff%3DNYT",
      },
    ],
    book_uri: "nyt://book/65390e2f-0e5c-5e14-8191-32e7975965a0",
  },
  {
    rank: 4,
    rank_last_week: 3,
    weeks_on_list: 5,
    asterisk: 0,
    dagger: 0,
    primary_isbn10: "1538719770",
    primary_isbn13: "9781538719770",
    publisher: "Grand Central",
    description:
      "The third book in the Archer series. Archer, Dash and Callahan search for a missing screenwriter who had a dead body turn up in her home.",
    price: "0.00",
    title: "DREAM TOWN",
    author: "David Baldacci",
    contributor: "by David Baldacci",
    contributor_note: "",
    book_image:
      "https://storage.googleapis.com/du-prd/books/images/9781538719770.jpg",
    book_image_width: 331,
    book_image_height: 500,
    amazon_product_url: "https://www.amazon.com/dp/1538719770?tag=NYTBSREV-20",
    age_group: "",
    book_review_link: "",
    first_chapter_link: "",
    sunday_review_link: "",
    article_chapter_link: "",
    isbns: [
      {
        isbn10: "1538719770",
        isbn13: "9781538719770",
      },
      {
        isbn10: "1538719789",
        isbn13: "9781538719787",
      },
      {
        isbn10: "1549160613",
        isbn13: "9781549160615",
      },
      {
        isbn10: "1549160621",
        isbn13: "9781549160622",
      },
      {
        isbn10: "1668609266",
        isbn13: "9781668609262",
      },
    ],
    buy_links: [
      {
        name: "Amazon",
        url: "https://www.amazon.com/dp/1538719770?tag=NYTBSREV-20",
      },
      {
        name: "Apple Books",
        url: "https://goto.applebooks.apple/9781538719770?at=10lIEQ",
      },
      {
        name: "Barnes and Noble",
        url: "https://www.anrdoezrs.net/click-7990613-11819508?url=https%3A%2F%2Fwww.barnesandnoble.com%2Fw%2F%3Fean%3D9781538719770",
      },
      {
        name: "Books-A-Million",
        url: "https://du-gae-books-dot-nyt-du-prd.appspot.com/redirect?url1=https%3A%2F%2Fwww.anrdoezrs.net%2Fclick-7990613-35140%3Furl%3Dhttps%253A%252F%252Fwww.booksamillion.com%252Fp%252FDREAM%252BTOWN%252FDavid%252BBaldacci%252F9781538719770&url2=https%3A%2F%2Fwww.anrdoezrs.net%2Fclick-7990613-35140%3Furl%3Dhttps%253A%252F%252Fwww.booksamillion.com%252Fsearch%253Fquery%253DDREAM%252BTOWN%252BDavid%252BBaldacci",
      },
      {
        name: "Bookshop",
        url: "https://du-gae-books-dot-nyt-du-prd.appspot.com/redirect?url1=https%3A%2F%2Fbookshop.org%2Fa%2F3546%2F9781538719770&url2=https%3A%2F%2Fbookshop.org%2Fbooks%3Faffiliate%3D3546%26keywords%3DDREAM%2BTOWN",
      },
      {
        name: "IndieBound",
        url: "https://du-gae-books-dot-nyt-du-prd.appspot.com/redirect?url1=https%3A%2F%2Fwww.indiebound.org%2Fbook%2F9781538719770%3Faff%3DNYT&url2=https%3A%2F%2Fwww.indiebound.org%2Fsearch%2Fbook%3Fkeys%3DDREAM%2BTOWN%2BDavid%2BBaldacci%26aff%3DNYT",
      },
    ],
    book_uri: "nyt://book/418369b6-2a61-5440-ae6c-8da8693e53dd",
  },
  {
    rank: 5,
    rank_last_week: 2,
    weeks_on_list: 2,
    asterisk: 0,
    dagger: 0,
    primary_isbn10: "1501133578",
    primary_isbn13: "9781501133572",
    publisher: "Atria",
    description:
      "A wedding between Ruby Danhauser and her pandemic boyfriend at a family beach house in Cape Cod brings to light family secrets.",
    price: "0.00",
    title: "THE SUMMER PLACE",
    author: "Jennifer Weiner",
    contributor: "by Jennifer Weiner",
    contributor_note: "",
    book_image:
      "https://storage.googleapis.com/du-prd/books/images/9781501133572.jpg",
    book_image_width: 331,
    book_image_height: 500,
    amazon_product_url: "https://www.amazon.com/dp/1501133578?tag=NYTBSREV-20",
    age_group: "",
    book_review_link: "",
    first_chapter_link: "",
    sunday_review_link: "",
    article_chapter_link: "",
    isbns: [
      {
        isbn10: "1501133578",
        isbn13: "9781501133572",
      },
      {
        isbn10: "1501133594",
        isbn13: "9781501133596",
      },
    ],
    buy_links: [
      {
        name: "Amazon",
        url: "https://www.amazon.com/dp/1501133578?tag=NYTBSREV-20",
      },
      {
        name: "Apple Books",
        url: "https://goto.applebooks.apple/9781501133572?at=10lIEQ",
      },
      {
        name: "Barnes and Noble",
        url: "https://www.anrdoezrs.net/click-7990613-11819508?url=https%3A%2F%2Fwww.barnesandnoble.com%2Fw%2F%3Fean%3D9781501133572",
      },
      {
        name: "Books-A-Million",
        url: "https://du-gae-books-dot-nyt-du-prd.appspot.com/redirect?url1=https%3A%2F%2Fwww.anrdoezrs.net%2Fclick-7990613-35140%3Furl%3Dhttps%253A%252F%252Fwww.booksamillion.com%252Fp%252FTHE%252BSUMMER%252BPLACE%252FJennifer%252BWeiner%252F9781501133572&url2=https%3A%2F%2Fwww.anrdoezrs.net%2Fclick-7990613-35140%3Furl%3Dhttps%253A%252F%252Fwww.booksamillion.com%252Fsearch%253Fquery%253DTHE%252BSUMMER%252BPLACE%252BJennifer%252BWeiner",
      },
      {
        name: "Bookshop",
        url: "https://du-gae-books-dot-nyt-du-prd.appspot.com/redirect?url1=https%3A%2F%2Fbookshop.org%2Fa%2F3546%2F9781501133572&url2=https%3A%2F%2Fbookshop.org%2Fbooks%3Faffiliate%3D3546%26keywords%3DTHE%2BSUMMER%2BPLACE",
      },
      {
        name: "IndieBound",
        url: "https://du-gae-books-dot-nyt-du-prd.appspot.com/redirect?url1=https%3A%2F%2Fwww.indiebound.org%2Fbook%2F9781501133572%3Faff%3DNYT&url2=https%3A%2F%2Fwww.indiebound.org%2Fsearch%2Fbook%3Fkeys%3DTHE%2BSUMMER%2BPLACE%2BJennifer%2BWeiner%26aff%3DNYT",
      },
    ],
    book_uri: "nyt://book/e6c62b36-05fd-5b21-9b5e-b839644d3ca5",
  },
  {
    rank: 6,
    rank_last_week: 4,
    weeks_on_list: 11,
    asterisk: 0,
    dagger: 0,
    primary_isbn10: "075955434X",
    primary_isbn13: "9780759554344",
    publisher: "Little, Brown",
    description:
      "A singer-songwriter goes to Nashville seeking stardom but is followed by her dark past.",
    price: "0.00",
    title: "RUN, ROSE, RUN",
    author: "Dolly Parton and James Patterson",
    contributor: "by Dolly Parton and James Patterson",
    contributor_note: "",
    book_image:
      "https://storage.googleapis.com/du-prd/books/images/9780759554344.jpg",
    book_image_width: 322,
    book_image_height: 500,
    amazon_product_url: "https://www.amazon.com/dp/075955434X?tag=NYTBSREV-20",
    age_group: "",
    book_review_link: "",
    first_chapter_link: "",
    sunday_review_link: "",
    article_chapter_link: "",
    isbns: [
      {
        isbn10: "075955434X",
        isbn13: "9780759554344",
      },
      {
        isbn10: "0759554374",
        isbn13: "9780759554375",
      },
    ],
    buy_links: [
      {
        name: "Amazon",
        url: "https://www.amazon.com/dp/075955434X?tag=NYTBSREV-20",
      },
      {
        name: "Apple Books",
        url: "https://goto.applebooks.apple/9780759554344?at=10lIEQ",
      },
      {
        name: "Barnes and Noble",
        url: "https://www.anrdoezrs.net/click-7990613-11819508?url=https%3A%2F%2Fwww.barnesandnoble.com%2Fw%2F%3Fean%3D9780759554344",
      },
      {
        name: "Books-A-Million",
        url: "https://du-gae-books-dot-nyt-du-prd.appspot.com/redirect?url1=https%3A%2F%2Fwww.anrdoezrs.net%2Fclick-7990613-35140%3Furl%3Dhttps%253A%252F%252Fwww.booksamillion.com%252Fp%252FRUN%25252C%252BROSE%25252C%252BRUN%252FDolly%252BParton%252Band%252BJames%252BPatterson%252F9780759554344&url2=https%3A%2F%2Fwww.anrdoezrs.net%2Fclick-7990613-35140%3Furl%3Dhttps%253A%252F%252Fwww.booksamillion.com%252Fsearch%253Fquery%253DRUN%25252C%252BROSE%25252C%252BRUN%252BDolly%252BParton%252Band%252BJames%252BPatterson",
      },
      {
        name: "Bookshop",
        url: "https://du-gae-books-dot-nyt-du-prd.appspot.com/redirect?url1=https%3A%2F%2Fbookshop.org%2Fa%2F3546%2F9780759554344&url2=https%3A%2F%2Fbookshop.org%2Fbooks%3Faffiliate%3D3546%26keywords%3DRUN%252C%2BROSE%252C%2BRUN",
      },
      {
        name: "IndieBound",
        url: "https://du-gae-books-dot-nyt-du-prd.appspot.com/redirect?url1=https%3A%2F%2Fwww.indiebound.org%2Fbook%2F9780759554344%3Faff%3DNYT&url2=https%3A%2F%2Fwww.indiebound.org%2Fsearch%2Fbook%3Fkeys%3DRUN%252C%2BROSE%252C%2BRUN%2BDolly%2BParton%2Band%2BJames%2BPatterson%26aff%3DNYT",
      },
    ],
    book_uri: "nyt://book/de82c2a0-f17b-526c-a326-c2233f0667b3",
  },
  {
    rank: 7,
    rank_last_week: 0,
    weeks_on_list: 1,
    asterisk: 0,
    dagger: 0,
    primary_isbn10: "1982173408",
    primary_isbn13: "9781982173401",
    publisher: "Gallery",
    description:
      "Lily and Leo must decide how much they will risk in pursuit of love and treasure in the red rock canyons of Utah.",
    price: "0.00",
    title: "SOMETHING WILDER",
    author: "Christina Lauren",
    contributor: "by Christina Lauren",
    contributor_note: "",
    book_image:
      "https://storage.googleapis.com/du-prd/books/images/9781982173401.jpg",
    book_image_width: 331,
    book_image_height: 500,
    amazon_product_url: "https://www.amazon.com/dp/1982173408?tag=NYTBSREV-20",
    age_group: "",
    book_review_link: "",
    first_chapter_link: "",
    sunday_review_link: "",
    article_chapter_link: "",
    isbns: [
      {
        isbn10: "1982173408",
        isbn13: "9781982173401",
      },
      {
        isbn10: "1982173424",
        isbn13: "9781982173425",
      },
    ],
    buy_links: [
      {
        name: "Amazon",
        url: "https://www.amazon.com/dp/1982173408?tag=NYTBSREV-20",
      },
      {
        name: "Apple Books",
        url: "https://goto.applebooks.apple/9781982173401?at=10lIEQ",
      },
      {
        name: "Barnes and Noble",
        url: "https://www.anrdoezrs.net/click-7990613-11819508?url=https%3A%2F%2Fwww.barnesandnoble.com%2Fw%2F%3Fean%3D9781982173401",
      },
      {
        name: "Books-A-Million",
        url: "https://du-gae-books-dot-nyt-du-prd.appspot.com/redirect?url1=https%3A%2F%2Fwww.anrdoezrs.net%2Fclick-7990613-35140%3Furl%3Dhttps%253A%252F%252Fwww.booksamillion.com%252Fp%252FSOMETHING%252BWILDER%252FChristina%252BLauren%252F9781982173401&url2=https%3A%2F%2Fwww.anrdoezrs.net%2Fclick-7990613-35140%3Furl%3Dhttps%253A%252F%252Fwww.booksamillion.com%252Fsearch%253Fquery%253DSOMETHING%252BWILDER%252BChristina%252BLauren",
      },
      {
        name: "Bookshop",
        url: "https://du-gae-books-dot-nyt-du-prd.appspot.com/redirect?url1=https%3A%2F%2Fbookshop.org%2Fa%2F3546%2F9781982173401&url2=https%3A%2F%2Fbookshop.org%2Fbooks%3Faffiliate%3D3546%26keywords%3DSOMETHING%2BWILDER",
      },
      {
        name: "IndieBound",
        url: "https://du-gae-books-dot-nyt-du-prd.appspot.com/redirect?url1=https%3A%2F%2Fwww.indiebound.org%2Fbook%2F9781982173401%3Faff%3DNYT&url2=https%3A%2F%2Fwww.indiebound.org%2Fsearch%2Fbook%3Fkeys%3DSOMETHING%2BWILDER%2BChristina%2BLauren%26aff%3DNYT",
      },
    ],
    book_uri: "nyt://book/183f660e-3edb-51e4-9e90-a0c5ffc524dc",
  },
  {
    rank: 8,
    rank_last_week: 9,
    weeks_on_list: 76,
    asterisk: 0,
    dagger: 0,
    primary_isbn10: "0525559477",
    primary_isbn13: "9780525559474",
    publisher: "Viking",
    description:
      "Nora Seed finds a library beyond the edge of the universe that contains books with multiple possibilities of the lives one could have lived.",
    price: "0.00",
    title: "THE MIDNIGHT LIBRARY",
    author: "Matt Haig",
    contributor: "by Matt Haig",
    contributor_note: "",
    book_image:
      "https://storage.googleapis.com/du-prd/books/images/9780525559474.jpg",
    book_image_width: 331,
    book_image_height: 500,
    amazon_product_url: "https://www.amazon.com/dp/0525559477?tag=NYTBSREV-20",
    age_group: "",
    book_review_link: "",
    first_chapter_link: "",
    sunday_review_link: "",
    article_chapter_link: "",
    isbns: [
      {
        isbn10: "0525559477",
        isbn13: "9780525559474",
      },
      {
        isbn10: "0525559485",
        isbn13: "9780525559481",
      },
      {
        isbn10: "0655697071",
        isbn13: "9780655697077",
      },
    ],
    buy_links: [
      {
        name: "Amazon",
        url: "https://www.amazon.com/dp/0525559477?tag=NYTBSREV-20",
      },
      {
        name: "Apple Books",
        url: "https://goto.applebooks.apple/9780525559474?at=10lIEQ",
      },
      {
        name: "Barnes and Noble",
        url: "https://www.anrdoezrs.net/click-7990613-11819508?url=https%3A%2F%2Fwww.barnesandnoble.com%2Fw%2F%3Fean%3D9780525559474",
      },
      {
        name: "Books-A-Million",
        url: "https://du-gae-books-dot-nyt-du-prd.appspot.com/redirect?url1=https%3A%2F%2Fwww.anrdoezrs.net%2Fclick-7990613-35140%3Furl%3Dhttps%253A%252F%252Fwww.booksamillion.com%252Fp%252FTHE%252BMIDNIGHT%252BLIBRARY%252FMatt%252BHaig%252F9780525559474&url2=https%3A%2F%2Fwww.anrdoezrs.net%2Fclick-7990613-35140%3Furl%3Dhttps%253A%252F%252Fwww.booksamillion.com%252Fsearch%253Fquery%253DTHE%252BMIDNIGHT%252BLIBRARY%252BMatt%252BHaig",
      },
      {
        name: "Bookshop",
        url: "https://du-gae-books-dot-nyt-du-prd.appspot.com/redirect?url1=https%3A%2F%2Fbookshop.org%2Fa%2F3546%2F9780525559474&url2=https%3A%2F%2Fbookshop.org%2Fbooks%3Faffiliate%3D3546%26keywords%3DTHE%2BMIDNIGHT%2BLIBRARY",
      },
      {
        name: "IndieBound",
        url: "https://du-gae-books-dot-nyt-du-prd.appspot.com/redirect?url1=https%3A%2F%2Fwww.indiebound.org%2Fbook%2F9780525559474%3Faff%3DNYT&url2=https%3A%2F%2Fwww.indiebound.org%2Fsearch%2Fbook%3Fkeys%3DTHE%2BMIDNIGHT%2BLIBRARY%2BMatt%2BHaig%26aff%3DNYT",
      },
    ],
    book_uri: "nyt://book/60d0ee2d-3d05-50c9-a484-050d17a2308e",
  },
  {
    rank: 9,
    rank_last_week: 7,
    weeks_on_list: 13,
    asterisk: 0,
    dagger: 0,
    primary_isbn10: "0063003058",
    primary_isbn13: "9780063003057",
    publisher: "Morrow",
    description:
      "Jess has suspicions about her half-brother’s neighbors when he goes missing.",
    price: "0.00",
    title: "THE PARIS APARTMENT",
    author: "Lucy Foley",
    contributor: "by Lucy Foley",
    contributor_note: "",
    book_image:
      "https://storage.googleapis.com/du-prd/books/images/9780063003057.jpg",
    book_image_width: 331,
    book_image_height: 500,
    amazon_product_url: "https://www.amazon.com/dp/0063003058?tag=NYTBSREV-20",
    age_group: "",
    book_review_link: "",
    first_chapter_link: "",
    sunday_review_link: "",
    article_chapter_link: "",
    isbns: [
      {
        isbn10: "0063003058",
        isbn13: "9780063003057",
      },
      {
        isbn10: "0063003082",
        isbn13: "9780063003088",
      },
    ],
    buy_links: [
      {
        name: "Amazon",
        url: "https://www.amazon.com/dp/0063003058?tag=NYTBSREV-20",
      },
      {
        name: "Apple Books",
        url: "https://goto.applebooks.apple/9780063003057?at=10lIEQ",
      },
      {
        name: "Barnes and Noble",
        url: "https://www.anrdoezrs.net/click-7990613-11819508?url=https%3A%2F%2Fwww.barnesandnoble.com%2Fw%2F%3Fean%3D9780063003057",
      },
      {
        name: "Books-A-Million",
        url: "https://du-gae-books-dot-nyt-du-prd.appspot.com/redirect?url1=https%3A%2F%2Fwww.anrdoezrs.net%2Fclick-7990613-35140%3Furl%3Dhttps%253A%252F%252Fwww.booksamillion.com%252Fp%252FTHE%252BPARIS%252BAPARTMENT%252FLucy%252BFoley%252F9780063003057&url2=https%3A%2F%2Fwww.anrdoezrs.net%2Fclick-7990613-35140%3Furl%3Dhttps%253A%252F%252Fwww.booksamillion.com%252Fsearch%253Fquery%253DTHE%252BPARIS%252BAPARTMENT%252BLucy%252BFoley",
      },
      {
        name: "Bookshop",
        url: "https://du-gae-books-dot-nyt-du-prd.appspot.com/redirect?url1=https%3A%2F%2Fbookshop.org%2Fa%2F3546%2F9780063003057&url2=https%3A%2F%2Fbookshop.org%2Fbooks%3Faffiliate%3D3546%26keywords%3DTHE%2BPARIS%2BAPARTMENT",
      },
      {
        name: "IndieBound",
        url: "https://du-gae-books-dot-nyt-du-prd.appspot.com/redirect?url1=https%3A%2F%2Fwww.indiebound.org%2Fbook%2F9780063003057%3Faff%3DNYT&url2=https%3A%2F%2Fwww.indiebound.org%2Fsearch%2Fbook%3Fkeys%3DTHE%2BPARIS%2BAPARTMENT%2BLucy%2BFoley%26aff%3DNYT",
      },
    ],
    book_uri: "nyt://book/ef0030b7-5eca-5278-835a-ade95bfbb1f2",
  },
  {
    rank: 10,
    rank_last_week: 5,
    weeks_on_list: 3,
    asterisk: 0,
    dagger: 0,
    primary_isbn10: "1250812194",
    primary_isbn13: "9781250812193",
    publisher: "Tor",
    description:
      "A bartender working at a Berkshires dive bar deals with doppelgängers, billionaires and magicians seeking a vast and terrible power.",
    price: "0.00",
    title: "BOOK OF NIGHT",
    author: "Holly Black",
    contributor: "by Holly Black",
    contributor_note: "",
    book_image:
      "https://storage.googleapis.com/du-prd/books/images/9781250812193.jpg",
    book_image_width: 329,
    book_image_height: 500,
    amazon_product_url: "https://www.amazon.com/dp/1250812194?tag=NYTBSREV-20",
    age_group: "",
    book_review_link: "",
    first_chapter_link: "",
    sunday_review_link: "",
    article_chapter_link: "",
    isbns: [
      {
        isbn10: "1250812194",
        isbn13: "9781250812193",
      },
    ],
    buy_links: [
      {
        name: "Amazon",
        url: "https://www.amazon.com/dp/1250812194?tag=NYTBSREV-20",
      },
      {
        name: "Apple Books",
        url: "https://goto.applebooks.apple/9781250812193?at=10lIEQ",
      },
      {
        name: "Barnes and Noble",
        url: "https://www.anrdoezrs.net/click-7990613-11819508?url=https%3A%2F%2Fwww.barnesandnoble.com%2Fw%2F%3Fean%3D9781250812193",
      },
      {
        name: "Books-A-Million",
        url: "https://du-gae-books-dot-nyt-du-prd.appspot.com/redirect?url1=https%3A%2F%2Fwww.anrdoezrs.net%2Fclick-7990613-35140%3Furl%3Dhttps%253A%252F%252Fwww.booksamillion.com%252Fp%252FBOOK%252BOF%252BNIGHT%252FHolly%252BBlack%252F9781250812193&url2=https%3A%2F%2Fwww.anrdoezrs.net%2Fclick-7990613-35140%3Furl%3Dhttps%253A%252F%252Fwww.booksamillion.com%252Fsearch%253Fquery%253DBOOK%252BOF%252BNIGHT%252BHolly%252BBlack",
      },
      {
        name: "Bookshop",
        url: "https://du-gae-books-dot-nyt-du-prd.appspot.com/redirect?url1=https%3A%2F%2Fbookshop.org%2Fa%2F3546%2F9781250812193&url2=https%3A%2F%2Fbookshop.org%2Fbooks%3Faffiliate%3D3546%26keywords%3DBOOK%2BOF%2BNIGHT",
      },
      {
        name: "IndieBound",
        url: "https://du-gae-books-dot-nyt-du-prd.appspot.com/redirect?url1=https%3A%2F%2Fwww.indiebound.org%2Fbook%2F9781250812193%3Faff%3DNYT&url2=https%3A%2F%2Fwww.indiebound.org%2Fsearch%2Fbook%3Fkeys%3DBOOK%2BOF%2BNIGHT%2BHolly%2BBlack%26aff%3DNYT",
      },
    ],
    book_uri: "nyt://book/18000453-1699-5670-9d5f-e09c048009f1",
  },
  {
    rank: 11,
    rank_last_week: 10,
    weeks_on_list: 49,
    asterisk: 0,
    dagger: 0,
    primary_isbn10: "1501171348",
    primary_isbn13: "9781501171345",
    publisher: "Simon & Schuster",
    description:
      "Hannah Hall discovers truths about her missing husband and bonds with his daughter from a previous relationship.",
    price: "0.00",
    title: "THE LAST THING HE TOLD ME",
    author: "Laura Dave",
    contributor: "by Laura Dave",
    contributor_note: "",
    book_image:
      "https://storage.googleapis.com/du-prd/books/images/9781501171345.jpg",
    book_image_width: 331,
    book_image_height: 500,
    amazon_product_url: "https://www.amazon.com/dp/1501171348?tag=NYTBSREV-20",
    age_group: "",
    book_review_link: "",
    first_chapter_link: "",
    sunday_review_link: "",
    article_chapter_link: "",
    isbns: [
      {
        isbn10: "1501171348",
        isbn13: "9781501171345",
      },
      {
        isbn10: "1501171364",
        isbn13: "9781501171369",
      },
      {
        isbn10: "1797124749",
        isbn13: "9781797124742",
      },
      {
        isbn10: "1638080992",
        isbn13: "9781638080992",
      },
    ],
    buy_links: [
      {
        name: "Amazon",
        url: "https://www.amazon.com/dp/1501171348?tag=NYTBSREV-20",
      },
      {
        name: "Apple Books",
        url: "https://goto.applebooks.apple/9781501171345?at=10lIEQ",
      },
      {
        name: "Barnes and Noble",
        url: "https://www.anrdoezrs.net/click-7990613-11819508?url=https%3A%2F%2Fwww.barnesandnoble.com%2Fw%2F%3Fean%3D9781501171345",
      },
      {
        name: "Books-A-Million",
        url: "https://du-gae-books-dot-nyt-du-prd.appspot.com/redirect?url1=https%3A%2F%2Fwww.anrdoezrs.net%2Fclick-7990613-35140%3Furl%3Dhttps%253A%252F%252Fwww.booksamillion.com%252Fp%252FTHE%252BLAST%252BTHING%252BHE%252BTOLD%252BME%252FLaura%252BDave%252F9781501171345&url2=https%3A%2F%2Fwww.anrdoezrs.net%2Fclick-7990613-35140%3Furl%3Dhttps%253A%252F%252Fwww.booksamillion.com%252Fsearch%253Fquery%253DTHE%252BLAST%252BTHING%252BHE%252BTOLD%252BME%252BLaura%252BDave",
      },
      {
        name: "Bookshop",
        url: "https://du-gae-books-dot-nyt-du-prd.appspot.com/redirect?url1=https%3A%2F%2Fbookshop.org%2Fa%2F3546%2F9781501171345&url2=https%3A%2F%2Fbookshop.org%2Fbooks%3Faffiliate%3D3546%26keywords%3DTHE%2BLAST%2BTHING%2BHE%2BTOLD%2BME",
      },
      {
        name: "IndieBound",
        url: "https://du-gae-books-dot-nyt-du-prd.appspot.com/redirect?url1=https%3A%2F%2Fwww.indiebound.org%2Fbook%2F9781501171345%3Faff%3DNYT&url2=https%3A%2F%2Fwww.indiebound.org%2Fsearch%2Fbook%3Fkeys%3DTHE%2BLAST%2BTHING%2BHE%2BTOLD%2BME%2BLaura%2BDave%26aff%3DNYT",
      },
    ],
    book_uri: "nyt://book/b38ae769-e873-5272-bb5a-c58a35162db1",
  },
  {
    rank: 12,
    rank_last_week: 0,
    weeks_on_list: 1,
    asterisk: 0,
    dagger: 0,
    primary_isbn10: "0316531286",
    primary_isbn13: "9780316531283",
    publisher: "Little, Brown",
    description:
      "When a family vacation goes wrong, Heather Baxter and her step-children must escape a remote island.",
    price: "0.00",
    title: "THE ISLAND",
    author: "Adrian McKinty",
    contributor: "by Adrian McKinty",
    contributor_note: "",
    book_image:
      "https://storage.googleapis.com/du-prd/books/images/9780316531283.jpg",
    book_image_width: 323,
    book_image_height: 500,
    amazon_product_url: "https://www.amazon.com/dp/0316531286?tag=NYTBSREV-20",
    age_group: "",
    book_review_link: "",
    first_chapter_link: "",
    sunday_review_link: "",
    article_chapter_link: "",
    isbns: [
      {
        isbn10: "0316531286",
        isbn13: "9780316531283",
      },
    ],
    buy_links: [
      {
        name: "Amazon",
        url: "https://www.amazon.com/dp/0316531286?tag=NYTBSREV-20",
      },
      {
        name: "Apple Books",
        url: "https://goto.applebooks.apple/9780316531283?at=10lIEQ",
      },
      {
        name: "Barnes and Noble",
        url: "https://www.anrdoezrs.net/click-7990613-11819508?url=https%3A%2F%2Fwww.barnesandnoble.com%2Fw%2F%3Fean%3D9780316531283",
      },
      {
        name: "Books-A-Million",
        url: "https://du-gae-books-dot-nyt-du-prd.appspot.com/redirect?url1=https%3A%2F%2Fwww.anrdoezrs.net%2Fclick-7990613-35140%3Furl%3Dhttps%253A%252F%252Fwww.booksamillion.com%252Fp%252FTHE%252BISLAND%252FAdrian%252BMcKinty%252F9780316531283&url2=https%3A%2F%2Fwww.anrdoezrs.net%2Fclick-7990613-35140%3Furl%3Dhttps%253A%252F%252Fwww.booksamillion.com%252Fsearch%253Fquery%253DTHE%252BISLAND%252BAdrian%252BMcKinty",
      },
      {
        name: "Bookshop",
        url: "https://du-gae-books-dot-nyt-du-prd.appspot.com/redirect?url1=https%3A%2F%2Fbookshop.org%2Fa%2F3546%2F9780316531283&url2=https%3A%2F%2Fbookshop.org%2Fbooks%3Faffiliate%3D3546%26keywords%3DTHE%2BISLAND",
      },
      {
        name: "IndieBound",
        url: "https://du-gae-books-dot-nyt-du-prd.appspot.com/redirect?url1=https%3A%2F%2Fwww.indiebound.org%2Fbook%2F9780316531283%3Faff%3DNYT&url2=https%3A%2F%2Fwww.indiebound.org%2Fsearch%2Fbook%3Fkeys%3DTHE%2BISLAND%2BAdrian%2BMcKinty%26aff%3DNYT",
      },
    ],
    book_uri: "nyt://book/0e565914-be52-55b8-a056-26c54326b445",
  },
  {
    rank: 13,
    rank_last_week: 8,
    weeks_on_list: 3,
    asterisk: 0,
    dagger: 0,
    primary_isbn10: "1250278368",
    primary_isbn13: "9781250278364",
    publisher: "St. Martin's",
    description:
      "A widow starring in a beach house renovation reality show gets caught up in competing love interests and an old missing persons case.",
    price: "0.00",
    title: "THE HOMEWRECKERS",
    author: "Mary Kay Andrews",
    contributor: "by Mary Kay Andrews",
    contributor_note: "",
    book_image:
      "https://storage.googleapis.com/du-prd/books/images/9781250278364.jpg",
    book_image_width: 329,
    book_image_height: 500,
    amazon_product_url: "https://www.amazon.com/dp/1250278368?tag=NYTBSREV-20",
    age_group: "",
    book_review_link: "",
    first_chapter_link: "",
    sunday_review_link: "",
    article_chapter_link: "",
    isbns: [
      {
        isbn10: "1250278368",
        isbn13: "9781250278364",
      },
      {
        isbn10: "1250278376",
        isbn13: "9781250278371",
      },
    ],
    buy_links: [
      {
        name: "Amazon",
        url: "https://www.amazon.com/dp/1250278368?tag=NYTBSREV-20",
      },
      {
        name: "Apple Books",
        url: "https://goto.applebooks.apple/9781250278364?at=10lIEQ",
      },
      {
        name: "Barnes and Noble",
        url: "https://www.anrdoezrs.net/click-7990613-11819508?url=https%3A%2F%2Fwww.barnesandnoble.com%2Fw%2F%3Fean%3D9781250278364",
      },
      {
        name: "Books-A-Million",
        url: "https://du-gae-books-dot-nyt-du-prd.appspot.com/redirect?url1=https%3A%2F%2Fwww.anrdoezrs.net%2Fclick-7990613-35140%3Furl%3Dhttps%253A%252F%252Fwww.booksamillion.com%252Fp%252FTHE%252BHOMEWRECKERS%252FMary%252BKay%252BAndrews%252F9781250278364&url2=https%3A%2F%2Fwww.anrdoezrs.net%2Fclick-7990613-35140%3Furl%3Dhttps%253A%252F%252Fwww.booksamillion.com%252Fsearch%253Fquery%253DTHE%252BHOMEWRECKERS%252BMary%252BKay%252BAndrews",
      },
      {
        name: "Bookshop",
        url: "https://du-gae-books-dot-nyt-du-prd.appspot.com/redirect?url1=https%3A%2F%2Fbookshop.org%2Fa%2F3546%2F9781250278364&url2=https%3A%2F%2Fbookshop.org%2Fbooks%3Faffiliate%3D3546%26keywords%3DTHE%2BHOMEWRECKERS",
      },
      {
        name: "IndieBound",
        url: "https://du-gae-books-dot-nyt-du-prd.appspot.com/redirect?url1=https%3A%2F%2Fwww.indiebound.org%2Fbook%2F9781250278364%3Faff%3DNYT&url2=https%3A%2F%2Fwww.indiebound.org%2Fsearch%2Fbook%3Fkeys%3DTHE%2BHOMEWRECKERS%2BMary%2BKay%2BAndrews%26aff%3DNYT",
      },
    ],
    book_uri: "nyt://book/9fadd15d-6424-5305-b8d7-6350e0f1cc7e",
  },
  {
    rank: 14,
    rank_last_week: 0,
    weeks_on_list: 1,
    asterisk: 0,
    dagger: 0,
    primary_isbn10: "0062434128",
    primary_isbn13: "9780062434128",
    publisher: "Morrow",
    description:
      "In a follow-up to “Noir,” a cast of characters deal with mischief and mayhem in 1947 San Francisco.",
    price: "0.00",
    title: "RAZZMATAZZ",
    author: "Christopher Moore",
    contributor: "by Christopher Moore",
    contributor_note: "",
    book_image:
      "https://storage.googleapis.com/du-prd/books/images/9780062434128.jpg",
    book_image_width: 331,
    book_image_height: 500,
    amazon_product_url: "https://www.amazon.com/dp/0062434128?tag=NYTBSREV-20",
    age_group: "",
    book_review_link: "",
    first_chapter_link: "",
    sunday_review_link: "",
    article_chapter_link: "",
    isbns: [
      {
        isbn10: "0062434128",
        isbn13: "9780062434128",
      },
    ],
    buy_links: [
      {
        name: "Amazon",
        url: "https://www.amazon.com/dp/0062434128?tag=NYTBSREV-20",
      },
      {
        name: "Apple Books",
        url: "https://goto.applebooks.apple/9780062434128?at=10lIEQ",
      },
      {
        name: "Barnes and Noble",
        url: "https://www.anrdoezrs.net/click-7990613-11819508?url=https%3A%2F%2Fwww.barnesandnoble.com%2Fw%2F%3Fean%3D9780062434128",
      },
      {
        name: "Books-A-Million",
        url: "https://du-gae-books-dot-nyt-du-prd.appspot.com/redirect?url1=https%3A%2F%2Fwww.anrdoezrs.net%2Fclick-7990613-35140%3Furl%3Dhttps%253A%252F%252Fwww.booksamillion.com%252Fp%252FRAZZMATAZZ%252FChristopher%252BMoore%252F9780062434128&url2=https%3A%2F%2Fwww.anrdoezrs.net%2Fclick-7990613-35140%3Furl%3Dhttps%253A%252F%252Fwww.booksamillion.com%252Fsearch%253Fquery%253DRAZZMATAZZ%252BChristopher%252BMoore",
      },
      {
        name: "Bookshop",
        url: "https://du-gae-books-dot-nyt-du-prd.appspot.com/redirect?url1=https%3A%2F%2Fbookshop.org%2Fa%2F3546%2F9780062434128&url2=https%3A%2F%2Fbookshop.org%2Fbooks%3Faffiliate%3D3546%26keywords%3DRAZZMATAZZ",
      },
      {
        name: "IndieBound",
        url: "https://du-gae-books-dot-nyt-du-prd.appspot.com/redirect?url1=https%3A%2F%2Fwww.indiebound.org%2Fbook%2F9780062434128%3Faff%3DNYT&url2=https%3A%2F%2Fwww.indiebound.org%2Fsearch%2Fbook%3Fkeys%3DRAZZMATAZZ%2BChristopher%2BMoore%26aff%3DNYT",
      },
    ],
    book_uri: "nyt://book/360fe717-2af3-5c06-8422-075001e6a1dc",
  },
  {
    rank: 15,
    rank_last_week: 0,
    weeks_on_list: 1,
    asterisk: 0,
    dagger: 0,
    primary_isbn10: "0063040743",
    primary_isbn13: "9780063040748",
    publisher: "Morrow",
    description:
      "A reclusive heiress allows a reality home rehab show to restore her house filled with family history on two conditions.",
    price: "0.00",
    title: "THE LOST SUMMERS OF NEWPORT",
    author: "Beatriz Williams, Lauren Willig and Karen White",
    contributor: "Beatriz Williams, Lauren Willig and Karen White",
    contributor_note: "",
    book_image:
      "https://storage.googleapis.com/du-prd/books/images/9780063040748.jpg",
    book_image_width: 320,
    book_image_height: 500,
    amazon_product_url: "https://www.amazon.com/dp/0063040743?tag=NYTBSREV-20",
    age_group: "",
    book_review_link: "",
    first_chapter_link: "",
    sunday_review_link: "",
    article_chapter_link: "",
    isbns: [
      {
        isbn10: "0063040743",
        isbn13: "9780063040748",
      },
    ],
    buy_links: [
      {
        name: "Amazon",
        url: "https://www.amazon.com/dp/0063040743?tag=NYTBSREV-20",
      },
      {
        name: "Apple Books",
        url: "https://goto.applebooks.apple/9780063040748?at=10lIEQ",
      },
      {
        name: "Barnes and Noble",
        url: "https://www.anrdoezrs.net/click-7990613-11819508?url=https%3A%2F%2Fwww.barnesandnoble.com%2Fw%2F%3Fean%3D9780063040748",
      },
      {
        name: "Books-A-Million",
        url: "https://du-gae-books-dot-nyt-du-prd.appspot.com/redirect?url1=https%3A%2F%2Fwww.anrdoezrs.net%2Fclick-7990613-35140%3Furl%3Dhttps%253A%252F%252Fwww.booksamillion.com%252Fp%252FTHE%252BLOST%252BSUMMERS%252BOF%252BNEWPORT%252FBeatriz%252BWilliams%25252C%252BLauren%252BWillig%252Band%252BKaren%252BWhite%252F9780063040748&url2=https%3A%2F%2Fwww.anrdoezrs.net%2Fclick-7990613-35140%3Furl%3Dhttps%253A%252F%252Fwww.booksamillion.com%252Fsearch%253Fquery%253DTHE%252BLOST%252BSUMMERS%252BOF%252BNEWPORT%252BBeatriz%252BWilliams%25252C%252BLauren%252BWillig%252Band%252BKaren%252BWhite",
      },
      {
        name: "Bookshop",
        url: "https://du-gae-books-dot-nyt-du-prd.appspot.com/redirect?url1=https%3A%2F%2Fbookshop.org%2Fa%2F3546%2F9780063040748&url2=https%3A%2F%2Fbookshop.org%2Fbooks%3Faffiliate%3D3546%26keywords%3DTHE%2BLOST%2BSUMMERS%2BOF%2BNEWPORT",
      },
      {
        name: "IndieBound",
        url: "https://du-gae-books-dot-nyt-du-prd.appspot.com/redirect?url1=https%3A%2F%2Fwww.indiebound.org%2Fbook%2F9780063040748%3Faff%3DNYT&url2=https%3A%2F%2Fwww.indiebound.org%2Fsearch%2Fbook%3Fkeys%3DTHE%2BLOST%2BSUMMERS%2BOF%2BNEWPORT%2BBeatriz%2BWilliams%252C%2BLauren%2BWillig%2Band%2BKaren%2BWhite%26aff%3DNYT",
      },
    ],
    book_uri: "nyt://book/4a8ebc0f-600a-5f24-84f5-a19a2788294c",
  },
];

postApp.post(
  "/add-books",
  asyncHandler(async (req, res) => {
    const b = _filter(books);
    try {
      await Post.insertMany(b);
      res.send({ message: "success" });
    } catch (e) {
      res.send({ message: "error" });
    }
  })
);

module.exports = postApp;
