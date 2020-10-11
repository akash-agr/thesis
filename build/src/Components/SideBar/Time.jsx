import React from 'react'
import { List, ListItem, ListItemIcon, ListItemText, Card, Typography } from '@material-ui/core'
import Checkbox from '@material-ui/core/Checkbox';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({

  time: {
    paddingTop:30,
    borderRadius: 0,
    maxWidth: 200,
    marginBottom: 0.5,    
    borderTopWidth: 10  
  },
  heading: {
    marginLeft: 30,
    paddingBottom: 10,
    fontWeight: 600,
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


const defaultProps = {
  // bgcolor: 'background.paper',
  border: 1,
  // m: 1,
  borderColor: 'text.primary',
  // style: { width: '5rem', height: '5rem' },
};




const Time = () => {

  const classes = useStyles()

  return (
    <Card className={classes.time} >
      <Typography className={classes.heading}>Time Horizon</Typography>
      <ListItem className={classes.row}>
        <Checkbox size="small" />
        <Typography className={classes.rowText}>Today</Typography>
      </ListItem>
      <ListItem className={classes.row}>
        <Checkbox size="small" />
        <Typography className={classes.rowText}>Past 1 week</Typography>
      </ListItem>
      <ListItem className={classes.row}>
        <Checkbox size="small" />
        <Typography className={classes.rowText}>Past 1 month</Typography>
      </ListItem>
      <ListItem className={classes.row}>
        <Checkbox size="small" />
        <Typography className={classes.rowText}>Past 3 months</Typography>
      </ListItem>
      <ListItem className={classes.row}>
        <Checkbox size="small" />
        <Typography className={classes.rowText}>Past 6 months</Typography>
      </ListItem>
      <ListItem className={classes.row}>
        <Checkbox size="small" />
        <Typography className={classes.rowText}>Past 1 year</Typography>
      </ListItem>
      <Typography className={classes.footer}></Typography>
    </Card>
  )
}

export default Time
