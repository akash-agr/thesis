import React, { useState, useEffect } from 'react'
import { Grid, makeStyles, ListItem, Link } from '@material-ui/core'
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
  }
}))



const Content = ({ sectorList, publisherList, publisherListLength, sectorListLength, loading, setLoading }) => {

  const classes = useStyles()

  const [articles, setArticles] = useState({})
  const [currentPage, setCurrentPage] = useState(1)
  const [postsPerPage, setPostsPerPage] = useState(30)

  var articlesES = [];

  function getPublisherShortNames(publisherList) {
    var publisherListShortNames = [];
    for (var i = 0; i < publisherList.length; i++) {
      if (publisherList[i] === "Economic Times") {
        publisherListShortNames.push("ET")
      }
      else if (publisherList[i] === "Business Standard") {
        publisherListShortNames.push("BusinessStandard")
      }
      else if (publisherList[i] === "LiveMint") {
        publisherListShortNames.push("Mint")
      }
      else if (publisherList[i] === "Bloomberg Quint") {
        publisherListShortNames.push("BloombergQuint")
      }
      else if (publisherList[i] === "Financial Express") {
        publisherListShortNames.push("FinancialExpress")
      }
      else if (publisherList[i] === "Money Control") {
        publisherListShortNames.push("MoneyControl")
      }
      else if (publisherList[i] === "BusinessLine") {
        publisherListShortNames.push("HBL")
      }

    }

    if (publisherList.length === 0) {
      return ["ET", "BusinessStandard", "Mint", "BloombergQuint", "FinancialExpress", "MoneyControl", "HBL"]
    }
    return publisherListShortNames
  }


  function getSectorList(sectorList) {

    if (sectorList.length === 0) {
      return ['Auto', 'Banking', 'Infra', 'IT', 'FMCG', 'Metals', 'Oil&Gas', 'Pharma', 'Power', 'Telecom', 'Aviation', 'Cement', 'Durables', 'Insurance', 'Packaging', 'Paints', 'Retail', 'Textiles', 'Tyres']
    }
    return sectorList
  }

  useEffect(() => {
    setLoading(true)
    axios.post('http://35.154.47.26:9200/newsarticles/table/_search', //'http://localhost:9200/newsarticles/table/_search',  http://35.154.47.26:9200/newsarticles/table/_search'
      {
        "from": 0,
        "size": 1000,
        "query": {
          // "match_all" : {} },
          "bool": {
            "filter": [
              { "terms": { "ThesisSector.First": getSectorList(sectorList) } },  //  getSectorStringToMatchES() sectorList.map(word => word.toLowerCase())
              { "terms": { "Publisher": getPublisherShortNames(publisherList) } }, //getPublisherShortNames(publisherList)
              // { "range": { "DatePublished": { "gte": "2020-09-14 00:00:00" } } },
              { "range": { "ThesisScore.First": { "gte": 5 } } }
            ]
          }
        },
        "sort": {
          "DatePublished": { "order": "desc" }, //asc, desc
          // "ThesisScore.First": {"order": "asc"} //asc, desc
        }
      })
      .then((res) => {
        const results = res.data['hits']['hits']
        console.log('results', results)
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

        // if(articlesES.length < postsPerPage) {
        //   setPostsPerPage(articlesES.length)
        // }
        // setArticles(articles => ({ ...articles, docs: articlesES }))
      })
      .catch((error) => {
        console.log('error', error)
      })

    // const interval = setInterval(() => {
    //   console.log('This will run every five minute!');
    //   axios.post('http://35.154.47.26:9200/newsarticles/table/_search', //'http://localhost:9200/newsarticles/table/_search', 
    //     {
    //       "from": 0,
    //       "size": 1000,
    //       "query": {
    //         // "match_all" : {} },
    //         "bool": {
    //           "filter": [
    //             { "terms": { "ThesisSector.First": sectorList } },  //  getSectorStringToMatchES() sectorList.map(word => word.toLowerCase())
    //             { "terms": { "Publisher": getPublisherShortNames(publisherList) } }, //getPublisherShortNames(publisherList)
    //             // { "range": { "DatePublished": { "gte": "2020-09-14 00:00:00" } } },
    //             { "range": { "ThesisScore.First": { "gte": 5 } } }
    //           ]
    //         }
    //       },
    //       "sort": {
    //         "DatePublished": { "order": "desc" }, //asc, desc
    //         // "ThesisScore.First": {"order": "asc"} //asc, desc
    //       }
    //     })
    //     .then((res) => {
    //       const results = res.data['hits']['hits']
    //       console.log('results', results)
    //       return Promise.resolve(results);
    //     })
    //     .then((results) => {
    //       // console.log('res', results.length)
    //       // var articlesES = [];
    //       for (let i = 0; i < results.length; i++) {
    //         articlesES.push(
    //           {
    //             Title: results[i]['_source']['Title'],
    //             DatePublished: results[i]['_source']['DatePublished'],
    //             URL: results[i]['_source']['URL'],
    //             Publisher: results[i]['_source']['Publisher'],
    //             PublisherSector: results[i]['_source']['PublisherSector'],
    //             PublisherSector: results[i]['_source']['PublisherSector'],
    //             ThesisScore: results[i]['_source']['ThesisScore'],
    //             ThesisSector: results[i]['_source']['ThesisSector'],
    //           }
    //         )
    //       }
    //       setArticles(articles => (articlesES))
    //       // if(articlesES.length < postsPerPage) {
    //       //   setPostsPerPage(articlesES.length)
    //       // }
    //       // setArticles(articles => ({ ...articles, docs: articlesES }))
    //     })
    //     .catch((error) => {
    //       console.log('error', error)
    //     })
    // }, 300000);
    // return () => clearInterval(interval);
  }, [publisherListLength, sectorListLength]);

  // useEffect(() => {

  //   // console.log('publisherListInsideHook', publisherList)
  //   // console.log('publisherListLengthInsideHook', publisherListLength)
  //   // console.log('publisherListShortNames', getPublisherShortNames(publisherList))
  //   // console.log('sectorList', sectorList)
  //   // console.log('sectorListLength', sectorListLength)

  //   axios.post( 'http://35.154.47.26:9200/newsarticles/table/_search', //'http://localhost:9200/newsarticles/table/_search', 
  //     {
  //       "from": 0,
  //       "size": 1000,
  //       "query": {
  //         // "match_all" : {} },
  //         "bool": {
  //           "filter": [
  //             { "terms": { "ThesisSector.First": sectorList  } },  //  getSectorStringToMatchES() sectorList.map(word => word.toLowerCase())
  //             { "terms": { "Publisher":  getPublisherShortNames(publisherList)} }, //getPublisherShortNames(publisherList)
  //             // { "range": { "DatePublished": { "gte": "2020-09-14 00:00:00" } } },
  //             { "range": { "ThesisScore.First": { "gte": 5 } } }
  //           ]
  //         }
  //       },
  //       "sort": {
  //         "DatePublished": {"order": "desc"  }, //asc, desc
  //         // "ThesisScore.First": {"order": "asc"} //asc, desc
  //       }
  //     })
  //     .then((res) => {
  //       const results = res.data['hits']['hits']
  //       console.log('results', results)
  //       return Promise.resolve(results);
  //     })
  //     .then((results) => {
  //       // console.log('res', results.length)
  //       // var articlesES = [];
  //       for (let i = 0; i < results.length; i++) {
  //         articlesES.push(
  //           {
  //             Title: results[i]['_source']['Title'],
  //             DatePublished: results[i]['_source']['DatePublished'],
  //             URL: results[i]['_source']['URL'],
  //             Publisher: results[i]['_source']['Publisher'],
  //             PublisherSector: results[i]['_source']['PublisherSector'],
  //             PublisherSector: results[i]['_source']['PublisherSector'],
  //             ThesisScore: results[i]['_source']['ThesisScore'],
  //             ThesisSector: results[i]['_source']['ThesisSector'],
  //           }
  //         )
  //       }
  //       setArticles(articles => (articlesES))
  //       // if(articlesES.length < postsPerPage) {
  //       //   setPostsPerPage(articlesES.length)
  //       // }
  //       // setArticles(articles => ({ ...articles, docs: articlesES }))
  //     })
  //     .catch((error) => {
  //       console.log('error', error)
  //     })
  // }, [publisherListLength, sectorListLength])

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

  function getposts() {
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

  function getPaignation() {
    if (!loading) {
      return (
        <Pagination className={classes.Paignation} count={Math.ceil(articles.length / postsPerPage)}
          variant="outlined" color="secondary" page={currentPage} onChange={handlePageChange} />
      )
    }
  }
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <Grid container direction="column">
      {getposts()}
      {getPaignation()}
    </Grid>
  )
}

export default Content




// const classes = useStyles()
