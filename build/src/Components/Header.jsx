import React from 'react'
import { AppBar, Toolbar, Typography, Grid, Button, makeStyles, Link } from '@material-ui/core'
import HomeIcon from '@material-ui/icons/Home';

const useStyles = makeStyles(() => ({
  root: {
    // padding: 50,
    marginBottom: 10
  },

  title: {
    paddingLeft: 5,
  },
  
  Icon: {
    paddingLeft: 40,
  }

}))


const Header = ({ setShowSearchContent }) => {


  function goBackToNewsFeed(e) {
    e.preventDefault()
    window.location.reload(false);
  }

  const classes = useStyles()


  return (
    <div>
      <AppBar className={classes.root} position='static'>
        <Toolbar>
          <HomeIcon className={classes.Icon} variant = "outlined" onClick={goBackToNewsFeed} />
          <Link href="#" className={classes.title} onClick={goBackToNewsFeed} color="inherit" underline = 'none' style= {{fontSize: '20px'}}> Home</Link>
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default Header
