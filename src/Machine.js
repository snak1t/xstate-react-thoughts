import React from "react";

export class Machine extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      machineState: props.machine.initialState.value
    };
  }

  transition = event => {
    const currentMachineState = this.state.machineState;
    const nextMachineState = this.props.machine.transition(
      currentMachineState,
      event.type
    );
    if (nextMachineState.actions) {
      this.runCommand(event, nextMachineState);
    }
    this.setState({ machineState: nextMachineState.value });
  };

  runCommand(event, machine) {
    machine.actions.reduce(
      (state, action) =>
        this.props.commands[action](event, this.transition, state) || state,
      undefined
    );
  }

  render() {
    return this.props.children({
      state: this.state.machineState,
      transition: this.transition
    });
  }
}
