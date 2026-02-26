import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  public static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // You can also log the error to an error reporting service
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-8">
          <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mb-8 border border-red-500/20">
            <span className="text-3xl">⚠️</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold serif-title mb-4 text-center">Something went wrong</h1>
          <p className="text-gray-400 mb-10 text-center max-w-md leading-relaxed">
            The application encountered an unexpected error. We've been notified and are looking into it.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <button 
              onClick={() => window.location.reload()} 
              className="bg-white text-black px-10 py-4 rounded-full font-bold uppercase tracking-widest text-[11px] hover:bg-gray-200 transition-all shadow-xl"
            >
              Reload Page
            </button>
            <button 
              onClick={() => this.setState({ hasError: false })} 
              className="border border-white/20 text-white px-10 py-4 rounded-full font-bold uppercase tracking-widest text-[11px] hover:bg-white/5 transition-all"
            >
              Try Again
            </button>
          </div>

          <details className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-2xl p-6 w-full max-w-2xl text-left">
            <summary className="cursor-pointer text-xs font-bold uppercase tracking-widest text-zinc-500 hover:text-zinc-300 transition-colors">
              Technical Details
            </summary>
            <div className="mt-6">
              <pre className="text-[10px] font-mono text-zinc-400 bg-black/50 p-4 rounded-lg overflow-x-auto whitespace-pre-wrap break-all border border-white/5">
                {this.state.error?.stack || this.state.error?.toString()}
              </pre>
            </div>
          </details>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
