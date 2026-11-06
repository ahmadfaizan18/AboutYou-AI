interface ErrorMessageProps {
  message: string;
  onRetry: () => void;
  onDismiss: () => void;
}

export default function ErrorMessage({
  message,
  onRetry,
  onDismiss,
}: ErrorMessageProps) {
  return (
    <div className="error-banner" role="alert" aria-live="assertive">
      <p>{message}</p>
      <div className="error-banner-actions">
        <button type="button" onClick={onRetry}>
          Retry
        </button>
        <button type="button" onClick={onDismiss}>
          Dismiss
        </button>
      </div>
    </div>
  );
}
