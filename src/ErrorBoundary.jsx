import { Component } from "react";
import { Link } from "react-router-dom";

class ErrorBoundary extends Component {
    state = {hasError: false}
    static getDerivedStateFromError() {
        return {hasError: true}
    }

    componentDidCatch(error, info) {
        console.error("Errorboundary caught error", error, info);
    }
    render() {
        if (this.state.hasError) {
            return (
                <h2>Error with Listing <Link to="/">Click here to go back to the home page</Link></h2>
            )
        }
        return this.props.children
    }
}
export default ErrorBoundary