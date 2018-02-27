import React, { Component } from 'react';

import * as actions from '../Actions'
import { connect } from 'react-redux'

import Scanner from '../Components/Scanner'
import BookTable from '../Components/BookTable'
import BookSearchAction from '../Components/BookSearchAction'
import BookIsbnSearchList from '../Components/BookIsbnSearchList'
import BookDialogSearchBox from '../Components/BookDialogSearchBox'
import { styles } from '../styles'

import { Card, CardHeader, CardText } from 'material-ui/Card';

import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Dialog from 'material-ui/Dialog';

import PropTypes from 'prop-types'



class BookApp extends Component {
    static propTypes = {
        dispatch: PropTypes.func.isRequired,
        isbnColl: PropTypes.array.isRequired,
        bookColl: PropTypes.array.isRequired
    }

    constructor(props) {
        super(props)
        this.state = { dialogOpen: false }
    }

    handleAddBook(isbn) {
        const { isbnColl } = this.props
        const cIsbn = isbnColl.filter((item) => { return item === isbn })
        if (cIsbn.length === 0) {
            this.props.dispatch(actions.addBookToSearch(isbn))
            this.props.dispatch(actions.fetchBook(isbn))
        }
        this.closeDialog()
    }

    componentWillReceiveProps(nextProps) {
        const { lastBook } = this.props
        if (lastBook !== nextProps.lastBook) {
            if (nextProps.lastBook !== undefined && nextProps.lastBook !== '') {
                const audio = new Audio(`${nextProps.lastBook.audio}`);
                audio.play();
            }
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

    handleAddScannedBook() {
        this.openDialog()
    }

    onDialogRequestClose() {
        this.closeDialog()
    }

    closeDialog() {
        this.setState({ dialogOpen: false })
    }

    openDialog() {
        this.setState({ dialogOpen: true })
    }

    onBarcodeDetected(code) {
        console.info(`barcode detected ${code}`)
        this.closeDialog()
        this.handleAddBook(code)
    }

    render() {
        const { bookColl, isbnColl } = this.props
        const { dialogOpen } = this.state
        return (
        <Card>
            <CardHeader title="Home" />
            <CardText>
                <BookIsbnSearchList isbnColl={isbnColl} 
                    handleRequestDelete={this.handleRemoveBook.bind(this)} />
                
                <BookTable dataCollection={bookColl} />

                <FloatingActionButton style={styles.floatingButton} secondary={true} onClick={this.handleAddScannedBook.bind(this)}>
                    <ContentAdd />
                </FloatingActionButton>
                <Dialog
                    title="Scan the book barcode"
                    modal={false}
                    contentStyle={styles.dialog}
                    onRequestClose={this.onDialogRequestClose.bind(this)}
                    open={dialogOpen}>
                    <BookDialogSearchBox onSearchClick={this.handleAddBook.bind(this)}/>
                </Dialog>
            </CardText>
        </Card>)
    }
}

const mapStateToProps = state => {
    const { bookReducer } = state
    const { lastBook } = bookReducer

    const isbnColl = bookReducer.isbnColl ? bookReducer.isbnColl : []
    const bookColl = bookReducer.bookColl ? bookReducer.bookColl : []
    return {
        isbnColl,
        bookColl,
        lastBook
    }
}

export default connect(mapStateToProps)(BookApp)