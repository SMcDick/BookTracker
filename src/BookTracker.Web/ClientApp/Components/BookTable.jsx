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

import { styles } from '../styles'

const BookTable = (props) => {
    return (
        <Responsive
            small={
                <List>
                    {
                        props.dataCollection.map((f, index) => {
                            const tBackgroundColor = Object.assign({}, styles.tableRow)
                            let sBackgroundColor = Object.assign(tBackgroundColor, { backgroundColor: f.color })

                            if (f.displayAsRejected) {
                                const rejectedText = `Rejected ${f.isbn}`
                                return (
                                    <React.Fragment key={index}>
                                        <div>
                                            <ListItem primaryText={rejectedText} leftAvatar={<Avatar src={f.image} />} />
                                        </div>
                                    </React.Fragment>
                                )
                            }
                            else {
                                return (<React.Fragment key={index}>
                                    <div style={sBackgroundColor}>
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
                                    </div>
                                </React.Fragment>)
                            }
                        })
                    }
                </List>
            }
            medium={
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
                                {
                                    if (f.displayAsRejected) {
                                        const tableRejectedText = `Rejected ${f.isbn}`
                                        return (<React.Fragment key={index}>
                                            <TableRow key={index}>
                                                <TableRowColumn><span>{tableRejectedText}</span></TableRowColumn>
                                            </TableRow></React.Fragment>)
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
                                }
                            })
                        }
                    </TableBody>
                </Table>
            }
        />
    )
}

BookTable.propTypes = {
    dataCollection: PropTypes.array.isRequired
}

export default BookTable