function controlFlow(props) {
  if (props.if[0]) return props.if[1];
  if (props.elseif[0]) return props.elseif[1];
  return props.else;
}

export default controlFlow;
