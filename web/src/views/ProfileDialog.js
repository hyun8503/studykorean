import React from "react";
import {withStyles} from "@material-ui/core/styles";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import {inject, observer} from "mobx-react";
import ClearIcon from '@material-ui/icons/Clear';
import Dialog from "@material-ui/core/Dialog";
import Table from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";

const styles = (theme) => ({
    dialog: {
        '& .MuiDialog-paper': {
            margin: 0,
            width: '100%',
            height: '100%',
            borderRadius: 0,
            float: 'top',
            maxHeight: '100%',
            minHeight: '100%',
        },

    },
    title: {
        padding: 12,
        backgroundColor: '#27439f',
        textAlign: 'center',
        '& .MuiTypography-h6': {
            fontFamily: 'Montserrat',
            fontSize: 20,
            fontWeight: 600,
        },
    },
    root: {
        width: '100%',
    },

});

@inject("profileStore")
@observer
class ProfileDialog extends React.Component {
    componentDidMount() {

    }

    render() {
        const {classes, profileStore} = this.props;
        return (
            <Dialog fullScreen className={classes.dialog}
                    open={profileStore.isProfileDialog}
                    onClose={() => profileStore.changeProfileDialog(false)}
                    disableBackdropClick={false}
                    disableEscapeKeyDown={false}>
                <DialogTitle className={classes.title}> <img src={"logo192.png"}  alt="??"  style={{width: 33, height: 30}}/>
                    <ClearIcon style={{float: 'right'}}
                               onClick={() => profileStore.changeProfileDialog(false)}
                    />
                </DialogTitle>

                <DialogContent style={{margin: 0, padding: 0}}>
                    <div className={classes.root}>
                        <Table>
                            <thead>
                            <TableRow>
                                    <th>이름</th>
                                    <th>현재 시간</th>
                                    <th>현재 포인트</th>
                                    <th><img src={"logo192.png"} alt={"??"} style={{width: 33, height: 30}}/></th>
                            </TableRow>
                            </thead>
                            <tbody>
                            <TableRow>
                                <td> 이름</td>
                                <td> 현재 시간</td>
                                <td> 현재 포인트</td>
                                <td><img src={"logo192.png"} alt={"??"} style={{width: 33, height: 30}}/></td>
                            </TableRow>
                            </tbody>
                        </Table>
                    </div>

                </DialogContent>
            </Dialog>
        )
    }
}

export default withStyles(styles)(ProfileDialog);
