export const match = (configObject, machine) => {
  const selectedItem = configObject[machine.state];
  let selectedMachineState;
  if (selectedItem !== void 0) {
    selectedMachineState = selectedItem;
  } else if ("otherwise" in configObject) {
    selectedMachineState = configObject.otherwise;
  } else {
    throw new Error("pattern is not exaustive");
  }
  if (typeof selectedMachineState === "function") {
    return selectedMachineState();
  }
  return selectedMachineState;
};
