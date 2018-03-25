import React, { Component } from 'react';
import AutoComplete from 'material-ui/AutoComplete';

/**
 * `AutoComplete` search text can be implemented as a controlled value,
 * where `searchText` is handled by state in the parent component.
 * This value is reset with the `onNewRequest` callback.
 */
export default class AutoCompleteExampleControlled extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
    };
  }

  handleSelect = (searchText) => {
    const { onSearch } = this.props;
    onSearch(searchText);
  }

  handleUpdateInput = (searchText) => {
    this.setState({
      searchText,
    });
  };

  handleNewRequest = () => {
    this.setState({
      searchText: '',
    });
  };

  render() {
    const {
      suggestionList,
    } = this.props;
    return (
      <AutoComplete
        hintText="Project..."
        searchText={this.state.searchText}
        onNewRequest={this.handleSelect}
        onUpdateInput={this.handleUpdateInput}
        dataSource={suggestionList}
        filter={(searchText, key) => (key.indexOf(searchText) !== -1)}
        openOnFocus
        fullWidth
        textFieldStyle={{ textAlign: 'center', color: 'blue' }}
      />
    );
  }
}
