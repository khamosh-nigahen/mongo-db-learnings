// things to understand:
// 1. Understand write concern parameter in insert query's
// 2. check how can we use a cursur to return paginated documents

// show all the databses
show dbs;

// use the below databse
use bookdb;


// insert documents in the collection
db.books.insertOne({ 
    title: 'MongoDB insertOne',
    isbn: '0-7617-6154-3'
});

db.books.insertOne({
    _id: 123,
    title: "id sent in this doc"
});

db.books.insertOne({
   _id: 123,
   title: "MongoDB for JS Developers",
   isbn: "0-4925-3790-9"
});

db.books.insertMany([
   { title:  "NoSQL Distilled", isbn: "0-4696-7030-4"},
   { title:  "NoSQL in 7 Days", isbn: "0-4086-6859-8"},
   { title:  "NoSQL Database", isbn: "0-2504-6932-4"},
]);

db.books.insertMany([
   { _id: 263, title:  "SQL Basics", isbn: "0-7925-6962-8"},
   { _id: 3738, title:  "SQL Advanced", isbn: "0-1184-7778-1"}
]);

// if one bulk insertion fails all fails like in a transaction because here ordered is true by default
db.books.insertMany([
   { _id: 123, title:  "SQL Basics", isbn: "0-7925-6962-8"},
   { _id: 456, title:  "MongoDB Advanced", isbn: "0-1184-7778-1"}
]);

// below id 4 and 5 will be inserted because we are sending ordered as false
db.books.insertMany(
   [{ _id: 3, title:  "SQL Performance Tuning", isbn: "0-6799-2974-6"},
   { _id: 3, title:  "SQL Trees", isbn: "0-6998-1556-8"},
   { _id: 4, title:  "SQL Graph", isbn: "0-6426-4996-0"},
   { _id: 5, title:  "NoSQL Pros", isbn: "0-9602-9886-X"}], 
   { ordered: false }
);

// get all the documents in books collection
db.books.find();

// ====================================================

db.products.insertMany([
    { "_id" : 1, "name" : "xPhone", "price" : 799, "releaseDate": ISODate("2011-05-14"), "spec" : { "ram" : 4, "screen" : 6.5, "cpu" : 2.66 },"color":["white","black"],"storage":[64,128,256]},
    { "_id" : 2, "name" : "xTablet", "price" : 899, "releaseDate": ISODate("2011-09-01") , "spec" : { "ram" : 16, "screen" : 9.5, "cpu" : 3.66 },"color":["white","black","purple"],"storage":[128,256,512]},
    { "_id" : 3, "name" : "SmartTablet", "price" : 899, "releaseDate": ISODate("2015-01-14"), "spec" : { "ram" : 12, "screen" : 9.7, "cpu" : 3.66 },"color":["blue"],"storage":[16,64,128]},
    { "_id" : 4, "name" : "SmartPad", "price" : 699, "releaseDate": ISODate("2020-05-14"),"spec" : { "ram" : 8, "screen" : 9.7, "cpu" : 1.66 },"color":["white","orange","gold","gray"],"storage":[128,256,1024]},
    { "_id" : 5, "name" : "SmartPhone", "price" : 599,"releaseDate": ISODate("2022-09-14"), "spec" : { "ram" : 4, "screen" : 5.7, "cpu" : 1.66 },"color":["white","orange","gold","gray"],"storage":[128,256]}
 ]);

// just return the first document which it finds in the DB

db.products.findOne();
db.products.findOne({})

db.products.findOne({_id:2})

// the second parameter is the projection parameter which specifies which fiels you want to return
// filed: true or 1 means return that field, filed: false or 0 means do not return that field
db.products.findOne({_id: 5}, {name: 1})

// ====================================================================

