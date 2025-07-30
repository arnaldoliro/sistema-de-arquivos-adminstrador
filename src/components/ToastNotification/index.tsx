export default function ToastNotification() {
  return (
    <div
      id="toast"
      className="toast hidden bg-gray-800 text-white px-4 py-3 rounded-lg shadow-lg"
    >
      <div className="flex items-center">
        <div id="toast-icon" className="mr-3">
          <i className="fas fa-check-circle"></i>
        </div>
        <div>
          <p id="toast-message">Operação realizada com sucesso!</p>
        </div>
      </div>
    </div>
  );
}
