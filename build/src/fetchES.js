const elasticsearch = require('elasticsearch');


function es() {

  const client = new elasticsearch.Client({
    hosts: 'localhost:9200',
    maxRetries: 5,
    apiVersion: '6.8'
    // requestTimeout: 60,
  });

  const docs = client.search({
    index: 'mint',
    type: 'table',
    body: {
      query: {
        match_all: {}
      },
    }
  }).then((docs) => {
    // console.log(docs['hits']['hits'])
    return docs['hits']['hits'];
  })
    .catch((error) => {
      console.log(error)
      return null
    })
  return docs
}


es()
.then((docs) => {
  console.log(docs.length)
}) 


// function es() {

//   const client = new elasticsearch.Client({
//     hosts: 'localhost:9200',
//     maxRetries: 5,
//     apiVersion: '6.8'
//     // requestTimeout: 60,
//   });


//   const docs = client.search({
//     index: 'mint',
//     type: 'table',
//     body: {
//       query: {
//         match_all: {}
//       },
//     }
//   }).then((docs) => {
//     // console.log(docs['hits']['hits'])
//     return docs['hits']['hits'];
//   })
//     .catch((error) => {
//       console.log(error)
//       return null
//     })
//   return docs
// }
