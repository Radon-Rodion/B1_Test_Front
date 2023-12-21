import { Component, ErrorInfo } from "react";
import { IChildable } from "../../Helpers/Interfaces";


class ErrorBoundary extends Component<IChildable, {}>{
    constructor(props: IChildable) {
        super(props);
        this.state = {};
      }
    
      static getDerivedStateFromError() {
        console.warn('GOT_ERROR_STATE');
        return { };
      }
    
      componentDidCatch(error: Error, info: ErrorInfo) {
        console.error(error);
        console.error(info.componentStack);
        ErrorBoundary.getDerivedStateFromError();
      }
    
      render() {
        return this.props.children;
      }
}

export default ErrorBoundary;