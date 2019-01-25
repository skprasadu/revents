import React, { Component } from "react";
import { connect } from 'react-redux'
import { Grid, Button } from "semantic-ui-react";
import cuid from "cuid";
import EventList from "../EventList/EventList";
import EventForm from "../EventForm/EventForm";

const mapState = state => ({
  events: state.events
});

class EventDashboard extends Component {
  state = {
    isOpen: false,
    selected: null
  };

  handleFormOpen = () => {
    this.setState({
      selectedEvent: null,
      isOpen: true
    });
  };

  handleCancel = () => {
    this.setState({
      selectedEvent: null,
      isOpen: false
    });
  };

  handleCreateEvent = newEvent => {
    newEvent.id = cuid();
    newEvent.hostPhotoURL = "/assets/user.png";
    const updateEvents = [...this.state.events, newEvent];
    this.setState({
      events: updateEvents,
      isOpen: false
    });
  };

  handleUpdateEvent = updateEvent => {
    this.setState({
      event: this.state.events.map(event => {
        if (event.id === updateEvent.id) {
          return Object.assign({}, updateEvent);
        } else {
          return event;
        }
      }),
      isOpen: false,
      selectedEvent: null
    });
  };

  handleOpenEvent = eventToOpen => () => {
    this.setState({
      selectedEvent: eventToOpen,
      isOpen: true
    });
  };

  handleDeleteEvent = eventId => () => {
    const updateEvents = this.state.events.filter(e => e.id !== eventId);
    this.setState({
      events: updateEvents
    });
  };

  render() {
    const { selectedEvent } = this.state;
    const { events } = this.props;
    return (
      <Grid>
        <Grid.Column width={10}>
          <EventList
            deleteEvent={this.handleDeleteEvent}
            onEventOpen={this.handleOpenEvent}
            events={events}
          />
        </Grid.Column>
        <Grid.Column width={6}>
          <Button
            onClick={this.handleFormOpen}
            positive
            content="Create Event"
          />
          {this.state.isOpen && (
            <EventForm
              updateEvent={this.handleUpdateEvent}
              selectedEvent={selectedEvent}
              createEvent={this.handleCreateEvent}
              handleCancel={this.handleCancel}
            />
          )}
        </Grid.Column>
      </Grid>
    );
  }
}

export default connect(mapState)(EventDashboard);
