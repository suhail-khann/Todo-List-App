import React from 'react';

function SummaryButton({ onSummarize, isLoading }) {
  return (
    <div className="summary-section">
      <button 
        className="summarize-button" 
        onClick={onSummarize} 
        disabled={isLoading}
      >
        {isLoading ? 'Processing...' : 'Summarize & Send to Slack'}
      </button>
      <p className="summary-info">
        Click to generate a summary of your pending todos and send it to Slack
      </p>
    </div>
  );
}

export default SummaryButton;