db.books.insertMany([
	{ "_id" : 1, "title" : "Unlocking Android", "isbn" : "1933988673", "categories" : [ "Open Source", "Mobile" ] },
	{ "_id" : 2, "title" : "Android in Action, Second Edition", "isbn" : "1935182722", "categories" : [ "Java" ] },
	{ "_id" : 6, "title" : "Collective Intelligence in Action", "isbn" : "1933988312", "categories" : [ "Internet" ] },
	{ "_id" : 7, "title" : "Zend Framework in Action", "isbn" : "1933988320", "categories" : [ "Web Development" ] },
	{ "_id" : 8, "title" : "Flex on Java", "isbn" : "1933988797", "categories" : [ "Internet" ] },
	{ "_id" : 9, "title" : "Griffon in Action", "isbn" : "1935182234", "categories" : [ "Java" ] },
	{ "_id" : 10, "title" : "OSGi in Depth", "isbn" : "193518217X", "categories" : [ "Java" ] },
	{ "_id" : 11, "title" : "Flexible Rails", "isbn" : "1933988509", "categories" : [ "Web Development" ] },
	{ "_id" : 13, "title" : "Hello! Flex 4", "isbn" : "1933988762", "categories" : [ "Internet" ] },
	{ "_id" : 14, "title" : "Coffeehouse", "isbn" : "1884777384", "categories" : [ "Miscellaneous" ] },
	{ "_id" : 15, "title" : "Team Foundation Server 2008 in Action", "isbn" : "1933988592", "categories" : [ "Microsoft .NET" ] },
	{ "_id" : 16, "title" : "Brownfield Application Development in .NET", "isbn" : "1933988711", "categories" : [ "Microsoft" ] },
	{ "_id" : 17, "title" : "MongoDB in Action", "isbn" : "1935182870", "categories" : [ "Next Generation Databases" ] },
	{ "_id" : 18, "title" : "Distributed Application Development with PowerBuilder 6.0", "isbn" : "1884777686", "categories" : [ "PowerBuilder" ] },
	{ "_id" : 19, "title" : "Jaguar Development with PowerBuilder 7", "isbn" : "1884777864", "categories" : [ "PowerBuilder", "Client-Server" ] },
	{ "_id" : 20, "title" : "Taming Jaguar", "isbn" : "1884777686", "categories" : [ "PowerBuilder" ] },
	{ "_id" : 21, "title" : "3D User Interfaces with Java 3D", "isbn" : "1884777902", "categories" : [ "Java", "Computer Graphics" ] },
	{ "_id" : 22, "title" : "Hibernate in Action", "isbn" : "193239415X", "categories" : [ "Java" ] },
	{ "_id" : 23, "title" : "Hibernate in Action (Chinese Edition)", "categories" : [ "Java" ] },
	{ "_id" : 24, "title" : "Java Persistence with Hibernate", "isbn" : "1932394885", "categories" : [ "Java" ] },
	{ "_id" : 25, "title" : "JSTL in Action", "isbn" : "1930110529", "categories" : [ "Internet" ] },
	{ "_id" : 26, "title" : "iBATIS in Action", "isbn" : "1932394826", "categories" : [ "Web Development" ] },
	{ "_id" : 27, "title" : "Designing Hard Software", "isbn" : "133046192", "categories" : [ "Object-Oriented Programming", "S" ] },
	{ "_id" : 28, "title" : "Hibernate Search in Action", "isbn" : "1933988649", "categories" : [ "Java" ] },
	{ "_id" : 29, "title" : "jQuery in Action", "isbn" : "1933988355", "categories" : [ "Web Development" ] },
	{ "_id" : 30, "title" : "jQuery in Action, Second Edition", "isbn" : "1935182323", "categories" : [ "Java" ] }
]);

// find returns an array of objects so taje care in the code
db.books.find({_id: 10});

// find all the docs related to the query
db.books.find({ categories: 'Java'}, { title: 1,isbn: 1, _id:0})

db.books.find();

// ==================================================================

// how to use projections

db.gadgets.insertMany([
    { "_id" : 1, "name" : "xPhone", "price" : 799, "releaseDate": ISODate("2011-05-14"), "spec" : { "ram" : 4, "screen" : 6.5, "cpu" : 2.66 },"color":["white","black"],"storage":[64,128,256],"inventory":[{ qty: 1200,"warehouse": "San Jose"}]},
    { "_id" : 2, "name" : "xTablet", "price" : 899, "releaseDate": ISODate("2011-09-01") , "spec" : { "ram" : 16, "screen" : 9.5, "cpu" : 3.66 },"color":["white","black","purple"],"storage":[128,256,512],"inventory":[{ qty: 300,"warehouse": "San Francisco"}]},
    { "_id" : 3, "name" : "SmartTablet", "price" : 899, "releaseDate": ISODate("2015-01-14"), "spec" : { "ram" : 12, "screen" : 9.7, "cpu" : 3.66 },"color":["blue"],"storage":[16,64,128],"inventory":[{ qty: 400,"warehouse": "San Jose"},{ qty: 200,"warehouse": "San Francisco"}]},
    { "_id" : 4, "name" : "SmartPad", "price" : 699, "releaseDate": ISODate("2020-05-14"),"spec" : { "ram" : 8, "screen" : 9.7, "cpu" : 1.66 },"color":["white","orange","gold","gray"],"storage":[128,256,1024],"inventory":[{ qty: 1200,"warehouse": "San Mateo"}]},
    { "_id" : 5, "name" : "SmartPhone", "price" : 599,"releaseDate": ISODate("2022-09-14"), "spec" : { "ram" : 4, "screen" : 5.7, "cpu" : 1.66 },"color":["white","orange","gold","gray"],"storage":[128,256]}
 ])

// only name and price returned
db.gadgets.find({}, {
    name: 1,
    price: 1,
    _id:0
});

// returning all fields expcept few fields
db.gadgets.find({_id:1}, {
    releaseDate: 0,
    spec: 0,
    storage: 0
})

// for embedded documents
db.gadgets.find({_id:1}, {
    name: 1,
    price: 1,
    "spec.screen": 1,
})

// above and below are same
db.gadgets.find({_id:1}, {
    name: 1,
    price: 1,
    spec : { screen: 1 }
})

// Projecting fields on embedded documents in an array
db.gadgets.find({}, {
    name: 1,
    "inventory.qty": 1,
    color:1
});

db.gadgets.find({_id: 3})


// operators

