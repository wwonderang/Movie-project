import React from "react";

import PageNotFound from './../PageNotFound';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render() {
    if(this.state.hasError) {

      return <PageNotFound />
    }

    return this.props.children;
  }
}