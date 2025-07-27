import { motion } from 'framer-motion';

function ErrorMessage({ type = 'error', message, onDismiss, onRetry }) {
  const colors = {
    error: {
      bg: 'bg-red-500/10',
      border: 'border-red-500/20',
      text: 'text-red-200',
      hover: 'hover:bg-red-500/30',
      icon: 'text-red-400'
    },
    warning: {
      bg: 'bg-yellow-500/10',
      border: 'border-yellow-500/20',
      text: 'text-yellow-200/90',
      hover: 'hover:bg-yellow-500/30',
      icon: 'text-yellow-300'
    }
  };

  const style = colors[type];

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.3 }}
      className={`${style.bg} backdrop-blur-md rounded-lg px-6 py-4 
                  ${style.border} border ${style.text}`}
    >
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        <div className="flex items-center gap-2">
          <svg 
            className={`w-5 h-5 ${style.icon}`} 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" 
            />
          </svg>
          <span>{message}</span>
        </div>
        <div className="flex items-center gap-2">
          {onRetry && (
            <button
              onClick={onRetry}
              className={`px-4 py-1.5 ${style.bg} ${style.hover}
                         ${style.text} rounded-lg transition-colors duration-200
                         border ${style.border} hover:border-opacity-50
                         flex items-center gap-2`}
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Retry
            </button>
          )}
          {onDismiss && (
            <button
              onClick={onDismiss}
              className={`px-4 py-1.5 ${style.bg} ${style.hover}
                         ${style.text} rounded-lg transition-colors duration-200
                         border ${style.border} hover:border-opacity-50`}
            >
              Dismiss
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default ErrorMessage;
