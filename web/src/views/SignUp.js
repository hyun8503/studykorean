import React from "react";
import {inject, observer} from "mobx-react";
import Table from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TextField from "@material-ui/core/TextField";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import TableHead from "@material-ui/core/TableHead";
import {withStyles} from "@material-ui/core/styles";
import TableBody from "@material-ui/core/TableBody";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import NativeSelect from "@material-ui/core/NativeSelect";
import Select from "@material-ui/core/Select";
import TableFooter from "@material-ui/core/TableFooter";
import Button from "@material-ui/core/Button";

const style = theme => ({
    paper: {
        margin: 20,
        marginTop: 100,
        padding: 20,
        border: '1px solid black'
    },

});

const countryCode = [
    { country: 'China', code: 'CN' },
    { country: 'Taiwan', code: 'TW' },
    { country: 'HongKong', code: 'HK' },
    { country: 'United States', code: 'US' },
];

@inject('authStore')
@observer
class SignUp extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
    }


    render() {
        const {classes} = this.props;

        return (
            <TableContainer component={Paper} className={classes.paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align={'center'} colSpan={2}>加入會員</TableCell>
                            {/*<TableCell align={'center'}></TableCell>*/}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>
                                <TextField></TextField>
                                {/* 아이디가 중복일 떄, 메시지 출력 */}
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>密碼</TableCell>
                            <TableCell>
                                    <InputLabel>密碼</InputLabel>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>確認密碼</TableCell>
                            <TableCell>
                                <TextField></TextField>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>電子郵件</TableCell>
                            <TableCell>
                                <TextField></TextField>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>姓名</TableCell>
                            <TableCell>
                                <TextField></TextField>
                            </TableCell>
                        </TableRow>
                        {/*country (select로 고르기)   https://restcountries.eu/rest/v2  : 여기서 목록 출력!! */}
                        {/*city  (직접입력)	*/}
                        {/*user_language  (select로 고르기)	*/}
                        {/*selected_language  (select로 고르기)*/}

                        <TableRow>
                            <TableCell>地區</TableCell>
                            <TableCell>
                                <FormControl variant="filled" className={classes.formControl}>
                                    <InputLabel htmlFor="filled-age-native-simple">地區</InputLabel>
                                    <Select
                                        native
                                        // value={state.age}
                                        // onChange={handleChange}
                                        inputProps={{
                                            name: 'age',
                                            id: 'filled-age-native-simple',
                                        }}
                                    >
                                        <option aria-label="None" value="" />
                                        <option value={10}>中國大陸</option>
                                        <option value={20}>台灣</option>
                                        <option value={30}>香港</option>
                                        <option value={40}>新加坡</option>
                                    </Select>
                                </FormControl>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TableCell align={'center'} colSpan={2}><Button onClick={()=>{this.props.authStore.doSignup()}}>加入</Button></TableCell>
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>

        )
    }
}

export default withStyles(style)(SignUp);
