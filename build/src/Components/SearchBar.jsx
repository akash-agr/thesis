import React, { useState, useEffect } from 'react';
import { Grid, Button, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import PlayForWorkIcon from '@material-ui/icons/PlayForWork';
import { TextField } from '@material-ui/core'


const useStyles = makeStyles((theme) => ({
  searchBar: {
    marginTop: 50,
    marginBottom: 40,
    marginLeft: 40,
    marginRight: 10,
  },

  searchButton: {
    marginTop: 50,
    marginLeft: 80,
    paddingLeft: 15,
    paddingRight: 5,
    paddingTop: 10,
    paddingBottom: 10,
  },

  dropDownButton: {
    marginTop: 50,
    marginLeft: -45,
    paddingLeft: 30,
    paddingRight: 20,
    // paddingTop: 10,
    // paddingBottom: 10,
  },
}))


const SearchBar = ({ searchContent, setSearchContent, showSearchContent, setShowSearchContent, showSearchFilterBox, setShowSearchFilterBox }) => {

  let searchTextDynamic;

  function handleSearchBarChange(e) {
    searchTextDynamic = e.target.value
  }

  function handleSearchButton() {

    if (searchTextDynamic != undefined && searchTextDynamic.length != 0) { // || searchTextDynamic != '' 
      if (showSearchContent == false) {
        setShowSearchContent(true)
      }
      // else {
      //   setShowSearchText(false)
      // }       
      setSearchContent(searchTextDynamic)
    }
  }

  function handleDropDownButton() {
    if (!showSearchFilterBox) {
      setShowSearchFilterBox(true)
    }
    else if (showSearchFilterBox) {
      setShowSearchFilterBox(false)
    }
  }

  function addEnterButtonFunctionality(e) {
    if (e.key === "Enter") {
      handleSearchButton()
    }
  }

  const classes = useStyles()

  return (
    <Grid container xs={12} direction="row" >
      <Grid item xs={8} direction="row">
        <TextField className={classes.searchBar} onChange={handleSearchBarChange} placeholder="Search Here..." variant="outlined" fullWidth={true} onKeyDown={addEnterButtonFunctionality} />
      </Grid>
      <Grid item xs={2} direction="row">
        < Button className={classes.searchButton} variant="contained" color="primary" size="large" startIcon={<SearchIcon style={{ fontSize: 30 }} />}
          onClick={handleSearchButton} />
      </Grid>
      <Grid item xs={2} direction="row">
        < Button className={classes.dropDownButton} variant="contained" color="primary" size="large" startIcon={<PlayForWorkIcon style={{ fontSize: 30 }} />}
          style={{ maxWidth: '20px', maxHeight: '50px', minWidth: '20px', minHeight: '50px' }} onClick={handleDropDownButton} />
      </Grid>
    </Grid>
  )
}

export default SearchBar
