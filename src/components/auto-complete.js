import React from 'react';
import { setValue } from '../utils';
import PlacesAutocomplete from 'react-places-autocomplete';

export default class LocationSearchInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      isUpdated: false
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillReceiveProps() {
    if(this.props.selectedAddress) {
      this.setState({
        isUpdated: true,
        input: this.props.selectedAddress
      });
    }
  }

  handleChange(input) {
    this.setState({ input });
  }

  render() {
    const { selectedAddress } = this.props;
    const { input, isUpdated } = this.state;
    const value = setValue(input, selectedAddress, isUpdated);

    return (
      <PlacesAutocomplete
        value={value}
        onChange={this.handleChange}
        onSelect={this.props.handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div className='autocomplete-container'>
            <input
              {...getInputProps({
                placeholder: 'Search places...',
                className: 'location-search-input',
              })}
            />
            <div className="autocomplete-dropdown-container">
              {loading && <div>Loading...</div>}
              {suggestions.map(suggestion => {
                const className = suggestion.active
                  ? 'suggestion-item--active'
                  : 'suggestion-item';
                return (
                  <div

                    {...getSuggestionItemProps(suggestion, {
                      className
                    })}
                  >
                    <span>{suggestion.description}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    );
  }
}