// equal
db.gadgets.find({price: {$eq: 899}}, {name:1, price:1})

// equal
db.gadgets.find({
    color: {
        $eq: "black"
    }
}, {
    name: 1,
    price: 1,
    color:1
})

// less than
db.gadgets.find({
    price: {
        $lt: 899
    }
}, {
    name: 1,
    price: 1
})

// less than equal to
db.gadgets.find({
    price: {
        $lte: 899
    }
}, {
    name: 1,
    price: 1
})

// greater than
db.dadgets.find({
    price: {
        $gt: 899
    }
}, {
    name: 1,
    price: 1
})

// greater than equal to
db.gadgets.find({
    price: {
        $gte: 899
    }
}, {
    name: 1,
    price: 1
})

db.products.insertMany([
    { "_id" : 8, "name" : "xPhone", "price" : 799, "releaseDate": ISODate("2011-05-14"), "spec" : { "ram" : 4, "screen" : 6.5, "cpu" : 2.66 },"color":["white","black"],"storage":[64,128,256]},
    { "_id" : 9, "name" : "xTablet", "price" : 899, "releaseDate": ISODate("2011-09-01") , "spec" : { "ram" : 16, "screen" : 9.5, "cpu" : 3.66 },"color":["white","black","purple"],"storage":[128,256,512]},
    { "_id" : 10, "name" : "SmartTablet", "price" : 899, "releaseDate": ISODate("2015-01-14"), "spec" : { "ram" : 12, "screen" : 9.7, "cpu" : 3.66 },"color":["blue"],"storage":[16,64,128]},
    { "_id" : 11, "name" : "SmartPad", "price" : 699, "releaseDate": ISODate("2020-05-14"),"spec" : { "ram" : 8, "screen" : 9.7, "cpu" : 1.66 },"color":["white","orange","gold","gray"],"storage":[128,256,1024]},
    { "_id" : 12, "name" : "SmartPhone", "price" : 599,"releaseDate": ISODate("2022-09-14"), "spec" : { "ram" : 4, "screen" : 9.7, "cpu" : 1.66 },"color":["white","orange","gold","gray"],"storage":[128,256]}
,
    { "_id" : 13, "name" : "xWidget", "spec" : { "ram" : 64, "screen" : 9.7, "cpu" : 3.66 },"color":["black"],"storage":[1024]}
 ])

// not equal to, ne will also gives the objets who do not have the that field like here price
db.products.find({
    price: {
        $ne: 899
    }
}, {
    name: 1,
    price: 1
})

// inside embedded object
db.products.find({
    "spec.screen": {
        $ne: 9.7
    }
}, {
    name: 1,
    "spec.screen": 1
})

// inside array 
db.products.find({
    storage: {
        $ne: 128
    }
}, {
    name: 1,
    storage: 1
});

db.products.find({_id: 13})

db.products.find({
    releaseDate: {
        $ne: new ISODate('2015-01-14')
    }
}, {
    name: 1,
    releaseDate: 1
});

// in operator
db.products.find({
    price: {
        $in: [699, 799]
    }
}, {
    name: 1,
    price: 1
})

// in operator with regular expression
db.products.find({
    color: {
        $in: [/^g+/, /^w+/]
    }
}, {
    name: 1,
    color: 1
})

// not in operator, it will also gives you the documnets which doesn't have that field in this case price field
db.products.find({
    price: {
        $nin: [699, 799]
    }
}, {
    name: 1,
    price: 1
})

// logical operators, uses the short circuit technique

db.products.find({$and: [{price: {$eq: 899}}, {color: {$in: ["white", "black"]}}]}, {name: 1, price:1, color:1})

// below u can use file: value without the $eq operator also and $exixts to check the field is present
db.products.find({$and: [{price: 699}, {price: {$exists: true}}]}, {name: 1, price:1})
// below example is same as above with implicit AND
db.products.find({price: {$exists: true, $eq: 699}}, {name: 1, price:1})


db.products.find({
    $or: [
        { price: {$lt: 699} },
        { price: {$gt: 799} }
    ]
}, {
    name: 1,
    price: 1
})

db.products.find({
    price: {
        $not: {
            $gt: 699
        }
    }
}, {
    name: 1,
    price: 1
})

db.products.find({
    name: {
        $not: /^Smart+/
    }
}, {
    name: 1
})

db.products.find({
    $nor :[
        { price: 899},
        { color: "gold"}
    ]
}, {
    name: 1,
    price: 1, 
    color: 1
})

// $exists operator 

db.products.insertOne({ "_id" : 14, "name" : "xReader","price": null, "spec" : { "ram" : 64, "screen" : 6.7, "cpu" : 3.66 }, "color" : [ "black", "white" ], "storage" : [ 128 ] })

db.products.find(
   {
 price: {
 $exists: true,
 $eq: null
 } 
}, 
   {
 name: 1,
 price: 1
 }
)

db.products.find({
    price: {
        $exists: false
    }
}, {
    name: 1,
    price: 1
});

