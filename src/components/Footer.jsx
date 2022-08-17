import { Box, IconButton, Typography } from '@material-ui/core'
import logoIcon from 'assets/images/logo.png'
const Footer = () => {
    return (
        <Box sx={{ height: { md: 60, sm: 55, sx: 50 } }} className="footer">
            <img src={logoIcon} alt="logo" className="footer-logo" />
            <Typography className="footer__text" variant="body1">
                ©️ SheduleManager 2022
            </Typography>
        </Box>
    )
}

export default Footer
