// Get evrything
// "query" : {
//   "match_all": {}
// }

// Leaf Query(Single Query)  can be match, term(exact), range()
// "query" : {
//   "match"/ "term" / "range": {
//       "fieldName" : "valueToSearch"
//   }
// }







        // "query": {
        //   "constant_score": {
        //     "filter": {
        //       "match": { "Publisher": "ET" }
        //     }
        //   }
        // }



// bool query, must, must_not, should are And, Not, or respectively         
        // "query": {
        //   "bool": {
        //     "must": {
        //       "terms": {
        //         "ThesisSector.First": ["auto", "it"]
        //       }
        //     },
        //     "must": {
        //       "terms": {
        //         "Publisher": ["mint"]
        //       }
        //     }
        //   }
        // }

// 
        // "query": {
        //   "bool": {
        //     "should": [
        //       "term" : {
        //         "Publisher": "mint"
        //       },
        //       "term" : {
        //         "Publisher": "et"
        //       }
        //     ]

        //   }

        // }


        // "query": {
        //   "bool": {
        //     "must": [
        //       { "term": { "Publisher": "ET" } }
        //       // {"term" : { "gender" : "female"}},
        //       // {"term" : { "brand" : "addidas"}},
        //       // {"terms": { "categoryId": [1,2,3,4]}}
        //     ]
        //   }
        // }
