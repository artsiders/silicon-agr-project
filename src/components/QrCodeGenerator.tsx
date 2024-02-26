import { useState, useEffect } from 'react';
import QRCode from 'qrcode';

interface Props {
    stringifiedObject: object | string
}
const QrCodeGenerator = (props: Props) => {
    const { stringifiedObject } = props
    const [qrCode, setQrCode] = useState('');

    useEffect(() => {
        // Conversion de l'objet stringifié en chaîne de caractères
        const objectString = JSON.stringify(stringifiedObject);

        // Génération du QR code
        QRCode.toDataURL(objectString, { errorCorrectionLevel: 'H' })
            .then((url: string) => setQrCode(url));
    }, [stringifiedObject]);

    return (
        <>
            {qrCode && <img className='w-full rounded-lg' src={qrCode} alt="QR code" />}
        </>
    );
};

export default QrCodeGenerator;
