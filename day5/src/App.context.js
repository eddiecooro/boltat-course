const AppContext = React.createContext({});
const UserContext = React.createContext();

function A() {
  return <B />;
}

function B() {
  return <C />;
}

// function ContextConsumer({children}) {
//   const value = useContext(...)
//   return children(value)
// }

function C() {
  const appContextValue = React.useContext(AppContext);
  const userContextValue = React.useContext(UserContext);
  return `Hello, ${userContextValue.name}! I'm ${appContextValue.name}`;
  // return (
  //   <AppContext.Consumer>
  //     {appContextValue => `Hello, ${appContextValue.name}`}
  //   </AppContext.Consumer>
  // );
}

function App() {
  return (
    <h1>
      <AppContext.Provider value={{ name: 'Eddie' }}>
        <UserContext.Provider value={{ name: 'Mamad' }}>
          <A />
        </UserContext.Provider>
      </AppContext.Provider>
    </h1>
  );
}
