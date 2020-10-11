import React, { useState, useEffect } from 'react'
import { Grid, makeStyles, Typography } from '@material-ui/core'
import CardNews from './CardNews'
import axios from 'axios';
import Pagination from '@material-ui/lab/Pagination';

const useStyles = makeStyles(() => ({
  root: {
    marginBottom: 60,
    marginLeft: 40,
  },
  cardComponent: {
    display: 'flex',
    alignItems: 'center',
  },
  Paignation: {
    display: "flex",
    marginBottom: 50,
    justifyContent: "center"
  },
  Heading: {
    marginBottom: 30,
    marginLeft: 40,
  }

}))

const SearchResult = ({ searchContent, setSearchContent, loading, setLoading, fromDate, toDate, searchSectorFilterList, sortByFlag }) => {

  const classes = useStyles()

  const [articles, setArticles] = useState({})
  const [currentPage, setCurrentPage] = useState(1)
  const [postsPerPage, setPostsPerPage] = useState(30)

  var articlesES = [];

  function sortByQuery(sortByFlag) {
    let sortQuery = {}
    if (sortByFlag == 'byDate') {
      sortQuery = { "DatePublished": { "order": "desc" } }
    }
    else if (sortByFlag == 'byRelevance') {
      sortQuery = {}
    }
    return sortQuery
  }

  useEffect(() => {
    setLoading(true)

    console.log('fromDate', fromDate)
    console.log('toDate', toDate)
    console.log('searchSectorFilterList', searchSectorFilterList)
    console.log('sortByFlag', sortByFlag, sortByQuery(sortByFlag))
    let xy = "2020-10-01" + " 00:00:00" 
    axios.post('http://35.154.47.26:9200/newsarticles/table/_search', //'http://localhost:9200/newsarticles/table/_search', 
      {
        "from": 0,
        "size": 1000,
        "query": {
          "bool": {
            "must": {
              "multi_match": {
                "query": searchContent,
                "fields": ["Title", "Content", "Keywords"]
              }
            },
            "filter": {
              "range": { "DatePublished": { "gte": fromDate + " 00:00:00" , "lte": toDate + " 00:00:00"   } },
            }
          }
        },
        "sort": sortByQuery(sortByFlag)    // {  "DatePublished": { "order": "desc" }, //asc, desc  "ThesisScore.First": {"order": "asc"} //asc, desc }
      })
      .then((res) => {
        console.log(res)
        const results = res.data['hits']['hits']
        // console.log('results', results)
        return Promise.resolve(results);
      })
      .then((results) => {
        // console.log('res', results.length)
        // var articlesES = [];
        for (let i = 0; i < results.length; i++) {
          articlesES.push(
            {
              Title: results[i]['_source']['Title'],
              DatePublished: results[i]['_source']['DatePublished'],
              URL: results[i]['_source']['URL'],
              Publisher: results[i]['_source']['Publisher'],
              PublisherSector: results[i]['_source']['PublisherSector'],
              PublisherSector: results[i]['_source']['PublisherSector'],
              ThesisScore: results[i]['_source']['ThesisScore'],
              ThesisSector: results[i]['_source']['ThesisSector'],
            }
          )
        }
        setArticles(articles => (articlesES))
        setLoading(false)
        // setShowSearchText(false)
      })
      .catch((error) => {
        console.log('error', error)
      })
  }, [searchContent]);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;

  const articlesCurrentPage = []

  for (var i = indexOfFirstPost; i < indexOfLastPost; i++) {
    if (articles[i] !== undefined) {
      articlesCurrentPage.push(articles[i])
    }
  }

  var currentPosts = [];
  for (var i = 0; i < articlesCurrentPage.length; i = i + 2) {
    currentPosts.push(articlesCurrentPage.slice(i, i + 2))
  }

  function getPosts() {
    const responseJSX = currentPosts.map((doc) => {
      return (
        <Grid container className={classes.root} sm={12}>
          <Grid item direction='row' sm={6} className={classes.cardComponent}>
            <CardNews articleObject={doc[0]} />
          </Grid>
          <Grid item direction='row' sm={6} className={classes.cardComponent}>
            <CardNews articleObject={doc[1]} />
          </Grid>
        </Grid>
      )
    })
    return responseJSX;
  }
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  function getPaignation() {
    if (!loading) {
      return (
        <Pagination className={classes.Paignation} count={Math.ceil(articles.length / postsPerPage)}
          variant="outlined" color="secondary" page={currentPage} onChange={handlePageChange} />
      )
    }
  }

  function getHeading() {
    let emptyString = ' '
    if (!loading) {
      return (
        <Typography className={classes.Heading}> <strong>Search Results for "{searchContent}"</strong> </Typography>
      )
    }
  }

  return (
    <Grid container direction="column">
      {getHeading()}
      {getPosts()}
      {getPaignation()}
    </Grid>
  )
}


export default SearchResult



// {
//   "from": 0,
//   "size": 1000,
//   "query": {
//     "bool": {
//       "multi_match": {
//         "query": searchContent,
//         "fields": ["Title", "Content", "Keywords"]
//       }
//     },
//   },
//   "sort": sortByQuery(sortByFlag)    // {  "DatePublished": { "order": "desc" }, //asc, desc  "ThesisScore.First": {"order": "asc"} //asc, desc }
// }

