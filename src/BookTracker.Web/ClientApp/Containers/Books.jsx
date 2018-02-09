import React, { Component } from 'react';
import * as actions from '../Actions/genericActions'
import { connect } from 'react-redux'

import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';

import PropTypes from 'prop-types'

class BookTable extends Component {
    static propTypes = {
        dispatch: PropTypes.func.isRequired,
        dataCollection: PropTypes.array.isRequired
    }

    render() {
        const { dataCollection } = this.props;

        return (
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
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        dataCollection.map((f, index) => {
                            return (<TableRow>
                                <TableRowColumn>{f.title}</TableRowColumn>
                            </TableRow>)
                        })
                    }
                </TableBody>
            </Table>
        )
    }
}

class BookApp extends Component {
    static propTypes = {
        dispatch: PropTypes.func.isRequired,
        bookSearch: PropTypes.array.isRequired
    }

    handleAddBook = (isbn) => {
        const { dipatch } = this.props
        dispatch(actions.addBookToSearch(isbn))
    }

    handleRemoveBook = (isbn) => {
        const { dispatch } = this.props
        dispatch(actions.removeBookToSearch(isbn))
    }

    render() {
        let data = [{ title: 'title 1' }, { title: 'title 2' }, { title: 'title 3' }]
        return <BookTable dataCollection={data} />
    }
}

const mapStateToProps = state => {
    return {
    }
}

export default connect(mapStateToProps)(BookApp)