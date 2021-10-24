import React, { FC } from 'react'
import { Header } from './Header/Header'
import { CteateTodos } from './CreateTodos/CreateTodos';
import { Todos } from './Todos/Todos';
import { BrowserRouter, Switch, Route } from "react-router-dom"

export const App: FC = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Switch>
          <Route exact path="/" component={Todos} />
          <Route exact path="/create" component={CteateTodos} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

