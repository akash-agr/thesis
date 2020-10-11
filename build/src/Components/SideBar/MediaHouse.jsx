import React from 'react'
import { List, ListItem, ListItemIcon, ListItemText, Card, Typography } from '@material-ui/core'
import Checkbox from '@material-ui/core/Checkbox';
import { makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles(() => ({

  root: {
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


const PublisherList = ['Business Standard', 'Economic Times', 'LiveMint', 'Bloomberg Quint', 'Financial Express', 'Money Control', 'BusinessLine'] //['Business Standard', 'Economic Times', 'LiveMint']
// const initialSelectedPublisher = 


const MediaHouse = ({ initialSelectedPublisher, handlePublisherChange }) => {

  const classes = useStyles()

  function getPublisherUI() {
    return PublisherList.map((PublisherName) => {
      if (initialSelectedPublisher.includes(PublisherName)) {
        return (
          <ListItem className={classes.row}>
            <Checkbox size="small" defaultChecked onChange={() => handlePublisherChange(PublisherName)} />
            <Typography className={classes.rowText}>{PublisherName}</Typography>
          </ListItem>
        )
      } else {
        return (
          <ListItem className={classes.row}>
            <Checkbox size="small"  onChange={() => handlePublisherChange(PublisherName)} />
            <Typography className={classes.rowText}>{PublisherName}</Typography>
          </ListItem>
        )
      }
    })
  }

  return (
    <Card className={classes.root}>
      <ListItem className={classes.headingRow}>
        <Typography className={classes.heading}>News Source</Typography>
        {/* <SearchIcon /> */}
      </ListItem>
      {getPublisherUI()}
      <Typography className={classes.footer}></Typography>
    </Card>
  )
}

export default MediaHouse

