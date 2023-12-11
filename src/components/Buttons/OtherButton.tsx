import React, {FC} from 'react';
import styles from './Button.module.scss'

interface ButtonProps {
    text: string
    disabled?: boolean
}
const OtherButton: FC<ButtonProps> = ({text, disabled}) => {
    return (
        <div className={styles.otherButtons}>
            {disabled ?
                <button disabled>{text}</button>
                :
                <button>{text}</button>
            }
        </div>
    );
};

export default OtherButton;