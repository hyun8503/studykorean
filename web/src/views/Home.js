import React from "react";
import {withSnackbar} from "notistack";
import {withRouter} from "react-router-dom";
import {withStyles} from "@material-ui/core/styles";

import {Container, Toolbar, Typography} from "@material-ui/core";
import ReactPayPal from "../components/reactPayPal";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";


const styles = theme => ({
    mainContainer: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    appBarSpacer: theme.mixins.toolbar,
    mainContent: {
        marginTop: theme.spacing(2),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    toolbar: {
        width: '100%',
    },
    lessonCard: {
        width: '100%',
        padding: theme.spacing(3),
    },
    cardContainer: {
        height: '100%',
        display: "flex",
        justifyContent: 'center',
        justifyItems: 'center',
        margin: '5px',
    },
});

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checkout: false,
        };
    }

    componentDidMount() {
        this.props.enqueueSnackbar("Welcome", {
            variant: 'info'
        });
    }

    render() {
        const {classes} = this.props;

        return (
            <React.Fragment>
                <Container component="main" className={classes.mainContainer}>
                    <div className={classes.appBarSpacer}/>
                    <div className={classes.mainContent}>
                        <Typography variant="h4" component="h2">

                        </Typography>

                        {/*paypal button*/}
                        {(this.state.checkout === true)
                            ? <div className="payment-div">
                                <ReactPayPal/>
                            </div>

                            : <div>
                                <h1>React-PayPal</h1>
                                <button onClick={() => {
                                    this.setState({checkout: true})
                                }} className="checkout-button">Checkout
                                </button>
                            </div>
                        }
                        {/*{this.props.profileStore.teacherLessonList.length !== 0 ?*/}
                        {/*    this.props.profileStore.teacherLessonList.map((data,index) => {*/}
                        {/*       return  <Card key={index}> {data} </Card>})*/}
                        {/*    : ''*/}
                        {/*}*/}
                        {/*슬라이드로 처*/}
                        <Grid container item xs={12}>
                            <Grid item xs={3} className={classes.cardContainer}>
                                <Card className={classes.lessonCard}>dd</Card>
                            </Grid>
                            <Grid item xs={3} className={classes.cardContainer}>
                                <Card className={classes.lessonCard}>dd</Card>
                            </Grid>
                            <Grid item xs={3} className={classes.cardContainer}>
                                <Card className={classes.lessonCard}>dd</Card>
                            </Grid>
                            <Grid item xs={3} className={classes.cardContainer}>
                                <Card className={classes.lessonCard}>dd</Card>
                            </Grid>
                        </Grid>


                    </div>
                </Container>

            </React.Fragment>
    );
    }
    };

    export default withSnackbar(withRouter(withStyles(styles) (Home)));