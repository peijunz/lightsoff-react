# React Learning Notes
## JSX
JSX provides syntactic sugar to create and composite components with simple xml-like tags. JS code inside tags or wrapped by tags should be further wrapped in `{}`.

## Properties and States
Properties `this.props` are mainly used for creation of components, and it does not change over time. State `this.state` could be changed over time by `this.setState()` and rendering is contigent on state change.

If a component does not have any internal state, then a function component could sometimes suffice. Note that first letter of function component must be capitalized. 

Pure components is the component whose appearance is only dependent on current props and state, i.e. does not depend on history states. Naturally, functional component is a simple case of pure components.

Changing variables referenced by current state is a bad practice because react does not know this information and components are not rendered correctly. `this.setState()` actually does more things than just changing state. As an advantage of `setState`, we could utilize `this.shouldComponentUpdate()` to avoid unnecessary rendering. 

For elements in a list, `key` property is crucial for react to determine the correspondence between old and new elements in case that they are reordered. It is a react keyword rather than an attribute of `this.props`. Keys is only required to be unique among siblings 

States should only be rooted at react components. Consequently the html elements like textarea, forms, select are reactively controlled by react and their default behaviour is prevented. 

### Data and Control
There should not be data flow or control transfer between sub-components of a major component. We should lift states up to the common ancestor of these sub-components with interactions. All these interactions are coordinated by the ancestor component. 

### Lifetime
`componentDidMount()` and `componentWillUnmount()` are in conjugation to control extra resources besides state and props. An example is when we allocated a timer with `setInterval`, we need to free it when the component is unmounted. 

### Data race
`this.props` and `this.state` could be updated asyncronously. If we depend on some consistency between props and state, then we need to use second form of `this.setState`:
```jsx
// Correct
this.setState((state, props) => ({
  counter: state.counter + props.increment
}));
```

### Skeleton of a basic class component
```jsx
class Square extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: null,
    };
  }

  render() {
    return (
      <button className="square" onClick={() => alert('click')}>
        {this.props.value}
      </button>
    );
  }
}
```


### Pitfalls

Return false for onclick does not work in react handler. We should explicitly call `e.preventDefault()` on the element `e` that is triggered. 

Bind this and args to eventHandler?

### Nesting
It is possible to nest multiple layers between `{}` and `</>`. 

```jsx
function Mailbox(props) {
  const unreadMessages = props.unreadMessages;
  return (
    <div>
      <h1>Hello!</h1>
      {unreadMessages.length > 0 &&
        <h2>
          You have {unreadMessages.length} unread messages.
        </h2>
      }
    </div>
  );
}
```
