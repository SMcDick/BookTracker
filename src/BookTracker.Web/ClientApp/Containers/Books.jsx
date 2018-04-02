import React, { Component } from 'react';

import { addBookToSearch, fetchBook, removeBookToSearch, refreshBookList } from '../Actions'
import { connect } from 'react-redux'

import BookTable from '../Components/BookTable'
import BookSearchAction from '../Components/BookSearchAction'
import BookIsbnSearchList from '../Components/BookIsbnSearchList'
import BookDialogSearchBox from '../Components/BookDialogSearchBox'
import { Card, CardHeader, CardText } from 'material-ui/Card'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'
import Dialog from 'material-ui/Dialog'
import Responsive from '../ui/Responsive'

import PropTypes from 'prop-types'
import { styles } from '../styles'
import { DEFAULT_ISBN_LENGTH } from '../constants'

class BookApp extends Component {
    static propTypes = {
        dispatch: PropTypes.func.isRequired,
        isbnColl: PropTypes.array.isRequired,
        bookColl: PropTypes.array.isRequired
    }

    constructor(props) {
        super(props)
        this.state = { dialogOpen: false, selectedBook: '' }
    }

    handleAddBook(isbn, shouldCloseDialog = true) {
        if (isbn && isbn.length == DEFAULT_ISBN_LENGTH) {
            const { isbnColl } = this.props
            const cIsbn = isbnColl.filter((item) => { return item.isbn === isbn })
            if (cIsbn.length === 0) {
                this.props.dispatch(addBookToSearch(isbn))
                this.props.dispatch(fetchBook(isbn))
            }
        }

        if (shouldCloseDialog) {
            this.closeDialog()
        }
    }

    componentWillReceiveProps(nextProps) {
        const { lastBook } = this.props
        if (lastBook !== nextProps.lastBook) {
            if (nextProps.lastBook !== undefined && nextProps.lastBook !== '') {
                const audio = new Audio(`${nextProps.lastBook.audio}`);
                audio.play();
            }
        }
        if (nextProps.bookColl.length == 1) {
            this.scrollDown()
        }
    }

    handleRemoveBook = (isbn) => {
        const action = removeBookToSearch(isbn)
        this.props.dispatch(action)
    }

    handleSelectBook = (book) => {
        console.info(`selected ${book.isbn}`)
        this.setState({ selectedBook: book.isbn })
    }

    handleRefresh = () => {
        const { isbnColl } = this.props
        const action = refreshBookList(isbnColl)
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

    handleOnSearchAction(isbn) {
        console.info(`handleOnSearchAction ${isbn}`)
        this.handleAddBook(isbn, false)
    }

    scrollDown() {
        setTimeout(() => {
            window.scrollTo(0, document.body.scrollHeight)
        }, 1000)
    }

    render() {
        const { bookColl, isbnColl } = this.props
        const { dialogOpen, selectedBook } = this.state
        return (
            <Card>
                <CardText>
                    <Responsive
                        small={
                            <React.Fragment>
                                <BookTable dataCollection={bookColl} selectedBook={selectedBook} />
                                <BookSearchAction onSearchClick={this.handleAddBook.bind(this)} onSearchAction={this.handleOnSearchAction.bind(this)} />
                                <BookIsbnSearchList isbnColl={isbnColl} handleRequestDelete={this.handleRemoveBook.bind(this)} handleChipClicked={this.handleSelectBook.bind(this)} />
                            </React.Fragment>
                        }
                        medium={
                            <React.Fragment>
                                <BookSearchAction onSearchClick={this.handleAddBook.bind(this)} onSearchAction={this.handleOnSearchAction.bind(this)} />
                                <BookIsbnSearchList isbnColl={isbnColl} handleRequestDelete={this.handleRemoveBook.bind(this)} />
                                <BookTable dataCollection={bookColl} />
                            </React.Fragment>
                        }
                    />

                    <FloatingActionButton style={styles.floatingButton} secondary={true} onClick={this.handleAddScannedBook.bind(this)}>
                        <ContentAdd />
                    </FloatingActionButton>
                    <Dialog title="Scan the book barcode"
                        modal={false}
                        contentStyle={styles.dialog}
                        onRequestClose={this.onDialogRequestClose.bind(this)}
                        open={dialogOpen}>
                        <BookDialogSearchBox onSearchClick={this.handleAddBook.bind(this)} onSearchAction={this.handleOnSearchAction.bind(this)} />
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