import React from 'react'
import { Card, Typography, CardContent, CardMedia, CardActionArea, Button, Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
var moment = require('moment');

const useStyles = makeStyles(() => ({

  card: {
    width: '88%',
    display: 'flex',
  },

  cardContent: {
    objectFit: "cover"
  },

  cardAction: {
    display: 'flex',
    justifyContent: "flex-start",
  },
  media: {
    paddingLeft: 15,
    borderRadius: 5,
  },
  title: {
    paddingLeft: 10,
    paddingRight: 0,
    fontSize: 16,
    fontWeight: 450,
  },
  belowTitle: {
    paddingLeft: 0,
    display: 'flex',
  },
  alignButtons: {
    display: "flex",
  },
  button: {
    marginTop: 10,
    marginLeft: 25,
    fontSize: 15,
    textTransform: "none",
  },
  date: {
    marginTop: 10,
    marginLeft: 0,
    fontSize: 15,
  },
  oneButtondate: {
    marginTop: 10,
    marginLeft: 180,
    fontSize: 15,
    textTransform: "none",
  },
  twoButtondate: {
    marginTop: 10,
    marginLeft: 80,
    fontSize: 15,
    textTransform: "none",
  },
}))


const CardNews = ({ articleObject }) => {

  function fetchImage(publisherName) {

    if (publisherName == "Mint") {
      return require("../../public/Mint.jpg")
    }
    else if (publisherName == "ET") {
      return require("../../public/ET2.jpg")
    }
    else if (publisherName == "BusinessStandard") {
      return require("../../public/BS.jpg")
    }
    else if (publisherName == "BloombergQuint") {
      return require("../../public/BQ.jpg")
    }
    else if (publisherName == "FinancialExpress") {
      return require("../../public/FE.jpg")
    }
    else if (publisherName == "MoneyControl") {
      return require("../../public/MoneyControl.jpg")
    }
    else if (publisherName == "HBL") {
      return require("../../public/HBL.jpg")
    }
  }

  function openURL(url) {
    const win = window.open(url, '_blank');
    if (win != null) {
      win.focus();
    }
  }

  function getTime(time) {
    var updatedTime;
    // time = "2020/08/29, 23:00:12"
    if (moment().subtract(30, 'days') > moment(time)) {
      updatedTime = moment(time, "YYYY-MM-DD hh:mm:ss").format("MMM, yy");
    }
    else if (moment(time, "YYYY-MM-DD hh:mm:ss").utcOffset("+05:30").startOf('day').isSame(moment().utcOffset("+05:30").startOf('day'))) {
      updatedTime = 'Today'
    }
    else if (moment(time, "YYYY-MM-DD hh:mm:ss").utcOffset("+05:30").startOf('day').isSame(moment().utcOffset("+05:30").subtract(1, 'days').startOf('day'))) {
      updatedTime = 'Yesterday'
    }
    else {
      updatedTime = moment(time, "YYYY-MM-DD hh:mm:ss").format("Do MMM");
    }
    return updatedTime
  }

  function fetchSectorButtons() {
    if (articleObject.ThesisScore.Second > 10) {
      return (
        <div>
          <Button variant="outlined" className={classes.button} disabled size="small"
            style={{
              borderRadius: 5,
              backgroundColor: "#e57373",
              padding: "2px 4px",
              fontSize: "13px",
              fontWeight: 600,
              color: "#fff",
              fontStyle: "italic",
            }} >
            {articleObject.ThesisSector.First}  {articleObject.ThesisScore.First}
          </Button>
          <Button variant="outlined" className={classes.button} disabled size="small"
            style={{
              borderRadius: 5,
              backgroundColor: "#7986cb",
              padding: "2px 6px",
              fontSize: "13px",
              fontWeight: 600,
              color: "#fff",
              fontStyle: "italic",
            }}>
            {articleObject.ThesisSector.Second} {articleObject.ThesisScore.Second}
          </Button>
          <Button variant="outlined" className={classes.twoButtondate}
            style={{
              borderColor: "#e57373",
              padding: "2px 4px",
              color: "#e57373",
            }}>
            {/* {articleObject.DatePublished} */}
            {getTime(articleObject.DatePublished)}
          </Button>
        </div>
      )
    }
    else {
      return (
        <div>
          <Button variant="outlined" className={classes.button} disabled size="small"
            style={{
              borderRadius: 5,
              backgroundColor: "#e57373",
              padding: "2px 4px",
              fontSize: "13px",
              fontWeight: 600,
              color: "#fff",
              fontStyle: "italic",
            }} >
            {articleObject.ThesisSector.First}  {articleObject.ThesisScore.First}
          </Button>
          <Button variant="outlined" className={classes.oneButtondate}
            style={{
              borderColor: "#e57373",
              padding: "2px 4px",
              color: "#e57373",
            }}>
            {/* {articleObject.DatePublished} */}
            {getTime(articleObject.DatePublished)}
          </Button>
        </div>
      )
    }
  }

  function getTitle() {
    if (articleObject.Title.length < 150) {
      return articleObject.Title
    }
    else {
      return articleObject.Title.substring(0, 150) + '   ....'
    }
  }

  const classes = useStyles()

  if (typeof articleObject != 'undefined') {
    return (
      <Card className={classes.card} variant='outlined' onClick={() => openURL(articleObject.URL)} target="_blank">
        <CardActionArea className={classes.cardAction}  >
          <CardMedia component="img"
            className={classes.media}
            image={fetchImage(articleObject.Publisher)} // BS.png mint5.jpg
            style={{ height: 65, width: 65 }}
          />
          <CardContent >
            <Typography className={classes.title} >
              <Box fontWeight="600" fontFamily='Sansita-Swashed' fontSize={17.5} >{getTitle()}</Box>

              {/* {articleObject.Title} */}
            </Typography>
            <div className={classes.alignButtons}>
              {fetchSectorButtons()}
            </div>
          </CardContent>
        </ CardActionArea>
      </Card>
    )
  }
  else {
    return null
  }
}

export default CardNews
