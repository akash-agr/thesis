import React, { useState, useEffect } from 'react';
import { Grid, Button, Typography, Card, TextField, Checkbox, FormControlLabel, FormGroup, Box, Radio } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({

  CardRoot: {
    backgroundColor: '#ecf0f1', //'#C7F7FF', //'#F2FAFA',
    marginBottom: 40,
    marginLeft: 30,
    marginRight: 30,
    marginTop: -10,
    paddingLeft: 30,
  },

  sectorGroup: {
    marginTop: 10,
  },

  sectorHeadingText: {
    paddingRight: 20,
    paddingTop: 10,
  },

  dateGroup: {
    marginLeft: 0,
    marginBottom: -10,
    marginTop: 25,
  },
  dateText: {
    marginLeft: 0,
    paddingTop: 10
  },
  fromDateSelect: {
    marginLeft: -80,
  },
  toDateSelect: {
    marginLeft: 0,
    marginRight: 5,
  },
  dateShortcut: {
    marginTop: -30,
  },
  sortFeature: {
    marginTop: 5,
    marginBottom: 10,
  },
  sortText: {
    marginTop: 6,
  },
  sortByDate: {
    paddingLeft: 15,
  },
  submitButton: {
    marginTop: -10,
    marginBottom: 20,
    marginLeft: 450,
  }

}))



const SearchFilterBox = ({ searchSectorFilterList, setSearchSectorFilterList, handleSectorFilterChange, sortRadioBoxes, setSortRadioBoxes, fromDate, setFromDate, toDate, setToDate,setSortByFlag }) => {

  const sectorUniverseList = ['Auto', 'Banking', 'Infra', 'IT', 'FMCG', 'Metals', 'Oil&Gas', 'Pharma', 'Power', 'Telecom', 'Aviation', 'Cement', 'Durables', 'Insurance', 'Packaging', 'Paints', 'Retail', 'Textiles', 'Tyres']
  const defaultSortRadioBoxes = { byDate: false, byRelevance: false }

  const classes = useStyles()

  function getSectorList(searchSectorFilterList) {
    const sectorUI = sectorUniverseList.map((sectorName) => {
      if (!searchSectorFilterList.includes(sectorName)) {
        return (
          <FormControlLabel className={classes.sectorText} control={<Checkbox size="small" checked={false} onChange={() => handleSectorFilterChange(sectorName)} />} label={<Typography style={{ fontSize: '14px' }}>{sectorName}</Typography>} />
        )
      }
      else {
        return (
          <FormControlLabel className={classes.sectorText} control={<Checkbox size="small" checked={true} onChange={() => handleSectorFilterChange(sectorName)} />} label={<Typography style={{ fontSize: '14px' }}>{sectorName}</Typography>} />
        )
      }
    })
    return sectorUI
  }

  function handleSortChange(e) {
    setSortRadioBoxes({ ...defaultSortRadioBoxes, [e.target.name]: true })
    if (e.target.name == 'byRelevance') {
      setSortByFlag('byRelevance')
    }
    else {
      setSortByFlag('byDate')
    }
  }

  function handleTextFieldFromDateChange(e) {
    console.log(e.target.value)
    setFromDate(e.target.value)
  }

  function handleTextFieldToDateChange(e) {
    console.log(e.target.value)
    setToDate(e.target.value)
  }

  return (
    <Card className={classes.CardRoot}>
      <FormGroup className={classes.sectorGroup} row>
        <Typography className={classes.sectorHeadingText} > <strong> Filter Sector: </strong> </Typography>
        {getSectorList(searchSectorFilterList)}
      </FormGroup>
      <Grid className={classes.dateGroup} container xs={12} direction="row">
        <Grid item xs={2} className={classes.dateText}>
          <Typography><strong>Filter Date: </strong> </Typography>
        </Grid>
        <Grid item xs={2} className={classes.fromDateSelect} >
          <TextField variant="outlined" type="date" label="From Date" onChange={handleTextFieldFromDateChange} defaultValue={fromDate} style={{ maxHeight: '100px', minHeight: '80px', maxWidth: '165px', minWidth: '150px' }} />
        </Grid>
        <Grid item xs={2} className={classes.toDateSelect}  >
          <TextField variant="outlined" type="date" label="To Date" onChange={handleTextFieldToDateChange} defaultValue={toDate} style={{ maxHeight: '100px', minHeight: '80px', maxWidth: '165px', minWidth: '150px' }} />
        </Grid>
      </Grid >
      <Grid className={classes.sortFeature} container xs={12} direction="row">
        <Typography className={classes.sortText}><strong>Sort: </strong> </Typography>
        <FormControlLabel className={classes.sortByDate} control={<Radio size="small" checked={sortRadioBoxes.byDate} onChange={handleSortChange} name="byDate" />} label={<Typography style={{ fontSize: '15px' }} value="sortByDate" >By Date</Typography>} />
        <FormControlLabel className={classes.sortByRelevance} control={<Radio size="small" checked={sortRadioBoxes.byRelevance} onChange={handleSortChange} name="byRelevance" />} label={<Typography style={{ fontSize: '15px' }} value="sortByRelevance">By Relevance</Typography>} />
      </Grid>
      <Button className={classes.submitButton} variant="contained" style={{ backgroundColor: "#34495e", color: "#ecf0f1" }}> <strong></strong>Submit</Button>
    </Card >
  )
}

export default SearchFilterBox

{/* <FormControlLabel className={classes.dateShortcut} control={<Checkbox size="small" checked={dateCheckBoxes.past48Hrs} onChange={handleDateChange} name="past48Hrs" />} label={<Typography style={{ fontSize: '15px' }}>Past 48hrs</Typography>} />
        <FormControlLabel className={classes.dateShortcut} control={<Checkbox size="small" checked={dateCheckBoxes.pastWeek} onChange={handleDateChange} name="pastWeek" />} label={<Typography style={{ fontSize: '15px' }}>Past Week</Typography>} />
        <FormControlLabel className={classes.dateShortcut} control={<Checkbox size="small" checked={dateCheckBoxes.pastMonth} onChange={handleDateChange} name="pastMonth" />} label={<Typography style={{ fontSize: '15px' }}>Past Month</Typography>} />
        <FormControlLabel className={classes.dateShortcut} control={<Checkbox size="small" checked={dateCheckBoxes.pastQuarter} onChange={handleDateChange} name="pastQuarter" />} label={<Typography style={{ fontSize: '15px' }}>Past Quarter</Typography>} />
        <FormControlLabel className={classes.dateShortcut} control={<Checkbox size="small" checked={dateCheckBoxes.pastYear} onChange={handleDateChange} name="pastYear" />} label={<Typography style={{ fontSize: '15px' }}>Past Year</Typography>} />
      
  function handleDateChange(e) {
    setDateCheckBoxes({ ...defaultDateCheckBoxes, [e.target.name]: true })
    if (dateCheckBoxes.past48Hrs) {
      setFromDate(changeDateFormat(new Date(), 2))
    }
    else if (dateCheckBoxes.pastWeek) {
      setFromDate(changeDateFormat(new Date(), 7))
    }
    else if (dateCheckBoxes.pastMonth) {
      setFromDate(changeDateFormat(new Date(), 30))
    }
    else if (dateCheckBoxes.pastQuarter) {
      setFromDate(changeDateFormat(new Date(), 90))
    }
    else if (dateCheckBoxes.pastYear) {
      setFromDate(changeDateFormat(new Date(), 365))
    }
  }
      
      
      
      */}
