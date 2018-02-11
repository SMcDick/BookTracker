import React, { Component } from 'react';

import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import Chip from 'material-ui/Chip';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import * as actions from '../Actions/genericActions'
import { connect } from 'react-redux'

import ImageField from '../ui/ImageField'
import FlatTextField from '../ui/FlatTextField'
import FlatNumberField from '../ui/FlatNumberField'
import Responsive from '../ui/Responsive'

import Avatar from 'material-ui/Avatar';

import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';

import PropTypes from 'prop-types'

const styles = {
    chip: {
        margin: 4,
    },
    wrapper: {
        display: 'flex',
        flexWrap: 'wrap',
    },
};

class BookTable extends Component {
    static propTypes = {
        dataCollection: PropTypes.array.isRequired
    }

    render() {
        const { dataCollection } = this.props;

        return (
            <Responsive
                small={
                    <List>
                        {
                            dataCollection.map((f, index) => {
                                return (<React.Fragment>
                                    <ListItem primaryText={f.title}
                                        leftAvatar={<Avatar src={f.image} />} />

                                    <ListItem primaryText={f.isbn}
                                        secondaryText="ISBN" />
                                    <ListItem primaryText={<FlatNumberField source="usSalesRank" record={f} options={{ style: 'decimal', useGrouping: false }} />}
                                        secondaryText="Sales rank" />

                                    <ListItem primaryText={<FlatNumberField source="usNetPayout" record={f} options={{ style: 'currency', currency: 'USD' }} />}
                                        secondaryText="Net payout" />

                                    <ListItem primaryText={<FlatNumberField source="offer" record={f} options={{ style: 'currency', currency: 'USD' }} />}
                                        secondaryText="Offer" />

                                    <ListItem primaryText={<FlatNumberField source="caNetPayout" record={f} options={{ style: 'currency', currency: 'USD' }} />}
                                        secondaryText="CA Net Payout" />

                                    <ListItem primaryText={<FlatNumberField source="caSalesRank" record={f} options={{ style: 'decimal', useGrouping: false }} />}
                                        secondaryText="CA Sales Rank" />

                                    <ListItem primaryText={<FlatNumberField source="inNetPayout" record={f} options={{ style: 'currency', currency: 'USD' }} />}
                                        secondaryText="IN Net Payout" />

                                    <ListItem primaryText={<FlatNumberField source="inSalesRank" record={f} options={{ style: 'decimal', useGrouping: false }} />}
                                        secondaryText="IN Sales Rank" />

                                    <ListItem primaryText={<FlatNumberField source="mxNetPayout" record={f} options={{ style: 'currency', currency: 'USD' }} />}
                                        secondaryText="MX Net Payout" />

                                    <ListItem primaryText={<FlatNumberField source="mxSalesRank" record={f} options={{ style: 'decimal', useGrouping: false }} />}
                                        secondaryText="MX Sales Rank" />
                                    <Divider inset={true} />
                                </React.Fragment>)
                            })
                        }
                    </List>
                }
                medium={
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHeaderColumn>Title</TableHeaderColumn>
                                <TableHeaderColumn>ISBN</TableHeaderColumn>
                                <TableHeaderColumn>Image</TableHeaderColumn>
                                <TableHeaderColumn>Sales Rank</TableHeaderColumn>
                                <TableHeaderColumn>Net Payout</TableHeaderColumn>
                                <TableHeaderColumn>Offer</TableHeaderColumn>
                                <TableHeaderColumn>CA Net Payout</TableHeaderColumn>
                                <TableHeaderColumn>CA Sales Rank</TableHeaderColumn>
                                <TableHeaderColumn>IN Net Payout</TableHeaderColumn>
                                <TableHeaderColumn>IN Sales Rank</TableHeaderColumn>
                                <TableHeaderColumn>MX Net Payout</TableHeaderColumn>
                                <TableHeaderColumn>MX Sales Rank</TableHeaderColumn>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {
                                dataCollection.map((f, index) => {
                                    return (<TableRow key={index}>
                                        <TableRowColumn><FlatTextField source="title" record={f} /></TableRowColumn>

                                        <TableRowColumn><FlatTextField source="isbn" record={f} /></TableRowColumn>

                                        <TableRowColumn><ImageField source="image" record={f} title={f.title} /></TableRowColumn>

                                        <TableRowColumn><FlatNumberField source="usSalesRank" record={f} options={{ style: 'decimal', useGrouping: false }} /></TableRowColumn>

                                        <TableRowColumn><FlatNumberField source="usNetPayout" record={f} options={{ style: 'currency', currency: 'USD' }} /></TableRowColumn>

                                        <TableRowColumn><FlatNumberField source="offer" record={f} options={{ style: 'currency', currency: 'USD' }} /></TableRowColumn>

                                        <TableRowColumn><FlatNumberField source="caNetPayout" record={f} options={{ style: 'currency', currency: 'USD' }} /></TableRowColumn>

                                        <TableRowColumn><FlatNumberField source="caSalesRank" record={f} options={{ style: 'decimal', useGrouping: false }} /></TableRowColumn>

                                        <TableRowColumn><FlatNumberField source="inNetPayout" record={f} options={{ style: 'currency', currency: 'USD' }} /></TableRowColumn>

                                        <TableRowColumn><FlatNumberField source="inSalesRank" record={f} options={{ style: 'decimal', useGrouping: false }} /></TableRowColumn>

                                        <TableRowColumn><FlatNumberField source="mxNetPayout" record={f} options={{ style: 'currency', currency: 'USD' }} /></TableRowColumn>

                                        <TableRowColumn><FlatNumberField source="mxSalesRank" record={f} options={{ style: 'decimal', useGrouping: false }} /></TableRowColumn>
                                    </TableRow>)
                                })
                            }
                        </TableBody>
                    </Table>
                }
            />
        )
    }
}

