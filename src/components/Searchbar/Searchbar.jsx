import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Component } from 'react';
import { Button, Form, Header, Input, Label } from './Searchbar.styled';
import { GoSearch } from 'react-icons/go';

export default class Searchbar extends Component {
  state = {
    query: '',
  };

  onChange = event => {
    this.setState({ query: event.currentTarget.value });
  };

  onSubmit = event => {
    event.preventDefault();
    const { onSubmit } = this.props;
    const { query } = this.state;

    if (!query.trim()) {
      return toast(
        '🦄 Please, enter some data!',
        { className: 'toast-message', autoClose: 2000 }
      );
    }

    onSubmit(query);
    this.resetForm();
  };

  resetForm = () => {
    this.setState({
     query: ''
    });
  };


  render() {
    const { query } = this.state;

    return (
      <Header>
        <Form onSubmit={this.onSubmit}>
          <Button type='submit' style={{ marginRight: '20px' }}>
            <Label>
              <GoSearch style={{ fontSize: '22px' }} />
              Search
            </Label>
          </Button>

          <Input
            type='text'
            autoComplete='off'
            autoFocus
            value={query}
            placeholder='Search images and photos'
            onChange={this.onChange}
          />
        </Form>
      </Header>
    );
  }
}