// $type operator
db.products.insertMany([
	{ "_id" : 15, "name" : "xPhone", "price" : "799", "releaseDate" : ISODate("2011-05-14T00:00:00Z"), "spec" : { "ram" : 4, "screen" : 6.5, "cpu" : 2.66 }, "color" : [ "white", "black" ], "storage" : [ 64, 128, 256 ] },
	{ "_id" : 16, "name" : "xTablet", "price" : NumberInt(899), "releaseDate" : ISODate("2011-09-01T00:00:00Z"), "spec" : { "ram" : 16, "screen" : 9.5, "cpu" : 3.66 }, "color" : [ "white", "black", "purple" ], "storage" : [ 128, 256, 512 ] },
	{ "_id" : 17, "name" : "SmartTablet", "price" : NumberLong(899), "releaseDate" : ISODate("2015-01-14T00:00:00Z"), "spec" : { "ram" : 12, "screen" : 9.7, "cpu" : 3.66 }, "color" : [ "blue" ], "storage" : [ 16, 64, 128 ] },
	{ "_id" : 18, "name" : "SmartPad", "price" : [599, 699, 799], "releaseDate" : ISODate("2020-05-14T00:00:00Z"), "spec" : { "ram" : 8, "screen" : 9.7, "cpu" : 1.66 }, "color" : [ "white", "orange", "gold", "gray" ], "storage" : [ 128, 256, 1024 ] },
	{ "_id" : 19, "name" : "SmartPhone", "price" : ["599",699], "releaseDate" : ISODate("2022-09-14T00:00:00Z"), "spec" : { "ram" : 4, "screen" : 9.7, "cpu" : 1.66 }, "color" : [ "white", "orange", "gold", "gray" ], "storage" : [ 128, 256 ] },
	{ "_id" : 20, "name" : "xWidget", "spec" : { "ram" : 64, "screen" : 9.7, "cpu" : 3.66 }, "color" : [ "black" ], "storage" : [ 1024 ] }
])

db.products.find({
    price: {
        $type: "string"
    }
}, {
    name: 1,
    price: 1
})

db.products.find({
    price: {
        $type: "array"
    }
}, {
    name: 1,
    price: 1
})

db.products.find({
    price: {
        $type: ["number", "string"]
    }
}, {
    name: 1,
    price: 1
})

// $size operator - works on array fields

db.products.find({
    $or: [{
            color: {
                $size: 1
            }
        },
        {
            color: {
                $size: 2
            }
        }
    ]
}, {
    name: 1,
    color: 1
})

// $all operator - works on array fields

db.products.find({
    color: {
        $all: ["black", "white"]
    }
}, {
    name: 1,
    color: 1
})

// $elemMatch - works on array fields 

db.products.find({
    storage: {
        $elemMatch: {
            $lt: 128
        }
    }
}, {
    name: 1,
    storage: 1
});

// sort() method

db.products.find({
    'price': {
        $exists: 1
    }
}, {
    name: 1,
    price: 1
}).sort({
    price: 1
})

// here first it willsort by price in ascending order then with name in descending order
db.products.find({
    'price': {
        $exists: 1
    }
}, {
    name: 1,
    price: 1
}).sort({
    price: 1,
    name: -1
})

// sort by releasedate
db.products.find({
    releaseDate: {
        $exists: 1
    }

}, {
    name: 1,
    releaseDate: 1
}).sort({
    releaseDate: 1
});

// sort embedded doc as well
db.products.find({}, {
    name: 1,
    spec: 1
}).sort({
    "spec.ram": 1
});

// limit method

// the behavior of the limit() is unpredictable.
// To get the predictable result set using the limit(), you need to sort the result set first before applying the method like this:
// cursor.sort({...}).limit(<documentCount>)

// In practice, you often use the limit() with the skip() method to paginate a collection.
// The skip() method specifies from where the query should start returning the documents:
// cursor.skip(<offset>)

// db.collection.find({...}
// ).sort({...}
// ).skip(pageNo > 0 ? ( ( pageNo - 1 ) * documentCount) : 0
// ).limit(documentCount);

db.products.find({}, {
    name: 1,
    price: 1
}).sort({
    price: -1
}).limit(1);

db.products.find({}, {
    name: 1,
    price: 1
}).sort({
    price: -1,
    name: 1
}).skip(2).limit(2);

// check how can we use a cursur to return paginated documents

// updateOne

db.products.updateOne({
    _id: 1
}, {
    $set: {
        price: 899
    }
})

// there may be multiple docs returned but updateOne will only modify the first one returned
db.products.updateOne({ price: 899 }, { $set: { price: null } })

// updateOne embedded docs
db.products.updateOne({
    _id: 4
}, {
    $set: {
        "spec.ram": 16,
        "spec.screen": 10.7,
        "spec.cpu": 2.66
    }
})

// updateOne to update array elements
db.products.updateOne({_id: 4}, { $set: {"color.0": "lemon", "storage.1": 512}})

// $set operator creates a field if it doesn't exists

db.products.find({_id: 4})

// updateMany method

db.products.updateMany(
    {  price: 899}, 
    { $set: {  price: 895 }}
)

