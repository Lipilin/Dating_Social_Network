import { useCallback } from 'react'
import { Loader } from '@/components/pages/Loader/Loader'
import { useStepModal } from '@/hooks/modals/useStepModal'

interface UseDeleteModalProps {
    onDelete: () => Promise<void>
    onClose: () => void
}

export function useDeleteModal({ onDelete, onClose }: UseDeleteModalProps) {
    const confirmView = useCallback(({ submit }: { submit: () => void }) => ({
        title: 'Вы уверены, что хотите удалить эту запись?',
        content: (
            <>
                <p>Это действие нельзя отменить. Убедитесь, что вы выбрали правильную запись</p>
                <div className="row">
                    <button type="button" className="blue" onClick={submit}>
                        Удалить
                    </button>
                </div>
            </>
        ),
    }), [])

    const loadingView = useCallback(() => ({
        title: 'Идет процесс удаления...',
        content: <Loader isLoading />,
    }), [])

    const successView = useCallback(({ close }: { close: () => void }) => ({
        title: 'Запись успешно удалена',
        content: (
            <>
                <p>Данные безвозвратно удалены.</p>
                <div className="row">
                    <button type="button" className="blue" onClick={close}>
                        Закрыть
                    </button>
                </div>
            </>
        ),
    }), [])

    const errorView = useCallback(({ retry }: { retry: () => void }, error: string) => ({
        title: 'Ошибка при удалении записи',
        content: (
            <>
                <p>Произошла ошибка при удалении записи. {error}</p>
                <div className="row">
                    <button type="button" className="blue" onClick={retry}>
                        Попробовать снова
                    </button>
                </div>
            </>
        ),
    }), [])

    return useStepModal({
        onAction: onDelete,
        onClose,
        confirmView,
        loadingView,
        successView,
        errorView,
    })
}
