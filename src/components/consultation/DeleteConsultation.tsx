export default function DeleteConsultation ({onClose, onSucces,} : {onClose: () => void; onSucces: () => void}) {
    return (
        <div className="fixed inset-0 flex justify-center items-center p-2 sm:p-4 z-50">
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => onClose()}
          ></div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-xs sm:max-w-md md:max-w-lg p-4 sm:p-6 relative z-10 overflow-y-auto max-h-[90vh]">
            <h3 className="text-lg font-bold mb-4 text-red-600">
              Voulez-vous vraiment supprimer cette consultation ?
            </h3>
            <p className="mb-6">
              Cliquer sur <span className="font-semibold">Valider</span> pour
              effectuer votre action.
            </p>
            <div className="flex flex-col sm:flex-row justify-end gap-2">
              <button
                onClick={() => onClose()}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 w-full sm:w-auto"
              >
                Annuler
              </button>
              <button
                onClick={() => onSucces()}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 w-full sm:w-auto"
              >
                Valider
              </button>
            </div>
          </div>
        </div>
    )
}