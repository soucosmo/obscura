import withReactContent from 'sweetalert2-react-content'
import { useObscuraStore } from "../utils/obscura-store"
import { toast } from "react-toastify"
import Swal from 'sweetalert2'

const _ConfigMapsDelete = withReactContent(Swal);

export const useConfigMapsDelete = () => {
    const { deleteConfigMap } = useObscuraStore()

    const showDeleteAlert = () => {
        _ConfigMapsDelete.fire({
            title: 'Tem certeza?',
            text: 'Você não poderá reverter essa ação!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sim, deletar!',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                deleteConfigMap()
            } else {
                toast.info('The action was canceled!')
            }
        });
    };

    return showDeleteAlert;
};
