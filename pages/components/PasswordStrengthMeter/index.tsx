import styles from './styles.module.css';
import zxcvbn from 'zxcvbn';

import { useEffect } from 'react';

type PasswordStrengthMeterProps = {
  password: string;
}

type ResultProps = {
  score: number;
}

function PasswordStrengthMeter({ password }: PasswordStrengthMeterProps) {
  const testedResult = zxcvbn(password);
  const createPasswordLabel = (result: ResultProps) => {
    switch (result.score) {
      case 0:
        return 'Weak';
      case 1:
        return 'Weak';
      case 2:
        return 'Fair';
      case 3:
        return 'Good';
      case 4:
        return 'Strong';
      default:
        return 'Weak';
    }
  }

  useEffect(() => {
    const width = testedResult.score === 0 ? 5 : testedResult.score * 25;
    const element: HTMLElement | null = document.querySelector('#progress');
    if(element) { element.style.width = `${width}%`; }
  }, [testedResult.score]);
  
  return (
    <div className={styles.passwordStrengthMeter}>
      <div className={styles.progressBar}>
        <div className={styles.progress} style={{ width: `${testedResult.score * 25}`}} id="progress"></div>
      </div>
      <label
        className={styles.passwordStrengthMeterLabel}
      >
        <strong>Password Strength: </strong> {createPasswordLabel(testedResult)}
      </label>
    </div>
  );
}

export default PasswordStrengthMeter;