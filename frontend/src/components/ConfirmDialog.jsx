function ConfirmDialog({ open, message, onConfirm, onCancel, busy }) {
  if (!open) return null
  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h3>Confirm delete</h3>
        <p>{message}</p>
        <div className="modal-actions">
          <button className="btn btn-secondary" onClick={onCancel} disabled={busy}>
            Cancel
          </button>
          <button className="btn btn-danger" onClick={onConfirm} disabled={busy}>
            {busy ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmDialog