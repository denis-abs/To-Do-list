import "../styles/components/ConfirmModal.css";

const ConfirmModal = (props) => {
    const {
        dialogRef,
        onCloseProjectDialog,
        title,
        message,
        onConfirm,
    } = props;


    return (
        <dialog className="dialog" ref={dialogRef}>
            <div className="dialog-header">
                <h2>{title}</h2>
            </div>

            <div className="dialog-body">
                <p>{message}</p>
            </div>

            <div className="dialog-footer">
                <button
                    className="cancel-button"
                    onClick={onCloseProjectDialog}
                >
                    Отмена
                </button>

                <button
                    className="delete-buttonModal"
                    onClick={onConfirm}
                >
                    Удалить
                </button>
            </div>
        </dialog>
    );
};

export default ConfirmModal;