// for embedded documents
db.products.updateMany({
    price: { $gt: 700}
}, {
    $set: {
        "spec.ram": 32,
        "spec.screen": 9.8,
        "spec.cpu": 5.66
    }
})

// to update array elements
db.products.updateMany({
    _id: {
        $in: [1, 2, 3]
    }
}, {
    $set: {
        "storage.0": 16,
        "storage.1": 32
    }
})

// $inc operator

db.products.updateOne({
    _id: 1
}, {
    $inc: {
        price: 50
    }
})

db.products.updateOne({
    _id: 2
}, {
    $inc: {
        price: -150
    }
})

db.products.updateOne({
    _id: 2
}, {
    $inc: {
        price: 50,
        "spec.ram": 4
    }
})

// $min operator 
// The $min operator is a field update operator that allows you to update the value of a field to a specified value if the specified value is less than (<) the current value of the field.
// If the current value of a field is greater than or equal to the value that you want to update, the $min operator won’t update the value.



db.products.updateOne({
    _id: 5
}, {
    $min: {
        price: 699
    }
})

// $max operator

db.products.updateOne({
    _id: 1
}, {
    $max: {
        price: 699
    }
})

// $mul operator
// The $mul is a field update operator that allows you to multiply the value of a field by a specified number.
// The <field> that you want to update must contain a numeric value. To specify a field in an embedded document 
// or in an array, you use the dot notation e.g., <embedded_doc>.<field> or <array>.<index>

db.products.updateOne({ _id: 5 }, { $mul: { price: 1.1 } })
 
db.products.updateOne({
    _id: 1
}, {
    $mul: {
        "storage.0": 2,
        "storage.1": 2,
        "storage.2": 2
    }
})

db.products.updateMany({}, {
    $mul: {
        "spec.ram": 2
    }
}) 

// $unset operator

// The $unset is a field update operator that completely removes a particular field from a document.
// { $unset: {<field>: "", ... }}
// In this syntax, you specify the field that you want to remove and its value. The field value isn’t important and doesn’t impact the operation. You can specify any value, the $unset will remove the field completely. If the <field> doesn’t exist in the document, then $unset operator will do nothing. It also won’t issue any warnings or errors.

// To specify a field in an embedded document, you use the dot notation like this:
// { $unset: { "<embedded_doc>.<field>: "", ... }}

//  Note that the $unset operator doesn’t remove array elements. Instead, it sets the array elements to null.
// This behavior keeps the array size and element positions consistent.
// { $unset: {"<array>.<index>": "", ...}

db.products.updateMany({}, {
    $unset: {
        "spec.ram": ""
    }
})

db.products.updateMany({}, { $unset: { "storage.0": "" } })
 
db.products.find({_id:5}) 

// $rename operator

// The $rename is a field update operator that allows you to rename a field in a document to the new one.

// If the document has a field with the same name as the <new_field_name>, the $rename operator removes that field and renames the specified <field_name> to <new_field_name>.

// The $rename operator can rename fields in embedded documents. In addition, it can move these fields in and out of the embedded documents.

// below doesn't modifiy any dcos as that fields is not available
db.products.updateMany({}, {
    $rename: {
        nmea: "name"
    }
})

db.products.updateMany({}, {
    $rename: {
        "spec.screen": "spec.screenSize"
    }
})

// $rename to move field out of the embedded document
db.products.updateOne({
 _id: 1
}, 
{
    $rename: {
        "spec.cpu": "cpu"
    }
})

// $rename to rename a field to an existing field - caution while using this

db.products.updateOne({
    _id: 2
}, {
    $rename: {
        "color": "storage"
    }
})

db.products.find({_id:2})

// upsert the documents

//Upsert is a combination of update and insert. Upsert performs two functions:
//Update data if there is a matching document.
//Insert a new document in case there is no document matches the query criteria.

db.products.updateMany(
    {_id: 25 },
    { $set: {price: 999}}, 
    {upsert: true}
)

db.products.find({_id:25})

// deleteOne document

db.products.deleteOne({ _id: 18 })

// filter option is empty but since we used deleteOne it only deletes the first occured document
db.products.deleteOne({})

// deleteMany Documents

db.products.deleteMany({ price: 799 })

db.products.find({price:799})

// =======================================================

// AGGREGATION PIPELINES

use coffeeshop

