import React, { Component } from 'react';
import { Container } from './App.styled';
import { FormContact } from './FormContact/FormContact';
import { nanoid } from 'nanoid';
import { Filter } from './Filter/Filter';
import { ContactsList } from './ContactsList/ContactsList';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  formSubmitHandler = ({ name, number }) => {
    const newContact = {
      number: number,
      name: name,
      id: nanoid(),
    };
    let updatedContacts;
    const newName = this.state.contacts.find(
      contact => contact.name.toLowerCase() === newContact.name.toLowerCase()
    );

    if (newName) {
      return alert(`${newContact.name} is already in contacts.`);
    } else {
      updatedContacts = [...this.state.contacts, newContact];
      this.setState({
        contacts: updatedContacts,
        name: '',
        number: '',
        filter: '',
      });
    }
  };

  handleFilter = e => {
    const { value } = e.target;
    const filteredContacts = this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(value.toLowerCase())
    );
    this.setState({ filter: value, filteredContacts });
  };
  handleDelete = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };
  componentDidMount() {
    console.log('app componentDidMoun');
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);
    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }
  componentDidUpdate(prevState) {
    console.log('componentDidUpdate');
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }
  render() {
    const contacts = this.state.filter
      ? this.state.filteredContacts
      : this.state.contacts;
    return (
      <Container>
        <h1>Phonebook</h1>
        <FormContact onClickSubmit={this.formSubmitHandler} />
        <h2>Contacts</h2>
        <Filter onFilter={this.handleFilter} filter={this.state.filter} />
        <ContactsList contacts={contacts} onClickDelete={this.handleDelete} />
      </Container>
    );
  }
}
