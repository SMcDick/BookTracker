import React, { Component } from 'react';
import PropTypes from 'prop-types'

import FlatTextField from '../ui/FlatTextField'
import FlatNumberField from '../ui/FlatNumberField'
import ImageField from '../ui/ImageField'
import { List, ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import Divider from 'material-ui/Divider';
import { GridList, GridTile } from 'material-ui/GridList';

import SwipeableViews from 'react-swipeable-views';

import { styles } from '../styles'

const BookNotFoundSmall = (props) => {
    const notfoundtext = `${props.isbn} not found`
    return (
        <React.Fragment>
            <div>
                <ListItem primaryText={notfoundtext} />
            </div>
        </React.Fragment>
    )
}

BookNotFoundSmall.propTypes = {
    isbn: PropTypes.string
}

const BookRejectedSmall = (props) => {
    const rejectedText = `Rejected ${props.isbn}`
    return (
        <React.Fragment>
            <div>
                <ListItem primaryText={rejectedText} leftAvatar={<Avatar src={props.image} />} />
            </div>
        </React.Fragment>
    )
}

BookRejectedSmall.propTypes = {
    isbn: PropTypes.string,
    image: PropTypes.string
}

const BookSmall = (props) => {
    const tBackgroundColor = Object.assign({}, styles.tableRow)
    let sBackgroundColor = Object.assign(tBackgroundColor, { backgroundColor: props.book.color })

    return (<React.Fragment>
        
        <table>
            <tbody>
                <tr>
                    <td colSpan="2">
                        <ListItem primaryText={props.book.title} leftAvatar={<Avatar src={props.book.image} />} />
                    </td>
                </tr>
                <tr>
                    <td>
                        <ListItem primaryText={props.book.isbn} secondaryText="ISBN" />
                    </td>
                    <td>
                        <ListItem primaryText={<FlatNumberField source="usSalesRank" record={props.book} options={{ style: 'decimal', useGrouping: false }} />} secondaryText="Sales rank" />
                    </td>
                </tr>
                <tr>
                    <td>
                        <ListItem primaryText={<FlatNumberField source="usNetPayout" record={props.book} options={{ style: 'currency', currency: 'USD' }} />} secondaryText="Net payout" />
                    </td>
                    <td>
                        <ListItem primaryText={<FlatNumberField source="offer" record={props.book} options={{ style: 'currency', currency: 'USD' }} />} secondaryText="Offer" />
                    </td>
                </tr>
                <tr>
                    <td>
                        <ListItem primaryText={<FlatNumberField source="caNetPayout" record={props.book} options={{ style: 'currency', currency: 'USD' }} />} secondaryText="CA Net Payout" />
                    </td>
                    <td>
                        <ListItem primaryText={<FlatNumberField source="caSalesRank" record={props.book} options={{ style: 'decimal', useGrouping: false }} />} secondaryText="CA Sales Rank" />
                    </td>
                </tr>
                <tr>
                    <td>
                        <ListItem primaryText={<FlatNumberField source="inNetPayout" record={props.book} options={{ style: 'currency', currency: 'USD' }} />} secondaryText="IN Net Payout" />
                    </td>
                    <td>
                        <ListItem primaryText={<FlatNumberField source="inSalesRank" record={props.book} options={{ style: 'decimal', useGrouping: false }} />} secondaryText="IN Sales Rank" />
                    </td>
                </tr>
                <tr>
                    <td>
                        <ListItem primaryText={<FlatNumberField source="mxNetPayout" record={props.book} options={{ style: 'currency', currency: 'USD' }} />} secondaryText="MX Net Payout" />
                    </td>
                    <td>
                        <ListItem primaryText={<FlatNumberField source="mxSalesRank" record={props.book} options={{ style: 'decimal', useGrouping: false }} />} secondaryText="MX Sales Rank" />
                    </td>
                </tr>
            </tbody>
        </table>
    </React.Fragment>)
}

BookSmall.propTypes = {
    book: PropTypes.shape({
        isbn: PropTypes.string,
        title: PropTypes.string,
        usSalesRank: PropTypes.number,
        usNetPayout: PropTypes.number,
        offer: PropTypes.number,
        caNetPayout: PropTypes.number,
        caSalesRank: PropTypes.number,
        inNetPayout: PropTypes.number,
        inSalesRank: PropTypes.number,
        mxNetPayout: PropTypes.number,
        mxSalesRank: PropTypes.number
    })
}

const BookTableSmall = (props) => {
    const booksReact = props.dataCollection.map((book, index) => {
        if(book.title == undefined || book.title == null || book.title == '') {
            return (<div key={index} style={styles.slide}><BookNotFoundSmall isbn={book.isbn} /></div>)
        }
        else if(book.displayAsRejected) {
            return (<div key={index} style={styles.slide}><BookRejectedSmall isbn={book.isbn} image={book.image} /></div>)
        }
        else {
            return (<div key={index} style={styles.slide}><BookSmall book={book} /></div>)
        }
    })    
    if(props.dataCollection.lenght == 0) {
        return <div />
    }
    else {
        return (
            <SwipeableViews enableMouseEvents={true}>
                {booksReact}
            </SwipeableViews>
        )
    }
}

BookTableSmall.propTypes = {
    dataCollection: PropTypes.array.isRequired
}

export default BookTableSmall