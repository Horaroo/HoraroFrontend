import { Dialog } from '@mui/material'
import PropTypes from 'prop-types'

export const SheduleModal = ({ open = false, data = [] }) => {
    return (
        <Dialog className="shedule-modal" open={open} data={data}>
            <ul className="shedule-modal__list">
                <li className="shedule-modal__item">hello1</li>
                <li className="shedule-modal__item">hello2</li>
                <li className="shedule-modal__item">hello3</li>
            </ul>
        </Dialog>
    )
}

SheduleModal.propTypes = {
    open: PropTypes.bool,
    data: PropTypes.array,
}
