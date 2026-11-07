interface SaveButtonProps {
  disabled?: boolean;
  isSaving?: boolean;
  onSave: () => void;
}

export default function SaveButton({
  disabled = false,
  isSaving = false,
  onSave,
}: SaveButtonProps) {
  return (
    <button
      type="button"
      className={`btn-save ${isSaving ? 'btn-saving' : ''}`}
      disabled={disabled || isSaving}
      onClick={onSave}
    >
      {isSaving ? 'Saving...' : 'Save Profile'}
    </button>
  );
}
