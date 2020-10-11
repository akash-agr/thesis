import React, { useState, useEffect } from 'react';
import { Grid, Button, Typography } from '@material-ui/core'
import Alert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import Header from './Components/Header';
import Content from './Components/Content';
import Time from './Components/SideBar/Time';
import Sector from './Components/SideBar/Sector';
import MediaHouse from './Components/SideBar/MediaHouse';
import SearchResult from './Components/SearchResult';
import SearchFilterBox from './Components/SearchFilterBox'
import { TextField } from '@material-ui/core'
import SearchBar from './Components/SearchBar';
import LinearProgress from '@material-ui/core/LinearProgress';

const useStyles = makeStyles((theme) => ({
  feed: {
  },
  leftComponent: {
  },
  time: {
    marginTop: 30,
  },
  linearProgress: {
    marginTop: 10,
    marginBottom: 50,
  },
  Alert: {
    marginLeft: 300,
  },

}))



const App = () => {

  let initialSelectedPublisher, initialSelectedSector, sectorFilterList;

  if (JSON.parse(localStorage.getItem('PublisherPreferences')) == null) {
    initialSelectedPublisher = ['Business Standard', 'Economic Times', 'LiveMint', 'Bloomberg Quint', 'Financial Express', 'Money Control', "BusinessLine"]
  }
  else if (JSON.parse(localStorage.getItem('PublisherPreferences')).length == 0) {
    initialSelectedPublisher = ['Business Standard', 'Economic Times', 'LiveMint', 'Bloomberg Quint', 'Financial Express', 'Money Control', "BusinessLine"]
  }
  else {
    initialSelectedPublisher = JSON.parse(localStorage.getItem('PublisherPreferences'))
  }

  if (JSON.parse(localStorage.getItem('SectorPreferences')) == null) {
    initialSelectedSector = ["Auto", "Tyres"]
  }
  else if (JSON.parse(localStorage.getItem('SectorPreferences')).length == 0) {
    initialSelectedSector = ["Auto", "Tyres"]
  }
  else {
    initialSelectedSector = JSON.parse(localStorage.getItem('SectorPreferences'))
  }

  sectorFilterList = initialSelectedSector;

  const [publisherList, setPublisherList] = useState(initialSelectedPublisher)
  const [publisherListLength, setPublisherListLength] = useState(initialSelectedPublisher.length)
  const [sectorList, setSectorList] = useState(initialSelectedSector)
  const [searchSectorFilterList, setSearchSectorFilterList] = useState(initialSelectedSector)
  const [sectorListLength, setSectorListLength] = useState(initialSelectedSector.length)
  const [searchSectorFilterListLength, setSearchSectorFilterListLength] = useState(initialSelectedSector.length)
  const [searchContent, setSearchContent] = useState('')
  const [showSearchContent, setShowSearchContent] = useState(false)
  const [showSearchFilterBox, setShowSearchFilterBox] = useState(false)
  const [loading, setLoading] = useState(true)

  const [sortRadioBoxes, setSortRadioBoxes] = useState({
    byDate: false,
    byRelevance: true,
  })

  const [fromDate, setFromDate] = useState(changeDateFormat(new Date(), 60))
  const [toDate, setToDate] = useState(changeDateFormat(new Date(), 0))
  const [sortByFlag, setSortByFlag] = useState('byRelevance')
  
  const classes = useStyles()

  useEffect(() => {
    localStorage.setItem('PublisherPreferences', JSON.stringify(publisherList))
  }, [publisherListLength])

  useEffect(() => {
    localStorage.setItem('SectorPreferences', JSON.stringify(sectorList))
  }, [sectorListLength])

  function handleSectorFilterChange(sector) {
    if (searchSectorFilterList.includes(sector)) {
      var index = searchSectorFilterList.indexOf(sector);
      searchSectorFilterList.splice(index, 1);
    } else {
      searchSectorFilterList.push(sector);
    }
    setSearchSectorFilterListLength(searchSectorFilterList.length)
    // console.log('a',searchSectorFilterList)
  }

  function handleSectorChange(sector) {
    if (sectorList.includes(sector)) {
      var index = sectorList.indexOf(sector);
      sectorList.splice(index, 1);
    } else {
      sectorList.push(sector);
    }
    setSectorListLength(sectorList.length)
  }

  function changeDateFormat(date, substract) {

    date.setDate(date.getDate() - substract)

    var dd = date.getDate();
    var mm = date.getMonth() + 1;
    var yyyy = date.getFullYear();
    if (dd < 10) {
      dd = '0' + dd;
    }

    if (mm < 10) {
      mm = '0' + mm;
    }
    date = yyyy + '-' + mm + '-' + dd;
    return date
  }

  function handlePublisherChange(publisher) {
    // console.log('start', publisherList)
    if (publisherList.includes(publisher)) {
      var index = publisherList.indexOf(publisher);
      publisherList.splice(index, 1);
      setPublisherListLength(publisherList.length)
    } else {
      publisherList.push(publisher);
      setPublisherListLength(publisherList.length)
    }
    // console.log('end', publisherList)
  }


  function getSearchFilterBox() {
    if (showSearchFilterBox && !loading) {
      return (
        <SearchFilterBox searchSectorFilterList={searchSectorFilterList} setSearchSectorFilterList handleSectorFilterChange={handleSectorFilterChange} sortRadioBoxes={sortRadioBoxes} setSortRadioBoxes={setSortRadioBoxes}
          // dateCheckBoxes={dateCheckBoxes} setDateCheckBoxes={setDateCheckBoxes} 
          fromDate={fromDate} setFromDate={setFromDate} toDate={toDate} setToDate={setToDate} setSortByFlag={setSortByFlag}></SearchFilterBox>
      )
    }
  }


  function getContent() {
    if (!showSearchContent) {
      return (
        <Content sectorList={sectorList} publisherList={publisherList} publisherListLength={publisherListLength} sectorListLength={sectorListLength} loading={loading} setLoading={setLoading} />
      )
    }
    else if (showSearchContent) {
      return (
        <SearchResult searchContent={searchContent} setSearchContent={setSearchContent} loading={loading} setLoading={setLoading} fromDate={fromDate} toDate={toDate} searchSectorFilterList={searchSectorFilterList} sortByFlag={sortByFlag} />
      )
    }
  }

  function getAlert() {
    if (showSearchContent && !loading) {
      return (
        <Grid className={classes.AlertGrid} item xs={12} direction="row">
          <Alert className={classes.Alert} severity="info" style={{ maxWidth: '410px', minWidth: '300px' }} >Please click on <strong>Home Icon</strong> to go back to <strong>Live News Feed</strong></Alert>
        </Grid>
      )
    }
  }

  function getSearchBar() {
    if (!loading) {
      return (
        <SearchBar searchContent={searchContent} setSearchContent={setSearchContent} showSearchContent={showSearchContent} setShowSearchContent={setShowSearchContent} showSearchFilterBox={showSearchFilterBox} setShowSearchFilterBox={setShowSearchFilterBox}></SearchBar>
      )
    }
  }

  function getLoadingSpinner() {
    if (loading) {
      return (
        <Grid xs={10} xl={12}>
          <LinearProgress className={classes.linearProgress} color="secondary" />
        </Grid>
      )
    }
  }


  return (

    <Grid container direction="column">
      <Grid item>
        <Header setShowSearchContent={setShowSearchContent} />
      </Grid>
      <Grid item container >
        <Grid item container className={classes.leftComponent} xs={2} xl={2} direction="column" >
          <Time />
          <Sector handleSectorChange={handleSectorChange} initialSelectedSector={initialSelectedSector} />
          <MediaHouse handlePublisherChange={handlePublisherChange} initialSelectedPublisher={initialSelectedPublisher} />
        </Grid>
        <Grid container className={classes.feed} xs={10} xl={8} direction="column">
          <Grid>{getLoadingSpinner()}</Grid>
          <Grid>{getAlert()}</Grid>
          <Grid>{getSearchBar()}</Grid>
          <Grid>{getSearchFilterBox()}</Grid>
          <Grid>{getContent()}</Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}


export default App;

// const [dateCheckBoxes, setDateCheckBoxes] = useState({
//   past48Hrs: false,
//   pastWeek: false,
//   pastMonth: true,
//   pastQuarter: false,
//   pastYear: false,
// })
