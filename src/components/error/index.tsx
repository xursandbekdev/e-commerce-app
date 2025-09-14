import React, { Component, type ReactNode } from "react";

interface ErrorBoundaryProps {
    children: ReactNode;
}

interface ErrorBoundaryState {
    hasError: boolean;
    error?: Error;
}
class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false };
    }
    static getDerivedStateFromError(error: Error) {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, info: React.ErrorInfo) {
        console.error("Caught by ErrorBoundary:", error, info);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="flex flex-col items-center justify-center h-screen text-center">
                    <h1 className="text-3xl font-bold text-red-600">Oops! Xatolik yuz berdi.</h1>
                    <p className="text-title mt-2">
                        {this.state.error?.message || "Noma’lum xatolik."}
                    </p>
                    <button
                        onClick={() => window.location.reload()}
                        className="mt-4 px-4 py-2 bg-primary text-offwhite rounded-lg"
                    >
                        Qayta yuklash
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
