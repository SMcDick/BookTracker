import React, { Component } from 'react';
import PropTypes from 'prop-types'

import FlatTextField from '../ui/FlatTextField'
import FlatNumberField from '../ui/FlatNumberField'
import ImageField from '../ui/ImageField'
import Responsive from '../ui/Responsive'
import { List, ListItem } from 'material-ui/List';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import Avatar from 'material-ui/Avatar';
import Divider from 'material-ui/Divider';
import BookTableSmall from './BookTableSmall'

import { styles } from '../styles'

const BookTable = (props) => {
    return (
        <Responsive
            small={
                <BookTableSmall dataCollection={props.dataCollection} />
            }
            medium={
                <BookTableMedium dataCollection={props.dataCollection} />
            }
        />
    )
}

BookTable.propTypes = {
    dataCollection: PropTypes.array.isRequired
}

const BookTableMedium = (props) => {
    return (
    <Table>
        <TableHeader adjustForCheckbox={styles.table.displaySelectAll} displaySelectAll={styles.table.displaySelectAll}>
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
        <TableBody displayRowCheckbox={styles.table.displaySelectAll}>
            {
                props.dataCollection.map((f, index) => {
                    if(f.title == undefined || f.title == null || f.title == '') {
                        return (
                            <React.Fragment key={index}>
                                <TableRow key={index}>
                                    <TableRowColumn colSpan={11}><span>{f.isbn} - Not found</span></TableRowColumn>
                                </TableRow>
                            </React.Fragment>)
                    }
                    if (f.displayAsRejected) {
                        const tableRejectedText = `Rejected ${f.isbn}`
                        return (
                            <React.Fragment key={index}>
                                <TableRow key={index}>
                                    <TableRowColumn colSpan={11}><span>{tableRejectedText}</span></TableRowColumn>
                                </TableRow>
                            </React.Fragment>)
                    }
                    else {
                        const tBackgroundColor = Object.assign({}, styles.tableRow)
                        let backgroundColor = Object.assign(tBackgroundColor, { backgroundColor: f.color })

                        return (<TableRow key={index} style={backgroundColor}>
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
                    }
                })
            }
        </TableBody>
    </Table>
    )
}

BookTableMedium.propTypes = {
    dataCollection: PropTypes.array.isRequired
}

export default BookTable