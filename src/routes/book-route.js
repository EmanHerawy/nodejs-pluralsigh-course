const express = require('express');
const bookRouter = express.Router();
const debug = require('debug')('app:book-route')

const {
    MongoClient,
    ObjectID
} = require('mongodb');

function route(nav) {
    // const books = [{
    //         title: 'War and Peace',
    //         genre: 'Historical Fiction',
    //         author: 'Lev Nikolayevich Tolstoy',
    //         read: false
    //     },
    //     {
    //         title: 'Les Misérables',
    //         genre: 'Historical Fiction',
    //         author: 'Victor Hugo',
    //         read: false
    //     },
    //     {
    //         title: 'The Time Machine',
    //         genre: 'Science Fiction',
    //         author: 'H. G. Wells',
    //         read: false
    //     },
    //     {
    //         title: 'A Journey into the Center of the Earth',
    //         genre: 'Science Fiction',
    //         author: 'Jules Verne',
    //         read: false
    //     },
    //     {
    //         title: 'The Dark World',
    //         genre: 'Fantasy',
    //         author: 'Henry Kuttner',
    //         read: false
    //     },
    //     {
    //         title: 'The Wind in the Willows',
    //         genre: 'Fantasy',
    //         author: 'Kenneth Grahame',
    //         read: false
    //     },
    //     {
    //         title: 'Life On The Mississippi',
    //         genre: 'History',
    //         author: 'Mark Twain',
    //         read: false
    //     },
    //     {
    //         title: 'Childhood',
    //         genre: 'Biography',
    //         author: 'Lev Nikolayevich Tolstoy',
    //         read: false
    //     }
    // ];
    mongoGetAll().then(s => {
        debug('books', s)
        const books = s;
        bookRouter.route('/').get((req, res) => {
            res.render(
                'books', {
                    nav,
                    title: 'Library',
                    books
                }
            );
        });


    })
    bookRouter.route('/:id').get((req, res) => {
        const id = req.params.id;
        mongoGetSingle(id).then(s => {
            res.render(
                'book', {
                    nav,
                    title: 'Library',
                    book: s
                }
            );
        })


    })
    return bookRouter;
}

async function mongoGetAll() {
    const url = 'mongodb://127.0.0.1:27017';
    const dbName = 'LibraryAppDB'
    let client;
    try {
        client = await MongoClient.connect(url, {
            useNewUrlParser: true
        });
        const db = client.db(dbName);
        // debug(' connected to the mongodb', db)
        const coll = await db.collection('books');
        const result = await coll.find().toArray();
        // debug(' inserted response', result)

        return result;

    } catch (error) {
        debug('error', error)
    }
    client.close();

}
async function mongoGetSingle(id) {
    const url = 'mongodb://127.0.0.1:27017';
    const dbName = 'LibraryAppDB'
    let client;
    try {
        client = await MongoClient.connect(url, {
            useNewUrlParser: true
        });
        const db = client.db(dbName);
        // debug(' connected to the mongodb', db)
        const coll = await db.collection('books');
        const result = await coll.findOne({
            _id: new ObjectID(id)
        })
        debug(' findOne response', result)

        return result;

    } catch (error) {
        debug('error', error)
    }
    client.close();

}


module.exports = route;