db.sales.insertMany([
	{ "_id" : 1, "item" : "Americanos", "price" : 5, "size": "Short", "quantity" : 22, "date" : ISODate("2022-01-15T08:00:00Z") },
	{ "_id" : 2, "item" : "Cappuccino", "price" : 6, "size": "Short","quantity" : 12, "date" : ISODate("2022-01-16T09:00:00Z") },
	{ "_id" : 3, "item" : "Lattes", "price" : 15, "size": "Grande","quantity" : 25, "date" : ISODate("2022-01-16T09:05:00Z") },
	{ "_id" : 4, "item" : "Mochas", "price" : 25,"size": "Tall", "quantity" : 11, "date" : ISODate("2022-02-17T08:00:00Z") },
	{ "_id" : 5, "item" : "Americanos", "price" : 10, "size": "Grande","quantity" : 12, "date" : ISODate("2022-02-18T21:06:00Z") },
	{ "_id" : 6, "item" : "Cappuccino", "price" : 7, "size": "Tall","quantity" : 20, "date" : ISODate("2022-02-20T10:07:00Z") },
	{ "_id" : 7, "item" : "Lattes", "price" : 25,"size": "Tall", "quantity" : 30, "date" : ISODate("2022-02-21T10:08:00Z") },
	{ "_id" : 8, "item" : "Americanos", "price" : 10, "size": "Grande","quantity" : 21, "date" : ISODate("2022-02-22T14:09:00Z") },
	{ "_id" : 9, "item" : "Cappuccino", "price" : 10, "size": "Grande","quantity" : 17, "date" : ISODate("2022-02-23T14:09:00Z") },
	{ "_id" : 10, "item" : "Americanos", "price" : 8, "size": "Tall","quantity" : 15, "date" : ISODate("2022-02-25T14:09:00Z")}
]);

db.sales.find({})

// aggregation pipelines

// MongoDB aggregation operations allow you to process multiple documents and return the calculated results.
// Typically, you use aggregation operations to group documents by specific field values and perform aggregations on the grouped documents to return computed results.

// To perform aggregation operations, you use aggregation pipelines. An aggregation pipeline contains one or more stages that process the input documents:

// Each stage in the aggregation pipeline performs an operation on the input documents and returns the output documents. The output documents are then passed to the next stage. The final stage returns the calculated result.

// db.collection.aggregate([{ $match:...},{$group:...},{$sort:...}]);
// In this syntax:
// First, call the aggregate() method on the collection.
// Second, pass an array of documents, where each document describes a stage in the pipeline.

db.sales.aggregate([
	{ 
		$match: { item: "Americanos" } 
	},
	{ 
		$group: {
			_id: "$size",
			totalQty: {$sum: "$quantity"}
		}
	},
	{
		$sort: { totalQty : -1}		
	}
]);

// Stage 1: the $match stage filters the orders by Americanos coffee and passes the filtered documents to the $group stage.
// Stage 2: the $group stage groups the filtered documents by coffee size and uses the $sum to calculate the total quantity. The $group stage creates a new collection of documents where each document contains two fields _id and totalQty, and passed these documents to the $sort stage.
// Stage 3: the $sort stage sorts the documents by the totalQty field in the descending order and returns the result documents.

// the above query if transformed to sql will be like below

//select 
//   name as _id, 
//   sum(quantity) as totalQty
//from 
//   sales 
//where name = 'Americanos'
//group by name
//order by totalQty desc; 


//SQL clause	MongoDB Aggregation
//select	    $project
//              $group functions: $avg, $count, $sum, $max, $min
//from	        db.collection.aggregate(…)
//join	        $unwind
//where	        $match
//group by	    $group
//having	    $match

// $sum operator

// Typically, you apply the $sum to the numeric values. However, if a field contains a non-numeric value, the $sum ignores that value. Also, if the field doesn’t exist in any document, the $sum returns 0 for that field.

db.sales.aggregate([
  {
    $group: {
      _id: null,
      totalQty: { $sum: '$quantity' },
    },
  },
]);

// not to display _id field as null you can project like this
db.sales.aggregate([
  {
    $group: {
      _id: null,
      totalQty: { $sum: '$quantity' },
    },
  },
  { $project: { _id: 0 } },
]);

// sum of items
db.sales.aggregate([
  {
    $group: {
      _id: '$item',
      totalQty: { $sum: '$quantity' },
    },
  },
]);

db.sales.aggregate([
  {
    $group: {
      _id: '$item',
      totalQty: { $sum: '$quantity' },
    },
  },
  { $match: { totalQty: { $gt: 50 } } },
  { $sort: { totalQty: -1 } },
]);

// $count - count doesn't except any parameters

db.sales.aggregate([
  {
    $group: {
      _id: '$item',
      itemCount: { $count: {} },
    },
  },
  {
    $match: { itemCount: { $gt: 2 } },
  },
]);

// $avg - The $avg ignores the non-numeric and missing values. If all values are non-numeric, the $avg returns null.

db.sales.aggregate([
  {
    $group: {
      _id: '$item',
      averageAmount: { $avg: { $multiply: ['$quantity', '$price'] } },
    },
  },
  { $match: { averageAmount: { $gt: 150 } } },
  { $sort: { averageAmount: 1 } },
]);

// $max

// If you apply the $max to the field that has a null or missing value in all documents, the $max returns null.

// However, if you apply the $max to the field that has a null or missing value in some documents, but not all, the $max only considers non-null and non-missing values for that field.

db.sales.aggregate([
  {
    $group: {
      _id: null,
      maxQty: { $max: '$quantity' },
    },
  },
  {
    $project: {
      _id: 0,
    },
  },
]);

// $min

db.sales.aggregate([
  {
    $group: {
      _id: '$item',
      maxQty: { $min: { $multiply: ['$quantity', '$price'] } },
    },
  },
]);

// ======================================================================

use sample_mflix
// INDEXES

