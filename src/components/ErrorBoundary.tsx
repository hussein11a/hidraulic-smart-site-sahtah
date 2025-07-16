
import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('خطأ غير متوقع:', error, errorInfo);
  }

  private handleReload = () => {
    window.location.reload();
  };

  private handleReset = () => {
    this.setState({ hasError: false, error: undefined });
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-white" dir="rtl">
          <div className="text-center max-w-md mx-auto p-8">
            {/* Error Icon */}
            <div className="mb-8">
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertTriangle className="h-10 w-10 text-red-500" />
              </div>
            </div>

            {/* Error Message */}
            <h1 className="text-3xl font-bold text-slate-800 mb-4">
              عذراً، حدث خطأ!
            </h1>
            
            <p className="text-lg text-slate-600 mb-8">
              حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى أو تحديث الصفحة.
            </p>

            {/* Error Details (in development) */}
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-lg text-left">
                <pre className="text-xs text-red-600 whitespace-pre-wrap">
                  {this.state.error.message}
                </pre>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={this.handleReload}
                className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                <RefreshCw className="h-4 w-4" />
                تحديث الصفحة
              </Button>
              
              <Button
                onClick={this.handleReset}
                variant="outline"
                className="flex items-center gap-2 px-6 py-3 border-slate-300 text-slate-700 hover:bg-slate-50 rounded-lg transition-colors"
              >
                <Home className="h-4 w-4" />
                المحاولة مرة أخرى
              </Button>
            </div>

            {/* Contact Info */}
            <div className="mt-8 pt-8 border-t border-slate-200">
              <p className="text-sm text-slate-500 mb-4">
                إذا استمر الخطأ، تواصل معنا:
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="tel:+966503269219"
                  className="text-blue-600 hover:text-blue-700 font-semibold transition-colors"
                >
                  📞 +966503269219
                </a>
                <a
                  href="https://wa.me/966501234567"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-600 hover:text-green-700 font-semibold transition-colors"
                >
                  💬 واتساب
                </a>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
