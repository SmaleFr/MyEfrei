import React from 'react';
export class ErrorBoundary extends React.Component {
  state = { hasError: false };
  static getDerivedStateFromError() { return { hasError: true }; }
  componentDidCatch(error, info) { console.error(error, info); }
  render() {
    return this.state.hasError
      ? <h1>Quelque chose a planté.</h1>
      : this.props.children;
  }
}