import React from 'react'
import { List, ListItem, ListItemIcon, ListItemText, Card, Typography } from '@material-ui/core'
import Checkbox from '@material-ui/core/Checkbox';
import SearchIcon from '@material-ui/icons/Search';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({

  root: {
    paddingTop: 20,
    borderRadius: 0,
    maxWidth: 200,
    marginBottom:1,
  },

  headingRow: {
    marginLeft: 15,
    paddingBottom: 10,
  },

  heading: {
    fontWeight: 600,
    fontSize: 15.5,
    marginRight: 10,

  },
  row: {
    marginLeft: 4,
    paddingTop: 0,
    paddingBottom: 4,
    marginTop: -6,
    marginBottom: -6,
  },
  rowText: {
    marginLeft: 8,
    fontSize: 14.5,

  },

  footer: {
    marginBottom: 10,

  }

}))
const Company = () => {

  const classes = useStyles()

  return (
    <Card className={classes.root}>
      <ListItem className={classes.headingRow}>
        <Typography className={classes.heading}>Company</Typography>
        <SearchIcon />
      </ListItem>
      {[0, 1, 2,3,4,5,6,7,8,9,0, 1, 2,3,4,5,6,7,8,9,].map((value) => {
        return (
          <ListItem className={classes.row}>
            <Checkbox size="small" />
            <Typography className={classes.rowText}>Company {value}</Typography>
          </ListItem>
        )
      })}
      <Typography className={classes.footer}></Typography>
    </Card>
  )
}


export default Company

