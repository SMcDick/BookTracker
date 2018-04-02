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

import { connect } from 'react-redux'

import { styles } from '../styles'
import BookTable from './BookTable'

import { green100 } from 'material-ui/styles/colors';

import { uiSelectedBook } from '../Actions/uiAction'

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

const BookSmall = ({ book }) => {
    const tBackgroundColor = Object.assign({}, styles.tableRow)
    let sBackgroundColor = Object.assign(tBackgroundColor, { backgroundColor: book.color })
    const box1Styles = book.boxIndex == 1 ? { backgroundColor: green100 } : {}
    const box2Styles = book.boxIndex == 2 ? { backgroundColor: green100 } : {}
    const box3Styles = book.boxIndex == 3 ? { backgroundColor: green100 } : {}
    const box4Styles = book.boxIndex == 4 ? { backgroundColor: green100 } : {}
    const box5Styles = book.boxIndex == 5 ? { backgroundColor: green100 } : {}

    return (<React.Fragment>

        <table>
            <tbody>
                <tr>
                    <td colSpan="2">
                        <ListItem primaryText={book.title} leftAvatar={<Avatar src={book.image} />} />
                    </td>
                </tr>
                <tr>
                    <td>
                        <ListItem primaryText={book.isbn} secondaryText="ISBN" />
                    </td>
                    <td style={box2Styles}>
                        <ListItem primaryText={<FlatNumberField source="offer" record={book} options={{ style: 'currency', currency: 'USD' }} />} secondaryText="Offer" />
                    </td>
                </tr>
                <tr style={box1Styles}>
                    <td>
                        <ListItem primaryText={<FlatNumberField source="usNetPayout" record={book} options={{ style: 'currency', currency: 'USD' }} />} secondaryText="US Net payout" />
                    </td>
                    <td>
                        <ListItem primaryText={<FlatNumberField source="usSalesRank" record={book} options={{ style: 'decimal', useGrouping: false }} />} secondaryText="US Sales rank" />
                        
                    </td>
                </tr>
                <tr style={box4Styles}>
                    <td>
                        <ListItem primaryText={<FlatNumberField source="caNetPayout" record={book} options={{ style: 'currency', currency: 'USD' }} />} secondaryText="CA Net Payout" />
                    </td>
                    <td>
                        <ListItem primaryText={<FlatNumberField source="caSalesRank" record={book} options={{ style: 'decimal', useGrouping: false }} />} secondaryText="CA Sales Rank" />
                    </td>
                </tr>
                <tr style={box5Styles}>
                    <td>
                        <ListItem primaryText={<FlatNumberField source="inNetPayout" record={book} options={{ style: 'currency', currency: 'USD' }} />} secondaryText="IN Net Payout" />
                    </td>
                    <td>
                        <ListItem primaryText={<FlatNumberField source="inSalesRank" record={book} options={{ style: 'decimal', useGrouping: false }} />} secondaryText="IN Sales Rank" />
                    </td>
                </tr>
                <tr style={box3Styles}>
                    <td>
                        <ListItem primaryText={<FlatNumberField source="mxNetPayout" record={book} options={{ style: 'currency', currency: 'USD' }} />} secondaryText="MX Net Payout" />
                    </td>
                    <td>
                        <ListItem primaryText={<FlatNumberField source="mxSalesRank" record={book} options={{ style: 'decimal', useGrouping: false }} />} secondaryText="MX Sales Rank" />
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

class BookTableSmall extends Component {
    constructor(props) {
        super(props)
        this.state = { selectedIndex: 0 }
    }

    componentWillMount() {
        const { selectedBook } = this.props
        this.setState({ selectedIndex: 0 })
    }

    onIndexChange(index, indexLatest, meta) {
        console.info(index)
        const { dispatch } = this.props
        dispatch(uiSelectedBook(index))
        this.setState({ selectedIndex: index })
    }

    render() {
        const { dataCollection, selectedIndex } = this.props

        const booksReact = dataCollection.filter(book => {
            return book.displayMobile
        }).map((book, index) => {
            if (book.title == undefined || book.title == null || book.title == '') {
                return (<div key={index} style={styles.slide}><BookNotFoundSmall isbn={book.isbn} /></div>)
            }
            else if (book.displayAsRejected) {
                return (<div key={index} style={styles.slide}><BookRejectedSmall isbn={book.isbn} image={book.image} /></div>)
            }
            else {
                return (<div key={index} style={styles.slide}><BookSmall book={book} /></div>)
            }
        })
        if (dataCollection.lenght == 0) {
            return <div />
        }
        else {
            return (
                <SwipeableViews enableMouseEvents={true} index={selectedIndex} onChangeIndex={this.onIndexChange.bind(this)}>
                    {booksReact}
                </SwipeableViews>
            )
        }
    }
}


BookTableSmall.propTypes = {
    dataCollection: PropTypes.array.isRequired,
    selectedBook: PropTypes.string,
    dispatch: PropTypes.func.isRequired
}

const mapStateToProps = state => {
    const { uiReducer } = state
    const { selectedIndex } = uiReducer
    return {
        selectedIndex: selectedIndex !== undefined ? selectedIndex : 0
    }
}

export default connect(mapStateToProps)(BookTableSmall)