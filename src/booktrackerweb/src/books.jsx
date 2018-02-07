import React from 'react';
import { CardActions } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import { Responsive, ShowButton, List, SimpleList, Datagrid, TextField, Filter, TextInput, Show, SimpleShowLayout, ListButton, RefreshButton } from 'admin-on-rest';

const cardActionStyle = {
    zIndex: 2,
    display: 'inline-block',
    float: 'right',
};

const BookFilter = (props) => (
    <Filter {...props}>
        <TextInput label="ISBN" source="q" alwaysOn />
    </Filter>
);

export const BookEdit = (props) => (
    <Show title={<BookTitle />} actions={<BookShowActions />} {...props}>
        <SimpleShowLayout>
            <TextField source="title" />
            <TextField source="isbn" />
            <TextField source="date" />
        </SimpleShowLayout>
    </Show>
);

export const BookList = (props) => (
    <List {...props} filters={<BookFilter />} title="Books">
        <Responsive
            small={
                <SimpleList
                    primaryText={record => record.title}
                    secondaryText={record => record.isbn}
                    tertiaryText={record => record.date} />
            }
            medium={
                <Datagrid>
                    <TextField source="id" />
                    <TextField source="isbn" />
                    <TextField source="title" />
                    <TextField source="date" />
                    <ShowButton />
                </Datagrid>
            }
            />
    </List>
);

const BookTitle = ({ record }) => {
    return <span>Book {record ? `"${record.title}"` : ''}</span>;
};

const BookShowActions = ({ basePath, data }) => (
    <CardActions style={cardActionStyle}>
        <ListButton basePath={basePath} />
        <RefreshButton />
    </CardActions>
);

export const BookShow = (props) => (
    <Show title={<BookTitle />} actions={<BookShowActions />} {...props}>
        <SimpleShowLayout>
            <TextField source="title" />
            <TextField source="isbn" />
            <TextField source="date" />
        </SimpleShowLayout>
    </Show>
);