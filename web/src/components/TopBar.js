import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {AppBar, IconButton, Toolbar} from "@material-ui/core";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import {observer} from "mobx-react";
import {useStores} from "../stores";
import {Link, useHistory} from "react-router-dom";
import {AccountCircle, Search as SearchIcon} from "@material-ui/icons";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import InputBase from "@material-ui/core/InputBase";
import ProfileDialog from "../views/ProfileDialog";


const useStyles = makeStyles((theme) => ({
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        backgroundColor: 'white',
        color: 'red',
        '& .MuiToolbar-gutters': {
            paddingRight: 0,
            paddingLeft: 0
        },
    },
    toolBar: {
        [theme.breakpoints.down("xs")]: {},
        height: '50px',
        '& .MuiContainer-root': {
            paddingRight: 0,
            paddingLeft: 0,
        },

    },
    formControl: {
        [theme.breakpoints.down("xs")]: {
            width: '100%',
        },
        width: '50%',
    },
    inputBase: {
        [theme.breakpoints.down("xs")]: {
            margin: '5px 0',
        },
        border: '1px solid gray',
        margin: '10px 0',
        padding: 5,
        borderRadius: 5,

    },
    flexCenter: {
        height: '100%',
        display: "flex",
        justifyContent: 'center',
        justifyItems: 'center',
    },
    inlineCenter: {
        display: 'inline-block',
        margin: '0 auto',
        textAlign: 'center',
    },

}));

const TopBar = observer((props) => {
    const classes = useStyles();
    const {mobileOpen, setMobileOpen, isLoggedIn, doLogout} = props;
    const {profileStore} = useStores();
    const history = useHistory();
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    return (
        <AppBar position="fixed" className={classes.appBar}>
            <Toolbar>
                <Container className={classes.flexCenter}>
                    <Grid item xs={2} sm={1} className={classes.flexCenter}
                          onClick={() => {history.push("/")}}
                    >
                        <img src={"logo192.png"} alt="??" style={{width: '60%', height: '40px', margin: 10}}/>
                    </Grid>

                    <Grid item xs={8} sm={10}
                    >
                        <FormControl className={classes.formControl}>
                            <InputBase
                                className={classes.inputBase}
                                fullWidth
                                placeholder={"Language to Learn"}
                                inputProps={{'aria-label': 'search'}}
                                endAdornment={<SearchIcon style={{color: 'red'}}/>}
                            >
                            </InputBase>
                        </FormControl>
                    </Grid>




                    {isLoggedIn ? (

                        <Grid item xs={4} sm={2}>
                            <IconButton onClick={() => profileStore.changeProfileDialog(true)}>
                                <AccountCircle/>
                            </IconButton>

                            <IconButton color="inherit" onClick={doLogout}>
                                <ExitToAppIcon/>
                            </IconButton>
                        </Grid>
                    ) : (
                        <Grid item xs={4} sm={2}>
                            <div className={classes.flexCenter} style={{marginTop: 20}} onClick={() => {history.push("/signUp")}} >
                                JOIN
                            </div>
                        </Grid>
                    )}


                </Container>

            </Toolbar>
            <ProfileDialog/>
        </AppBar>
    );
})

export default TopBar;