class BookSearchAction extends Component {
    static propTypes = {
        onSearchClick: PropTypes.func.isRequired,
        onRefreshClick: PropTypes.func.isRequired,
        defaultValue: PropTypes.string
    }

    constructor() {
        super()
        this.state = { textSearch: '' }
        this.handleSearchButtonClick.bind(this)
        this.handleTextSearchChange.bind(this)
    }

    handleTextSearchChange = (evt, newValue) => {
        this.setState({ textSearch: newValue })
    }

    handleSearchButtonClick = () => {
        const { textSearch } = this.state

        if (typeof this.props.onSearchClick === 'function') {
            this.props.onSearchClick(textSearch);
        }
    }

    handleRefreshButtonClick = () => {
        if (typeof this.props.onRefreshClick === 'function') {
            this.props.onRefreshClick()
        }
    }

    componentDidMount() {
        this.setState({ textSearch: this.props.defaultValue })
    }

    render() {
        const { defaultValue } = this.props

        return (
            <div>
                <TextField hintText="ISBN" defaultValue={defaultValue} onChange={this.handleTextSearchChange} />
                <RaisedButton label="Search" primary={true} onClick={this.handleSearchButtonClick} />
                <RaisedButton label="Refresh" primary={false} onClick={this.handleRefreshButtonClick} />
            </div>
        )
    }
}

class BookIsbnSearchList extends Component {
    static propTypes = {
        onDelete: PropTypes.func.isRequired,
        isbnColl: PropTypes.array.isRequired
    }

    render() {
        const { isbnColl } = this.props

        return (<div style={styles.wrapper}>
            {isbnColl.map(this.renderChip, this)}
        </div>)
    }

    handleRequestDelete(key) {
        const { onDelete } = this.props
        onDelete(key)
    }

    renderChip(data) {
        return (
            <Chip
                key={data}
                onRequestDelete={() => this.handleRequestDelete(data)}
                style={styles.chip}>
                {data}
            </Chip>
        );
    }
}

class BookApp extends Component {
    static propTypes = {
        dispatch: PropTypes.func.isRequired,
        isbnColl: PropTypes.array.isRequired,
        bookColl: PropTypes.array.isRequired
    }

    constructor() {
        super()
        this.handleAddBook.bind(this)
        this.handleRemoveBook.bind(this)
        this.handleRefresh.bind(this)
    }

    handleAddBook = (isbn) => {
        const { isbnColl } = this.props
        const cIsbn = isbnColl.filter((item) => { return item === isbn })
        if (cIsbn.length === 0) {
            const action = actions.addBookToSearch(isbn)

            this.props.dispatch(action)
            this.props.dispatch(actions.fetchBook(isbn))
        }
    }

    handleRemoveBook = (isbn) => {
        const action = actions.removeBookToSearch(isbn)
        this.props.dispatch(action)
    }

    handleRefresh = () => {
        const { isbnColl } = this.props
        const action = actions.refreshBookList(isbnColl)
        this.props.dispatch(action)
    }

    render() {
        const { bookColl, isbnColl } = this.props

        return (<Card>
            <CardHeader title="Book Scouter App" />
            <CardText>
                <BookSearchAction defaultValue="" onSearchClick={this.handleAddBook} onRefreshClick={this.handleRefresh} />
                <BookIsbnSearchList isbnColl={isbnColl} onDelete={this.handleRemoveBook} />
                <BookTable dataCollection={bookColl} />
            </CardText>
        </Card>)
    }
}

const mapStateToProps = state => {
    const { bookReducer } = state

    const isbnColl = bookReducer.isbnColl ? bookReducer.isbnColl : []
    const bookColl = bookReducer.bookColl ? bookReducer.bookColl : []
    return {
        isbnColl,
        bookColl
    }
}

export default connect(mapStateToProps)(BookApp)