import React from 'react';

export const Copyright = () => {
    const currentYear = new Date().getFullYear();
    return (
        <div className="copyright">
            © {currentYear} creador por JhonS. Todos los derechos reservados.
        </div>
    );
}

