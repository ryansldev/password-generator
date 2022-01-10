import { FiClipboard } from 'react-icons/fi';

type PasswordProps = {
  password: string,
}

function PasswordToClipboard(props: PasswordProps) {
  function copyPasswordToClipboard() {
    navigator.clipboard.writeText(props.password);    
    alert('Copied!');
  }

  return (
    <button onClick={copyPasswordToClipboard} type="button" style={{ marginBottom: '0.875em' }}>
      <FiClipboard />
      Copy to clipboard
    </button>
  )
}

export default PasswordToClipboard;