// an index improves the speed of document retrieval at the cost of additional write and storage space to maintain the index data structure. Internally, MongoDB uses the B-tree structure to store the index.

db.movies.getIndexes()

// The output shows the index name '_id_' and index key _id. The value 1 in the key : { _id : 1 } indicates the ascending order of the _id values in the index.

// When an index contains one field, it’s called a single field index. However, if an index holds references to multiple fields, it is called a compound index. This tutorial focuses on a single field index.

db.movies.find({title: 'Pirates of Silicon Valley'}).explain('executionStats')

db.movies.find()

// The value 1 for descending index and -1 for ascending index.
db.movies.createIndex({title:1})

// By default, MongoDB names an index by concatenating the indexed keys and each key’s direction in the index ( i.e. 1 or -1) using underscores as a separator. For example, an index created on { title: 1 } has the name title_1.

// An index improves the speed of document retrieval at the cost of additional write and storage space to maintain its data structure.


// drop the index - but u cannot drop the _id index which is created by mongoDB

db.movies.createIndex({year: 1})

db.movies.dropIndex('year_1')

db.movies.createIndex({runtime: -1})

db.movies.dropIndex({title: 1});

// compound index

// A compound index is an index that holds a reference to multiple fields of a collection. In general, a compound index can speed up the queries that match on multiple fields.

// It’s important to understand that the order of the fields specified in a compound index matters.

//If a compound index has two fields: field1 and field2, it contains the references to documents sorted by field1 first. And within each value of field1, it has values sorted by field2.

// Besides supporting queries that match all the index keys, a compound index can support queries that match the prefix of the index fields. For example, if a compound index contains two fields: field1 and field2, it will support the queries on:

// field1
// field1 and field2
// However, it doesn’t support the query that matches the field2 only.

db.movies.createIndex({ title: 1, year: 1 })

db.movies.find({title: /valley/gi, year: 2014}).explain('executionStats');

db.movies.find({title:/valley/gi}).explain('executionStats');

// for the above 2 queries it did the FETCH-IXSCAN but for the below one it did COLLSCAN because oreder of the field matters in compound index

db.movies.find({year: 2014}).explain('executionStats');

// unique index

// db.collection.createIndex({ field: 1}, {unique: true});

db.users.createIndex({email: 1},{unique:true})

db.users.getIndexes()

db.users.insertOne(
   { email:  "john@test.com", name: "johny"}
);

// When a unique index contains more than one field, it is called a unique compound index. A unique compound index ensures the uniqueness of the combination of fields.

// db.collection.createIndex({field1: 1, field2: 1}, {unique: true});

// bulkWrite

db.comments.find()

db.comments.bulkWrite([{insertOne: { document: {name: "Puneet Jain", email: "puneet.jain@gmail.com"}}}, 
{updateOne: {filter: {name : "Mercedes Tyler"}, update: {$set: {text: "testing bulk write"}}}}, 
{deleteOne:{filter: {name: "John Bishop"}}}])

db.comments.find({text: "testing bulk write"})

// Retryable write operations

// write operations are retryable when issued with acknowledged write concern; e.g., Write Concern cannot be {w: 0}

// Retryable reads

// To explicitly disable retryable reads, specify retryReads=false in the connection string for the deployment.


// Text Search

// to use text search u need to create text index on fields you want to apply text search
db.comments.createIndex( { name: "text", text: "text" } )

db.comments.find( { $text: { $search: "mercedes" } } ) // this will trow error if above line didnot run

db.comments.findOne({})

db.comments.getIndexes()

// text search can also be done on laguage basis check mongodb documentation

// In the aggregation pipeline, text search is available via the use of the $text query operator in the $match stage.
// checkout this for aggregation pipeline: https://www.mongodb.com/docs/v6.0/tutorial/text-search-in-aggregation/

// mongoDB supports geospatial queries

// Write concern describes the level of acknowledgment requested from MongoDB for write operations to a standalone mongod
// or to replica sets or to sharded clusters. In sharded clusters, mongos
// instances will pass the write concern on to the shards.

// Data model 
// As mongoDB is schema less but still you can enforce a data modelif u wish to
// Create a contacts collection with a JSON schema validator that has validationAction: "error":

db.createCollection( "contacts", {
   validator: { $jsonSchema: {
      bsonType: "object",
      required: [ "phone" ],
      properties: {
         phone: {
            bsonType: "string",
            description: "must be a string and is required"
         },
         email: {
            bsonType : "string",
            pattern : "@mongodb\.com$",
            description: "must be a string and match the regular expression pattern"
         },
         status: {
            enum: [ "Unknown", "Incomplete" ],
            description: "can only be one of the enum values"
         }
      }
   } },
   validationAction: "error"
} )

// if anybody tries to insert a documents which doesn't abide the above rules it will throw validationAction Error

// more about transaction you can find here - https://www.mongodb.com/docs/v6.0/core/transactions/#transactions-api

// View with mongoDB

//db.createView(
//  "<viewName>",
//  "<source>",
//  [<pipeline>],
//  {
//    "collation" : { <collation> }
//  }
//)

