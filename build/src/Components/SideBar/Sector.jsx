import React from 'react'
import { List, ListItem, ListItemIcon, ListItemText, Card, Typography } from '@material-ui/core'
import Checkbox from '@material-ui/core/Checkbox';
import { makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles(() => ({

  root: {
    // paddingTop: 10,
    borderRadius: 0,
    maxWidth: 200,
    marginBottom: 1,
  },
  headingRow: {
    marginLeft: 15,
    paddingBottom: 10,
  },
  heading: {
    fontWeight: 600,
    fontSize: 16.5,
    marginRight: 10,
  },
  row: {
    marginLeft: 4,
    paddingTop: 0,
    paddingBottom: 0,
    marginTop: -6,
    marginBottom: -6,
  },
  rowText: {
    marginLeft: 4,
    fontSize: 14.5,
  },

  footer: {
    marginBottom: 10,

  }

}))


const sectorUniverseList = ['Auto', 'Banking', 'Infra', 'IT', 'FMCG', 'Metals', 'Oil&Gas', 'Pharma', 'Power', 'Telecom', 'Aviation', 'Cement', 'Durables', 'Insurance', 'Packaging', 'Paints', 'Retail', 'Textiles', 'Tyres']

const Sector = ({ handleSectorChange, initialSelectedSector }) => {

  function getSectorUI() {
    const sectorUI = sectorUniverseList.map((sectorName) => {
      if (!initialSelectedSector.includes(sectorName)) { 
      return (
        <ListItem className={classes.row}>
          <Checkbox size="small" onChange={() => handleSectorChange(sectorName)} />
          <Typography className={classes.rowText}>{sectorName}</Typography>
        </ListItem>
      )  
    }
    else {
      return (
        <ListItem className={classes.row}>
          <Checkbox defaultChecked size="small" onChange={() => handleSectorChange(sectorName)} />
          <Typography className={classes.rowText}>{sectorName}</Typography>
        </ListItem>
      )  
    }
  })
    return sectorUI
  }
  const classes = useStyles()

  return (
    <Card className={classes.root}>
      <ListItem className={classes.headingRow}>
        <Typography className={classes.heading}>Select Sector</Typography>
        {/* <SearchIcon /> */}
      </ListItem>
      {getSectorUI()}
      <Typography className={classes.footer}></Typography>
    </Card>
  )
}

export default Sector

