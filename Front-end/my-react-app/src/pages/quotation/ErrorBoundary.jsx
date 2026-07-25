import React from "react";

export default class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { error: null };
    }

    static getDerivedStateFromError(error) {
        return { error };
    }

    componentDidCatch(error, info) {
        // This is exactly what you want to read in the console next time it goes blank
        console.error("QuotationWizard crashed:", error, info?.componentStack);
    }

    render() {
        if (this.state.error) {
            return (
                <div className="min-h-screen bg-white flex items-center justify-center p-8">
                    <div className="max-w-lg border border-red-200 bg-red-50 rounded-xl p-6">
                        <p className="font-medium text-red-700 mb-2">Đã có lỗi xảy ra khi render form.</p>
                        <pre className="text-[12px] text-red-600 whitespace-pre-wrap font-mono">
                            {this.state.error.message}
                        </pre>
                        <button
                            onClick={() => this.setState({ error: null })}
                            className="mt-4 px-4 py-2 rounded-lg bg-red-600 text-white text-[13px]"
                        >
                            Thử lại
                        </button>
                    </div>
                </div>
            );
        }
        return this.props.children;
    }
}