//MongoDB provides two different view types: standard views and on-demand materialized views. Both view types return the results from an aggregation pipeline.
//
//Standard views are computed when you read the view, and are not stored to disk.
//
//On-demand materialized views are stored on and read from disk. They use a 
//$merge
// or 
//$out
// stage to update the saved data.

// more on views: https://www.mongodb.com/docs/v6.0/core/views/create-view/


// GridFS

// GridFS is a specification for storing and retrieving files that exceed the BSON-document size limit of 16 MB.

//Instead of storing a file in a single document, GridFS divides the file into parts, or chunks [1], and stores each chunk as a separate document. By default, GridFS uses a default chunk size of 255 kB; that is, GridFS divides a file into chunks of 255 kB with the exception of the last chunk. The last chunk is only as large as necessary. Similarly, files that are no larger than the chunk size only have a final chunk, using only as much space as needed plus some additional metadata.
//
//GridFS uses two collections to store files. One collection stores the file chunks, and the other stores file metadata. The section 
//GridFS Collections
// describes each collection in detail.
//
//When you query GridFS for a file, the driver will reassemble the chunks as needed. You can perform range queries on files stored through GridFS. You can also access information from arbitrary sections of files, such as to "skip" to the middle of a video or audio file.
//
//GridFS is useful not only for storing files that exceed 16 MB but also for storing any files for which you want access without having to load the entire file into memory. See also 
//When to Use GridFS
//.


// Change Streams

// Change streams allow applications to access real-time data changes without the complexity and risk of tailing the oplog. Applications can use change streams to subscribe to all data changes on a single collection, a database, or an entire deployment, and immediately react to them. Because change streams use the aggregation framework, applications can also filter for specific changes or transform the notifications at will.

// The following example uses stream to process the change events.

//const collection = db.collection('inventory');
//const changeStream = collection.watch();
//changeStream.on('change', next => {
//  // process next document
//});

// Alternatively, you can also use iterator to process the change events:

//const changeStreamIterator = collection.watch();
//const next = await changeStreamIterator.next();

// one more ex

//const pipeline = [
//  { $match: { 'fullDocument.username': 'alice' } },
//  { $addFields: { newField: 'this is an added field!' } }
//];
//
//const collection = db.collection('inventory');
//const changeStream = collection.watch(pipeline);
//changeStream.on('change', next => {
//  // process next document
//});




// Some important link and points for reference

// https://www.mongodb.com/docs/v6.0/reference/sql-comparison/

//mongodump is used to create a backup.
//mongorestore [backup_path] is used to restore the data.

// MongoDB doesn’t support foreign key constraints. Because of the document structure, MongoDB provides flexible ways to define relationships.

//Replication means synchronizing the data across multiple servers. It increases data availability. If a single server is lost, data is still intact in the other servers.
//
//Primary replica set: MongoDB writes data only to the primary or master replica set.
//Secondary replica set: secondary or slave nodes can accept only reads. They replicate from the primary.

// journaling: MongoDB ensures data integrity by using an on-disk journal that is created for every write. In case of a server crash, the journal can be used to track the writes that were not written to the disk or data files.

// MongoDb supports ACID transactions

// how does mongDB handles transaction and locks?
// MongoDB uses multi-granularity locking to lock operations at the global, database, or collection level. It is up to the storage engines to implement the level of concurrency. For example, in WiredTiger, it is at the document level. For reads, there is a shared locking mode, while for write there is an exclusive locking mode.

// Capped collections are fixed-size collections, and insert and retrieve data based on the insertion order. If a collection’s space is full, the oldest records will be overwritten by the new documents in the collection.
//


//Map-reduce is a way to perform aggregation.
//
//The Map function emits the key-value pair specified.
//The Reduce function combines the key value pair and returns the aggregation result.
//Syntax:
//
//db.collection.mapReduce( 
//
//function() {emit(key,value);}, 
//
//function(key, values) {return aggregatedResult}, { out: collection } 
//
//</pre.
//
// )

// The storage engine is a component of the database that manages how data is stored in both memory and disk. MongoDB provides support for multiple storage engines that helps in better performance for different workloads. The default storage engine is WiredTiger (MongoDB3.2), which is well-suited for most workloads.


// Journaling is used to recover information after the last checkpoint when MongoDB exits unexpectedly. The storage engine (WiredTiger) creates a journal record for each of the clients that initiated the write operation. 
//If there is an update, a single journal record records the update operation as well as index modifications. Journal records are stored using in-memory buffering. Journal files are stored under the ‘journal’ directory created by MongoDB. 

// GridFS stores and retrieves large files like images, audio and video files, etc. Although the limit to store a file is 16MB, GridFS can store files with sizes greater than that. GridFS breaks the file into chunks and stores each chunk as a different document of a maximum size of 255k. It uses two collections, fs.chunks, and fs.files for storing chunks and metadata, respectively.

// An operational log (oplog) is a special kind of limited collection that stores a rolling record of all the operations which change the data we store in our databases. Primarily, it applies all the database operations over the primary and, after that, records these operations on the oplog of the primary. After that, the secondary members replicate and apply the operations in the asynchronous process.


